import React from 'react';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';

export const Chat = () => {
  return (
    <div className="flex h-[calc(100vh-2rem)] gap-6">
      <div className="w-80 flex-shrink-0">
        <ChatList />
      </div>
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
};