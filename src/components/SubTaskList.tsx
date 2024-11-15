import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SubTask } from '../types';
import { SubTaskItem } from './SubTaskItem';

interface SubTaskListProps {
  taskId: string;
  subtasks: SubTask[];
  onReorder: (newSubtasks: SubTask[]) => void;
}

export const SubTaskList: React.FC<SubTaskListProps> = ({
  taskId,
  subtasks,
  onReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = subtasks.findIndex((st) => st.id === active.id);
      const newIndex = subtasks.findIndex((st) => st.id === over.id);
      onReorder(arrayMove(subtasks, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={subtasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {subtasks.map((subtask) => (
            <SubTaskItem
              key={subtask.id}
              taskId={taskId}
              subtask={subtask}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};