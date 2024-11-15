import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ProgressBar } from './ProgressBar';
import { PriorityDropdown } from './PriorityDropdown';
import { Comments } from './Comments';
import { SubTaskList } from './SubTaskList';
import { Task } from '../types';
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  ListTodo,
  Calendar,
  User,
  Clock,
  Pencil,
} from 'lucide-react';
import { useTaskStore } from '../store';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
}

const priorityColors = {
  urgent: 'bg-red-50',
  high: 'bg-orange-50',
  medium: 'bg-blue-50',
  low: 'bg-gray-50',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newSubtask, setNewSubtask] = useState('');
  const [clientName, setClientName] = useState('');
  const [isEditingClient, setIsEditingClient] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });
  const {
    addSubtask,
    toggleSubtask,
    updateTaskProgress,
    deleteTask,
    deleteSubtask,
    toggleTaskCompletion,
    updateTaskPriority,
    updateTaskDeadline,
    toggleClientName,
    reorderSubtasks,
    convertToSubtasks,
    updateTaskTitle,
  } = useTaskStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      addSubtask(task.id, { title: newSubtask.trim() });
      setNewSubtask('');
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTaskProgress(task.id, Number(e.target.value));
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toggleClientName(task.id, clientName.trim() || undefined);
    setIsEditingClient(false);
    setClientName('');
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      updateTaskTitle(task.id, editedTitle.trim());
      setIsEditingTitle(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'rounded-lg shadow-sm border border-gray-200 p-4 mb-3',
        isOverdue ? 'bg-red-600 text-white' : priorityColors[task.priority as keyof typeof priorityColors],
        task.completed && 'opacity-75'
      )}
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="touch-none text-gray-400 hover:text-gray-600"
        >
          <GripVertical size={20} />
        </button>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx("hover:text-gray-800", isOverdue ? "text-white" : "text-gray-600")}
        >
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>

        {isEditingTitle ? (
          <form onSubmit={handleTitleSubmit} className="flex-1">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-2 py-1 rounded border border-gray-300"
              autoFocus
              onBlur={handleTitleSubmit}
            />
          </form>
        ) : (
          <div className="flex-1 flex items-center gap-2">
            <h3
              className={clsx(
                'font-medium',
                task.completed && 'line-through',
                isOverdue ? 'text-white' : 'text-gray-800'
              )}
            >
              {task.title}
            </h3>
            <button
              onClick={() => {
                setIsEditingTitle(true);
                setEditedTitle(task.title);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Pencil size={14} />
            </button>
          </div>
        )}

        {task.clientName ? (
          <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {task.clientName}
          </span>
        ) : (
          <button
            onClick={() => setIsEditingClient(true)}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            <User size={18} />
          </button>
        )}

        {task.deadline ? (
          <button
            onClick={() => updateTaskDeadline(task.id, undefined)}
            className={clsx(
              "px-2 py-1 text-sm rounded-full",
              isOverdue ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
            )}
          >
            {new Date(task.deadline).toLocaleDateString()}
          </button>
        ) : (
          <input
            type="datetime-local"
            onChange={(e) => updateTaskDeadline(task.id, e.target.value)}
            className="rounded border-gray-300 text-sm"
          />
        )}

        <PriorityDropdown
          priority={task.priority}
          onChange={(priority) => updateTaskPriority(task.id, priority)}
        />
        {task.isManualProgress && (
          <button
            onClick={() => convertToSubtasks(task.id)}
            className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            title="Convert to subtasks"
          >
            <ListTodo size={18} />
          </button>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {isEditingClient && (
        <form onSubmit={handleClientSubmit} className="mt-2 flex gap-2">
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter client name..."
            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add Client
          </button>
        </form>
      )}

      <div className="mt-3">
        <ProgressBar progress={task.progress} />
        <div className="mt-1 flex items-center justify-between">
          <span className={clsx(
            "text-sm",
            isOverdue ? "text-white" : "text-gray-600"
          )}>
            {Math.round(task.progress)}% Complete
          </span>
          <div className="flex items-center gap-4">
            <span className={clsx(
              "text-xs",
              isOverdue ? "text-white" : "text-gray-500"
            )}>
              <Clock size={12} className="inline mr-1" />
              Created: {formatDate(task.createdAt)}
            </span>
            <span className={clsx(
              "text-xs",
              isOverdue ? "text-white" : "text-gray-500"
            )}>
              <Clock size={12} className="inline mr-1" />
              Modified: {formatDate(task.modifiedAt)}
            </span>
            <Comments taskId={task.id} comments={task.comments} />
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {task.isManualProgress ? (
            <input
              type="range"
              min="0"
              max="100"
              value={task.progress}
              onChange={handleProgressChange}
              className="w-full"
            />
          ) : (
            <>
              <SubTaskList
                taskId={task.id}
                subtasks={task.subtasks}
                onReorder={(newSubtasks) => reorderSubtasks(task.id, newSubtasks)}
              />
              <form onSubmit={handleAddSubtask} className="flex gap-2">
                <input
                  type="text"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  placeholder="Add subtask..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-100"
                >
                  <Plus size={16} />
                  Add
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};