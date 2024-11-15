import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  type: 'user' | 'agent' | 'whatsapp';
  selected?: boolean;
}

export interface Chat {
  id: string;
  customer: {
    id: string;
    name: string;
    avatar?: string;
    platform: 'web' | 'whatsapp';
  };
  messages: ChatMessage[];
  unreadCount: number;
  lastMessage?: ChatMessage;
  status: 'active' | 'resolved';
}

interface ChatStore {
  chats: Chat[];
  activeChat: string | null;
  selectedMessages: ChatMessage[];
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, text: string) => void;
  toggleMessageSelection: (chatId: string, messageId: string) => void;
  clearSelectedMessages: () => void;
  markAsRead: (chatId: string) => void;
  addChat: (chat: Omit<Chat, 'id' | 'messages' | 'unreadCount' | 'status'>) => void;
  resolveChat: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [
    {
      id: '1',
      customer: {
        id: '1',
        name: 'John Doe',
        platform: 'web'
      },
      messages: [
        {
          id: '1',
          text: 'Hello! How can I help you today?',
          sender: 'agent',
          timestamp: new Date().toISOString(),
          type: 'agent'
        }
      ],
      unreadCount: 0,
      status: 'active'
    },
    {
      id: '2',
      customer: {
        id: '2',
        name: 'Jane Smith',
        platform: 'whatsapp'
      },
      messages: [
        {
          id: '2',
          text: 'Hi! I need help with my order.',
          sender: 'user',
          timestamp: new Date().toISOString(),
          type: 'whatsapp'
        }
      ],
      unreadCount: 1,
      status: 'active'
    }
  ],
  activeChat: null,
  selectedMessages: [],

  setActiveChat: (chatId) => {
    set((state) => {
      if (chatId) {
        // Mark chat as read when selected
        const updatedChats = state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
        );
        return { activeChat: chatId, chats: updatedChats };
      }
      return { activeChat: chatId };
    });
  },

  sendMessage: (chatId, text) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      text,
      sender: 'agent',
      timestamp: new Date().toISOString(),
      type: 'agent',
    };

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message,
            }
          : chat
      ),
    }));
  },

  toggleMessageSelection: (chatId, messageId) => {
    set((state) => {
      const chat = state.chats.find((c) => c.id === chatId);
      if (!chat) return state;

      const message = chat.messages.find((m) => m.id === messageId);
      if (!message) return state;

      const isSelected = state.selectedMessages.some((m) => m.id === messageId);
      const selectedMessages = isSelected
        ? state.selectedMessages.filter((m) => m.id !== messageId)
        : [...state.selectedMessages, message];

      return {
        selectedMessages: selectedMessages.length <= 2 ? selectedMessages : state.selectedMessages,
      };
    });
  },

  clearSelectedMessages: () => {
    set({ selectedMessages: [] });
  },

  markAsRead: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              unreadCount: 0,
            }
          : chat
      ),
    }));
  },

  addChat: (chat) => {
    set((state) => ({
      chats: [
        ...state.chats,
        {
          ...chat,
          id: crypto.randomUUID(),
          messages: [],
          unreadCount: 0,
          status: 'active',
        },
      ],
    }));
  },

  resolveChat: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              status: 'resolved',
            }
          : chat
      ),
    }));
  },
}));