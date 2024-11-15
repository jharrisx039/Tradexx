import React, { useState } from 'react';
import { MessageSquare, Send, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Comment } from '../types';
import { useTaskStore } from '../store';
import clsx from 'clsx';

interface CommentsProps {
  taskId: string;
  subtaskId?: string;
  comments: Comment[];
  className?: string;
}

export const Comments: React.FC<CommentsProps> = ({
  taskId,
  subtaskId,
  comments,
  className,
}) => {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTaskComment, addSubtaskComment, deleteComment } = useTaskStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      if (subtaskId) {
        addSubtaskComment(taskId, subtaskId, newComment.trim());
      } else {
        addTaskComment(taskId, newComment.trim());
      }
      setNewComment('');
      setIsExpanded(true);
    }
  };

  if (comments.length === 0 && !newComment) {
    return (
      <button
        onClick={() => setNewComment(' ')}
        className={clsx(
          'inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700',
          className
        )}
      >
        <MessageSquare size={14} />
        Add comment
      </button>
    );
  }

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </span>
        {comments.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
      
      {isExpanded && comments.map((comment) => (
        <div
          key={comment.id}
          className="group flex items-start gap-2 rounded-md bg-gray-50 p-2 text-sm"
        >
          <p className="flex-1 text-gray-700">{comment.text}</p>
          <button
            onClick={() => deleteComment(taskId, comment.id, subtaskId)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          <Send size={14} />
          Send
        </button>
      </form>
    </div>
  );
};