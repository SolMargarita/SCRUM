import { UserStory, TaskStatus, SprintMetrics, Badge } from '../types/scrum';

/**
 * Calculates sprint metrics from an array of user stories.
 */
export function calculateSprintMetrics(stories: UserStory[]): SprintMetrics {
  const sprintStories = stories.filter(s => s.status !== 'backlog');
  const totalPoints = sprintStories.reduce((acc, s) => acc + s.storyPoints, 0);
  
  const completedStories = sprintStories.filter(s => s.status === 'done');
  const completedPoints = completedStories.reduce((acc, s) => acc + s.storyPoints, 0);
  
  const inProgressStories = sprintStories.filter(s => s.status === 'in_progress' || s.status === 'review');
  const inProgressPoints = inProgressStories.reduce((acc, s) => acc + s.storyPoints, 0);
  
  const remainingPoints = totalPoints - completedPoints;
  const completionRate = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return {
    totalPoints,
    completedPoints,
    inProgressPoints,
    remainingPoints,
    completionRate,
    totalTasks: sprintStories.length,
    completedTasks: completedStories.length
  };
}

/**
 * Generates data points for an ideal vs actual burndown chart for a 10-day Sprint (2 weeks).
 */
export function generateBurndownData(totalPoints: number, currentDay: number, completedPoints: number) {
  const totalDays = 10;
  const pointsPerDay = totalPoints / totalDays;
  const data = [];

  for (let day = 0; day <= totalDays; day++) {
    const ideal = Math.max(0, Math.round((totalPoints - (pointsPerDay * day)) * 10) / 10);
    let actual: number | null = null;

    if (day === 0) {
      actual = totalPoints;
    } else if (day <= currentDay) {
      // Linear interpolation to current completed status with some daily variance
      const progressRatio = day / currentDay;
      const pointsBurnedSoFar = completedPoints * progressRatio;
      actual = Math.max(0, Math.round((totalPoints - pointsBurnedSoFar) * 10) / 10);
    }

    data.push({
      day: `Día ${day}`,
      dayNumber: day,
      ideal,
      actual
    });
  }

  return data;
}

/**
 * Checks if a user story complies with standard Definition of Done before allowing move to 'done'.
 */
export function canStoryBeMarkedDone(story: UserStory): { canDone: boolean; pendingItems: string[] } {
  const pendingItems: string[] = [];
  
  story.checklist.forEach(item => {
    if (!item.completed) {
      pendingItems.push(item.text);
    }
  });

  return {
    canDone: pendingItems.length === 0,
    pendingItems
  };
}

/**
 * Calculates game score with streak bonus.
 */
export function calculateGameScore(
  basePoints: number,
  streak: number,
  timeRemainingSeconds: number
): number {
  const streakMultiplier = 1 + (streak * 0.2); // 20% bonus per streak point
  const timeBonus = Math.max(0, timeRemainingSeconds * 5);
  return Math.round((basePoints * streakMultiplier) + timeBonus);
}

/**
 * Assigns performance tier and rank title based on final score.
 */
export function getScrumMasterRank(score: number, totalPossible: number): {
  rank: string;
  title: string;
  color: string;
  feedback: string;
} {
  const percentage = totalPossible > 0 ? (score / totalPossible) * 100 : 0;

  if (percentage >= 85) {
    return {
      rank: 'A+',
      title: 'Scrum Master Legendario 🏆',
      color: 'text-amber-500',
      feedback: '¡Excelente dominio del marco de trabajo Scrum, sus pilares, valores y gestión de impedimentos!'
    };
  } else if (percentage >= 70) {
    return {
      rank: 'A',
      title: 'Scrum Practitioner Avanzado 🥈',
      color: 'text-emerald-500',
      feedback: '¡Muy buen trabajo! Tienes bases sólidas en las ceremonias, roles y artefactos de Scrum.'
    };
  } else if (percentage >= 50) {
    return {
      rank: 'B',
      title: 'Agile Apprentice 🌱',
      color: 'text-blue-500',
      feedback: 'Buen esfuerzo. Repasa la Guía Scrum oficial para evitar antipatrones y afinar los eventos.'
    };
  } else {
    return {
      rank: 'C',
      title: 'Iniciando el Camino Ágil 🧭',
      color: 'text-purple-500',
      feedback: 'Revisa las secciones de ¿Qué es? y ¿Cómo funciona? para consolidar los fundamentos de Scrum.'
    };
  }
}

/**
 * Evaluates which badges have been unlocked.
 */
