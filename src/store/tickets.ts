import { create } from 'zustand';

export interface TimelineEvent {
  id: string;
  type: 'created' | 'comment' | 'status' | 'priority' | 'file' | 'assigned';
  description: string;
  content?: string;
  timestamp: string;
  user?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'inProgress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  comments: Array<{
    id: string;
    text: string;
    author: string;
    createdAt: string;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  events: TimelineEvent[];
  chatHistory?: Array<{
    sender: string;
    text: string;
    timestamp: string;
    isHighlighted?: boolean;
  }>;
}

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'attachments' | 'events'> & { attachments?: File[] }) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  addComment: (ticketId: string, text: string, author: string) => void;
  addEvent: (ticketId: string, event: Omit<TimelineEvent, 'id'>) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        {
          ...ticket,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          comments: [],
          attachments: [],
          events: [
            {
              id: crypto.randomUUID(),
              type: 'created',
              description: 'Ticket created',
              timestamp: new Date().toISOString(),
            },
          ],
        },
      ],
    })),

  updateTicket: (id, updates) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : ticket
      ),
    })),

  deleteTicket: (id) =>
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    })),

  addComment: (ticketId, text, author) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              comments: [
                ...ticket.comments,
                {
                  id: crypto.randomUUID(),
                  text,
                  author,
                  createdAt: new Date().toISOString(),
                },
              ],
              events: [
                ...ticket.events,
                {
                  id: crypto.randomUUID(),
                  type: 'comment',
                  description: `Comment added by ${author}`,
                  content: text,
                  timestamp: new Date().toISOString(),
                  user: author,
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : ticket
      ),
    })),

  addEvent: (ticketId, event) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              events: [
                ...ticket.events,
                {
                  ...event,
                  id: crypto.randomUUID(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : ticket
      ),
    })),
}));