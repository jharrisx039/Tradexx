import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { useTaskStore } from '../store';
import { Plus } from 'lucide-react';

export const TodoList = () => {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const [sortOrder, setSortOrder] = React.useState<'priority' | 'custom'>('priority');
  const { tasks, addTask, reorderTasks } = useTaskStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);
      reorderTasks(arrayMove(tasks, oldIndex, newIndex));
      setSortOrder('custom');
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        isManualProgress: !newTaskTitle.toLowerCase().includes('subtask'),
      });
      setNewTaskTitle('');
    }
  };

  const priorityOrder = {
    urgent: 0,
    high: 1,
    medium: 2,
    low: 3,
  };

  const filteredTasks = tasks
    .filter((task) => priorityFilter === 'all' || task.priority === priorityFilter)
    .sort((a, b) => {
      if (sortOrder === 'priority') {
        return (
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
        );
      }
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
        <p className="mt-2 text-gray-600">Manage and organize your tasks</p>
      </div>

      <TaskFilters
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Tip: Include "subtask" in the title to create a task with subtasks
        </p>
      </form>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};