export function evaluateBadges(
  stats: {
    correctAnswers: number;
    completedSprint: boolean;
    highStreak: number;
    reviewedDoD: boolean;
    exportedProject: boolean;
  },
  existingBadges: Badge[]
): Badge[] {
  return existingBadges.map(badge => {
    let unlocked = badge.unlocked;

    if (badge.id === 'badge-first-step' && stats.correctAnswers >= 1) {
      unlocked = true;
    } else if (badge.id === 'badge-streak-master' && stats.highStreak >= 3) {
      unlocked = true;
    } else if (badge.id === 'badge-quiz-champion' && stats.correctAnswers >= 5) {
      unlocked = true;
    } else if (badge.id === 'badge-sprint-completer' && stats.completedSprint) {
      unlocked = true;
    } else if (badge.id === 'badge-tool-integrator' && stats.exportedProject) {
      unlocked = true;
    }

    return { ...badge, unlocked };
  });
}

/**
 * Generates Jira-compatible CSV export string.
 */
export function exportToJiraCSV(stories: UserStory[]): string {
  const headers = ['Issue Type', 'Summary', 'Description', 'Story Points', 'Priority', 'Status', 'Assignee'];
  const rows = stories.map(s => {
    const description = `Como ${s.rolePersona}, quiero ${s.want}, para ${s.soThat}. Criterios de Aceptación: ${s.acceptanceCriteria.join(' | ')}`;
    // Escape double quotes
    const cleanDesc = description.replace(/"/g, '""');
    const cleanTitle = s.title.replace(/"/g, '""');
    const statusMap: Record<TaskStatus, string> = {
      backlog: 'Backlog',
      todo: 'To Do',
      in_progress: 'In Progress',
      review: 'In Review',
      done: 'Done'
    };
    const priorityMap: Record<string, string> = {
      baja: 'Low',
      media: 'Medium',
      alta: 'High',
      critica: 'Highest'
    };

    return `Story,"${cleanTitle}","${cleanDesc}",${s.storyPoints},${priorityMap[s.priority] || 'Medium'},"${statusMap[s.status]}","${s.assignee.name}"`;
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Generates Trello-compatible JSON format.
 */
export function exportToTrelloJSON(stories: UserStory[], sprintName: string = 'Sprint 1'): string {
  const lists = [
    { id: 'list-backlog', name: 'Product Backlog' },
    { id: 'list-todo', name: 'Sprint To Do' },
    { id: 'list-inprogress', name: 'In Progress' },
    { id: 'list-review', name: 'Code Review & QA' },
    { id: 'list-done', name: 'Done' }
  ];

  const cards = stories.map((s, idx) => {
    const listMap: Record<TaskStatus, string> = {
      backlog: 'list-backlog',
      todo: 'list-todo',
      in_progress: 'list-inprogress',
      review: 'list-review',
      done: 'list-done'
    };

    return {
      id: `card-${s.id}`,
      name: `[${s.storyPoints} pts] ${s.title}`,
      desc: `**Como:** ${s.rolePersona}\n**Quiero:** ${s.want}\n**Para:** ${s.soThat}\n\n**Criterios de Aceptación:**\n${s.acceptanceCriteria.map(c => `- [ ] ${c}`).join('\n')}`,
      idList: listMap[s.status],
      pos: (idx + 1) * 1000,
      labels: s.tags.map(t => ({ name: t, color: 'blue' })),
      checklists: [
        {
          name: 'Definition of Done (DoD)',
          checkItems: s.checklist.map(ci => ({ name: ci.text, state: ci.completed ? 'complete' : 'incomplete' }))
        }
      ]
    };
  });

  return JSON.stringify({
    name: `Tablero Scrum - ${sprintName}`,
    desc: 'Exportado desde ScrumMastery Interactive Guide',
    lists,
    cards
  }, null, 2);
}

/**
 * Generates GitHub Issues Markdown template for all User Stories.
 */
export function exportToGitHubMarkdown(stories: UserStory[]): string {
  return stories.map(s => {
    return `### 🚀 User Story: ${s.title}
**Estimación:** \`${s.storyPoints} Story Points\` | **Prioridad:** \`${s.priority.toUpperCase()}\` | **Responsable:** @${s.assignee.name.toLowerCase().replace(/\s+/g, '')}

#### 📋 Descripción
> **Como** ${s.rolePersona}  
> **Quiero** ${s.want}  
> **Para** ${s.soThat}

#### ✅ Criterios de Aceptación
${s.acceptanceCriteria.map(c => `- [ ] ${c}`).join('\n')}

#### 🛠️ Definition of Done (Checklist de Calidad)
${s.checklist.map(c => `- [${c.completed ? 'x' : ' '}] ${c.text}`).join('\n')}

---
`;
  }).join('\n');
}
