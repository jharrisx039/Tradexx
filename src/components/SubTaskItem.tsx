import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SubTask } from '../types';
import { Comments } from './Comments';
import { PriorityDropdown } from './PriorityDropdown';
import { useTaskStore } from '../store';
import { GripVertical, Trash2, Pencil } from 'lucide-react';
import clsx from 'clsx';

interface SubTaskItemProps {
  taskId: string;
  subtask: SubTask;
}

export const SubTaskItem: React.FC<SubTaskItemProps> = ({ taskId, subtask }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: subtask.id,
  });
  const { toggleSubtask, deleteSubtask, updateSubtaskPriority, updateSubtask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(subtask.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      updateSubtask(taskId, subtask.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 group bg-gray-50 rounded-md p-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={16} />
      </button>
      <input
        type="checkbox"
        checked={subtask.completed}
        onChange={() => toggleSubtask(taskId, subtask.id)}
        className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-2 py-1 rounded border border-gray-300"
            autoFocus
            onBlur={handleSubmit}
          />
        </form>
      ) : (
        <div className="flex-1 flex items-center gap-2">
          <span
            className={clsx(
              'text-gray-700',
              subtask.completed && 'line-through text-gray-500'
            )}
          >
            {subtask.title}
          </span>
          <button
            onClick={() => {
              setIsEditing(true);
              setEditedTitle(subtask.title);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-full"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}

      <PriorityDropdown
        priority={subtask.priority}
        onChange={(priority) => updateSubtaskPriority(taskId, subtask.id, priority)}
        size="sm"
      />
      <button
        onClick={() => deleteSubtask(taskId, subtask.id)}
        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
      >
        <Trash2 size={14} />
      </button>
      <Comments
        taskId={taskId}
        subtaskId={subtask.id}
        comments={subtask.comments}
        className="ml-2"
      />
    </div>
  );
};