import { create } from 'zustand';
import { Task, SubTask, Comment } from './types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'progress' | 'subtasks' | 'completed' | 'priority' | 'comments' | 'createdAt' | 'modifiedAt'>) => void;
  updateTaskProgress: (taskId: string, progress: number) => void;
  updateTaskTitle: (taskId: string, title: string) => void;
  addSubtask: (taskId: string, subtask: Omit<SubTask, 'id' | 'completed' | 'comments' | 'priority' | 'createdAt' | 'modifiedAt'>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  updateTaskPriority: (taskId: string, priority: Task['priority']) => void;
  updateSubtaskPriority: (taskId: string, subtaskId: string, priority: SubTask['priority']) => void;
  updateTaskDeadline: (taskId: string, deadline: string | undefined) => void;
  toggleClientName: (taskId: string, clientName?: string) => void;
  updateSubtask: (taskId: string, subtaskId: string, title: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  reorderSubtasks: (taskId: string, subtasks: SubTask[]) => void;
  addTaskComment: (taskId: string, text: string) => void;
  addSubtaskComment: (taskId: string, subtaskId: string, text: string) => void;
  deleteComment: (taskId: string, commentId: string, subtaskId?: string) => void;
  convertToSubtasks: (taskId: string) => void;
}

const calculateProgress = (subtasks: SubTask[]): number => {
  if (subtasks.length === 0) return 0;
  const completedCount = subtasks.filter(st => st.completed).length;
  return Math.round((completedCount / subtasks.length) * 100);
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          progress: 0,
          subtasks: [],
          completed: false,
          priority: 'medium',
          comments: [],
          createdAt: new Date().toISOString(),
          modifiedAt: new Date().toISOString(),
        },
      ],
    })),
  updateTaskProgress: (taskId, progress) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, progress, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  updateTaskTitle: (taskId, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, title, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  addSubtask: (taskId, subtask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress: 0,
              isManualProgress: false,
              subtasks: [
                ...task.subtasks,
                {
                  ...subtask,
                  id: crypto.randomUUID(),
                  completed: false,
                  comments: [],
                  priority: task.priority,
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                },
              ],
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  toggleSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      completed: !subtask.completed,
                      modifiedAt: new Date().toISOString(),
                    }
                  : subtask
              ),
              progress: calculateProgress(
                task.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, completed: !st.completed } : st
                )
              ),
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  toggleTaskCompletion: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  deleteSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId),
              progress: calculateProgress(
                task.subtasks.filter((st) => st.id !== subtaskId)
              ),
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  updateTaskPriority: (taskId, priority) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, priority, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  updateSubtaskPriority: (taskId, subtaskId, priority) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      priority,
                      modifiedAt: new Date().toISOString(),
                    }
                  : subtask
              ),
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  updateTaskDeadline: (taskId, deadline) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, deadline, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  toggleClientName: (taskId, clientName) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, clientName, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  updateSubtask: (taskId, subtaskId, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      title,
                      modifiedAt: new Date().toISOString(),
                    }
                  : subtask
              ),
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  reorderTasks: (tasks) => set({ tasks }),
  reorderSubtasks: (taskId, subtasks) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, subtasks, modifiedAt: new Date().toISOString() }
          : task
      ),
    })),
  addTaskComment: (taskId, text) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: [
                ...task.comments,
                {
                  id: crypto.randomUUID(),
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  addSubtaskComment: (taskId, subtaskId, text) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId
                  ? {
                      ...subtask,
                      comments: [
                        ...subtask.comments,
                        {
                          id: crypto.randomUUID(),
                          text,
                          createdAt: new Date().toISOString(),
                        },
                      ],
                      modifiedAt: new Date().toISOString(),
                    }
                  : subtask
              ),
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
  deleteComment: (taskId, commentId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? subtaskId
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === subtaskId
                    ? {
                        ...subtask,
                        comments: subtask.comments.filter(
                          (comment) => comment.id !== commentId
                        ),
                        modifiedAt: new Date().toISOString(),
                      }
                    : subtask
                ),
                modifiedAt: new Date().toISOString(),
              }
            : {
                ...task,
                comments: task.comments.filter(
                  (comment) => comment.id !== commentId
                ),
                modifiedAt: new Date().toISOString(),
              }
          : task
      ),
    })),
  convertToSubtasks: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isManualProgress: false,
              progress: 0,
              subtasks: [
                {
                  id: crypto.randomUUID(),
                  title: 'Subtask 1',
                  completed: false,
                  comments: [],
                  priority: task.priority,
                  createdAt: new Date().toISOString(),
                  modifiedAt: new Date().toISOString(),
                },
              ],
              modifiedAt: new Date().toISOString(),
            }
          : task
      ),
    })),
}));