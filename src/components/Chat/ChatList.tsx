import React from 'react';
import { useChatStore } from '../../store/chat';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare } from 'lucide-react';
import clsx from 'clsx';

export const ChatList = () => {
  const { chats, activeChat, setActiveChat } = useChatStore();

  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100%-4rem)]">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className={clsx(
              'w-full p-4 border-b border-gray-100 hover:bg-gray-50 flex items-start gap-3',
              activeChat === chat.id && 'bg-blue-50 hover:bg-blue-50'
            )}
          >
            <div className="relative">
              {chat.customer.avatar ? (
                <img
                  src={chat.customer.avatar}
                  alt={chat.customer.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                </div>
              )}
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium text-gray-900 truncate">{chat.customer.name}</p>
                {chat.lastMessage && (
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: true })}
                  </span>
                )}
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage.text}</p>
              )}
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={clsx(
                    'text-xs px-2 py-0.5 rounded-full',
                    chat.customer.platform === 'whatsapp'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  )}
                >
                  {chat.customer.platform}
                </span>
                <span
                  className={clsx(
                    'text-xs px-2 py-0.5 rounded-full',
                    chat.status === 'active'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  )}
                >
                  {chat.status}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};