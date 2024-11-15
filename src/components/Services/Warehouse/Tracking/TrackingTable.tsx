import React from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tracking, useWarehouseStore } from '../../../../store/warehouse';
import { MoreHorizontal, GripVertical, Eye, Download } from 'lucide-react';
import clsx from 'clsx';

interface TrackingTableProps {
  trackings: Tracking[];
  viewType: 'default' | 'compact' | 'detailed';
}

const SortableHeader = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <th
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider group"
    >
      <div className="flex items-center gap-2">
        <button {...listeners} className="touch-none opacity-0 group-hover:opacity-100">
          <GripVertical className="h-4 w-4" />
        </button>
        {children}
      </div>
    </th>
  );
};

export const TrackingTable: React.FC<TrackingTableProps> = ({ trackings, viewType }) => {
  const { columnOrder, hiddenColumns, reorderColumns } = useWarehouseStore();
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [editingCell, setEditingCell] = React.useState<{ id: string; field: string } | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      reorderColumns(arrayMove(columnOrder, oldIndex, newIndex));
    }
  };

  const handleCellDoubleClick = (trackingId: string, field: string) => {
    setEditingCell({ id: trackingId, field });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const visibleColumns = columnOrder.filter(col => !hiddenColumns.includes(col));

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === trackings.length}
                    onChange={(e) => {
                      setSelectedRows(
                        e.target.checked ? trackings.map(t => t.id) : []
                      );
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <SortableContext items={visibleColumns}>
                  {visibleColumns.map(columnId => (
                    <SortableHeader key={columnId} id={columnId}>
                      {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                    </SortableHeader>
                  ))}
                </SortableContext>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trackings.map(tracking => (
                <tr key={tracking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(tracking.id)}
                      onChange={(e) => {
                        setSelectedRows(prev =>
                          e.target.checked
                            ? [...prev, tracking.id]
                            : prev.filter(id => id !== tracking.id)
                        );
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  {visibleColumns.map(columnId => (
                    <td
                      key={columnId}
                      className="px-6 py-4 whitespace-nowrap"
                      onDoubleClick={() => handleCellDoubleClick(tracking.id, columnId)}
                    >
                      {editingCell?.id === tracking.id && editingCell?.field === columnId ? (
                        <input
                          type="text"
                          defaultValue={tracking[columnId as keyof Tracking] as string}
                          onBlur={handleCellBlur}
                          autoFocus
                          className="w-full rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {columnId === 'dimensions' ? (
                            `${tracking.dimensions.length}x${tracking.dimensions.width}x${tracking.dimensions.height}`
                          ) : (
                            tracking[columnId as keyof Tracking]
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Eye className="h-5 w-5" />
                      </button>
                      {tracking.attachment && (
                        <button className="text-gray-400 hover:text-gray-500">
                          <Download className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DndContext>
  );
};