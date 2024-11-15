import React from 'react';
import { ChatMessage, useChatStore } from '../../store/chat';
import { format } from 'date-fns';
import clsx from 'clsx';

interface MessageBubbleProps {
  message: ChatMessage;
  isSelected: boolean;
  isInSelectedRange: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isSelected,
  isInSelectedRange,
  isSelectionStart,
  isSelectionEnd
}) => {
  const { activeChat, toggleMessageSelection, selectedMessages } = useChatStore();
  const isAgent = message?.type === 'agent';

  const handleSelect = () => {
    if (!activeChat || !message) return;
    if (selectedMessages.length < 2 || isSelected) {
      toggleMessageSelection(activeChat, message.id);
    }
  };

  if (!message) return null;

  return (
    <div className={clsx(
      'flex group relative',
      isAgent ? 'justify-end' : 'justify-start'
    )}>
      {/* Selection Indicator */}
      {(isSelectionStart || isSelectionEnd) && (
        <div
          className={clsx(
            'absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-green-500 cursor-pointer',
            isAgent ? '-left-6' : '-right-6'
          )}
          onClick={handleSelect}
        />
      )}

      <div
        onClick={handleSelect}
        className={clsx(
          'max-w-[70%] rounded-lg px-4 py-2 cursor-pointer transition-colors',
          isSelected || isInSelectedRange ? 'bg-red-700 text-white' : 
          isAgent ? 'bg-blue-500 text-white' :
          message.type === 'whatsapp' ? 'bg-green-100 text-gray-900' :
          'bg-gray-100 text-gray-900',
          'hover:opacity-90'
        )}
      >
        {!isAgent && (
          <p className={clsx(
            'text-xs font-medium mb-1',
            isSelected || isInSelectedRange ? 'text-white/90' : 'opacity-75'
          )}>
            {message.sender}
          </p>
        )}
        <p className="text-sm">{message.text}</p>
        <p className={clsx(
          'text-xs mt-1',
          isSelected || isInSelectedRange ? 'text-white/90' : 'opacity-75'
        )}>
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>
    </div>
  );
};