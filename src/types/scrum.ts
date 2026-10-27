export type TabType = 
  | 'what-is-scrum' 
  | 'how-it-works' 
  | 'interactive-examples' 
  | 'sprint-board' 
  | 'agile-tools' 
  | 'mini-game' 
  | 'bibliography';

export interface ScrumPillar {
  id: string;
  name: string;
  tagline: string;
  description: string;
  example: string;
  iconName: string;
}

export interface ScrumValue {
  id: string;
  name: string;
  description: string;
  inPractice: string;
  color: string;
}

export interface ScrumRole {
  id: string;
  title: string;
  subtitle: string;
  accountabilities: string[];
  antiPatterns: string[];
  keyQuestion: string;
  icon: string;
  color: string;
}

export interface ScrumEvent {
  id: string;
  name: string;
  timebox: string;
  timeboxRule: string;
  purpose: string;
  participants: string;
  inputs: string[];
  outputs: string[];
  bestPractices: string[];
}

export interface ScrumArtifact {
  id: string;
  name: string;
  commitment: string;
  commitmentDescription: string;
  description: string;
  characteristics: string[];
}

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'baja' | 'media' | 'alta' | 'critica';

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserStory {
  id: string;
  title: string;
  rolePersona: string;
  want: string;
  soThat: string;
  storyPoints: number;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  checklist: TaskChecklistItem[];
  acceptanceCriteria: string[];
}

export interface SprintMetrics {
  totalPoints: number;
  completedPoints: number;
  inProgressPoints: number;
  remainingPoints: number;
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
}

export interface GameQuestion {
  id: number;
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  topic: 'roles' | 'eventos' | 'artefactos' | 'valores' | 'antipatrones';
  difficulty: 'fácil' | 'medio' | 'avanzado';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface ToolIntegrationInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  scrumAlignment: string;
  exportFormat: string;
  color: string;
  keyFeatures: string[];
}

export interface ReferenceSource {
  id: string;
  title: string;
  authors: string;
  year: number;
  publisherOrOrg: string;
  url: string;
  contribution: string;
  quote: string;
  category: 'Oficial' | 'Libro Fundacional' | 'Metodología & Estimación' | 'Liderazgo';
}

export interface RoleMatchItem {
  id: number;
  task: string;
  correctRole: 'po' | 'sm' | 'dev';
  explanation: string;
}

export interface TrueFalseItem {
  id: number;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export interface OrderSprintItem {
  id: string;
  name: string;
  order: number;
  description: string;
  icon: string;
}

