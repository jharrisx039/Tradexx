export interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  comments: Comment[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  modifiedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  progress: number;
  subtasks: SubTask[];
  isManualProgress: boolean;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  comments: Comment[];
  clientName?: string;
  deadline?: string;
  createdAt: string;
  modifiedAt: string;
}