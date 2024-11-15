import { create } from 'zustand';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  type: 'meeting' | 'conference' | 'training' | 'social' | 'holiday';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  organizer: string;
  attendees: string[];
  isPublic: boolean;
  color: string;
  reminders: Array<{
    id: string;
    type: 'email' | 'notification';
    time: number; // minutes before event
  }>;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

interface EventStore {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addAttendee: (eventId: string, attendeeId: string) => void;
  removeAttendee: (eventId: string, attendeeId: string) => void;
  addReminder: (eventId: string, reminder: Omit<Event['reminders'][0], 'id'>) => void;
  removeReminder: (eventId: string, reminderId: string) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  
  addEvent: (event) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          ...event,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === id
          ? {
              ...event,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),

  addAttendee: (eventId, attendeeId) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: [...event.attendees, attendeeId],
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  removeAttendee: (eventId, attendeeId) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              attendees: event.attendees.filter((id) => id !== attendeeId),
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  addReminder: (eventId, reminder) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              reminders: [
                ...event.reminders,
                { ...reminder, id: crypto.randomUUID() },
              ],
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),

  removeReminder: (eventId, reminderId) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              reminders: event.reminders.filter((r) => r.id !== reminderId),
              updatedAt: new Date().toISOString(),
            }
          : event
      ),
    })),
}));