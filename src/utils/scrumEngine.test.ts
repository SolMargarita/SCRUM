import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateSprintMetrics,
  generateBurndownData,
  canStoryBeMarkedDone,
  calculateGameScore,
  getScrumMasterRank,
  evaluateBadges,
  exportToJiraCSV,
  exportToGitHubMarkdown
} from './scrumEngine';
import { UserStory, Badge } from '../types/scrum';

const sampleStories: UserStory[] = [
  {
    id: 'US-101',
    title: 'Autenticación con OAuth',
    rolePersona: 'usuario',
    want: 'iniciar sesión con Google',
    soThat: 'acceder rápido a mi perfil',
    storyPoints: 5,
    priority: 'alta',
    status: 'done',
    assignee: { name: 'Ana Developer', avatar: '👩‍💻', role: 'Frontend' },
    tags: ['Auth', 'Security'],
    checklist: [
      { id: 'c1', text: 'Pruebas unitarias al 80%', completed: true },
      { id: 'c2', text: 'Code review aprobado', completed: true }
    ],
    acceptanceCriteria: ['Botón visible', 'Token validado']
  },
  {
    id: 'US-102',
    title: 'Catálogo de Productos',
    rolePersona: 'cliente',
    want: 'ver listado con filtros',
    soThat: 'encontrar productos rápido',
    storyPoints: 8,
    priority: 'media',
    status: 'in_progress',
    assignee: { name: 'Carlos Dev', avatar: '👨‍💻', role: 'Fullstack' },
    tags: ['UI', 'Search'],
    checklist: [
      { id: 'c3', text: 'Pruebas unitarias', completed: true },
      { id: 'c4', text: 'Documentación técnica', completed: false }
    ],
    acceptanceCriteria: ['Filtros por categoría funcionales']
  },
  {
    id: 'US-103',
    title: 'Notificaciones Push',
    rolePersona: 'usuario',
    want: 'recibir alertas de entrega',
    soThat: 'saber el estado de mi pedido',
    storyPoints: 3,
    priority: 'baja',
    status: 'todo',
    assignee: { name: 'Elena Dev', avatar: '👩‍💻', role: 'Backend' },
    tags: ['Notifications'],
    checklist: [
      { id: 'c5', text: 'Pruebas de integración', completed: false }
    ],
    acceptanceCriteria: ['Notificación llega en menos de 3 seg']
  },
  {
    id: 'US-104',
    title: 'Recomendaciones con IA',
    rolePersona: 'comprador',
    want: 'ver productos sugeridos',
    soThat: 'descubrir novedades',
    storyPoints: 13,
    priority: 'baja',
    status: 'backlog', // In product backlog, not sprint!
    assignee: { name: 'Sin Asignar', avatar: '👤', role: 'None' },
    tags: ['AI'],
    checklist: [],
    acceptanceCriteria: []
  }
];

test('calculateSprintMetrics accurately aggregates sprint stories ignoring product backlog', () => {
  const metrics = calculateSprintMetrics(sampleStories);
  // Sprint stories: US-101 (5), US-102 (8), US-103 (3) = 16 total points
  assert.equal(metrics.totalPoints, 16);
  // Completed: US-101 (5)
  assert.equal(metrics.completedPoints, 5);
  // In progress: US-102 (8)
  assert.equal(metrics.inProgressPoints, 8);
  // Remaining: 16 - 5 = 11
  assert.equal(metrics.remainingPoints, 11);
  // Completion rate: (5/16) * 100 = 31%
  assert.equal(metrics.completionRate, 31);
  assert.equal(metrics.totalTasks, 3);
  assert.equal(metrics.completedTasks, 1);
});

test('generateBurndownData creates expected 11 days of data with ideal burn slope', () => {
  const burndown = generateBurndownData(20, 5, 10);
  assert.equal(burndown.length, 11); // Day 0 to Day 10
  assert.equal(burndown[0].ideal, 20);
  assert.equal(burndown[10].ideal, 0);
  assert.equal(burndown[0].actual, 20);
  assert.ok(burndown[5].actual !== null);
  assert.equal(burndown[6].actual, null); // Future days have null actual
});

test('canStoryBeMarkedDone enforces all checklist items completed', () => {
  const readyStory = sampleStories[0];
  const pendingStory = sampleStories[1];

  const readyResult = canStoryBeMarkedDone(readyStory);
  assert.equal(readyResult.canDone, true);
  assert.equal(readyResult.pendingItems.length, 0);

  const pendingResult = canStoryBeMarkedDone(pendingStory);
  assert.equal(pendingResult.canDone, false);
  assert.equal(pendingResult.pendingItems.length, 1);
  assert.equal(pendingResult.pendingItems[0], 'Documentación técnica');
});

test('calculateGameScore properly applies streaks and time bonus', () => {
  const scoreNoStreak = calculateGameScore(100, 0, 10);
  // 100 * 1.0 + 50 = 150
  assert.equal(scoreNoStreak, 150);

  const scoreStreak3 = calculateGameScore(100, 3, 10);
  // 100 * (1 + 0.6) + 50 = 210
  assert.equal(scoreStreak3, 210);
});

test('getScrumMasterRank assigns proper tier based on percentage', () => {
  const tierA = getScrumMasterRank(90, 100);
  assert.equal(tierA.rank, 'A+');

  const tierB = getScrumMasterRank(75, 100);
  assert.equal(tierB.rank, 'A');

  const tierC = getScrumMasterRank(55, 100);
  assert.equal(tierC.rank, 'B');

  const tierLow = getScrumMasterRank(30, 100);
  assert.equal(tierLow.rank, 'C');
});

test('evaluateBadges unlocks badges on satisfied criteria', () => {
  const initialBadges: Badge[] = [
    { id: 'badge-first-step', name: 'Primer Paso', description: '', icon: '🎯', unlocked: false },
    { id: 'badge-streak-master', name: 'Racha Imparable', description: '', icon: '🔥', unlocked: false },
    { id: 'badge-sprint-completer', name: 'Sprint Master', description: '', icon: '⚡', unlocked: false }
  ];

  const updated = evaluateBadges({
    correctAnswers: 2,
    completedSprint: true,
    highStreak: 4,
    reviewedDoD: true,
    exportedProject: false
  }, initialBadges);

  assert.equal(updated.find(b => b.id === 'badge-first-step')?.unlocked, true);
  assert.equal(updated.find(b => b.id === 'badge-streak-master')?.unlocked, true);
  assert.equal(updated.find(b => b.id === 'badge-sprint-completer')?.unlocked, true);
});

test('exportToJiraCSV creates valid CSV formatted string with headers', () => {
  const csv = exportToJiraCSV([sampleStories[0]]);
  assert.ok(csv.startsWith('Issue Type,Summary,Description,Story Points,Priority,Status,Assignee'));
  assert.ok(csv.includes('Autenticación con OAuth'));
  assert.ok(csv.includes('Ana Developer'));
});

test('exportToGitHubMarkdown outputs markdown user stories with checklists', () => {
  const md = exportToGitHubMarkdown([sampleStories[0]]);
  assert.ok(md.includes('### 🚀 User Story: Autenticación con OAuth'));
  assert.ok(md.includes('5 Story Points'));
  assert.ok(md.includes('Definition of Done'));
});
