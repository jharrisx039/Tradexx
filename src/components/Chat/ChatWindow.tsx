import React from 'react';
import { useChatStore } from '../../store/chat';
import { MessageBubble } from './MessageBubble';
import { useTicketStore } from '../../store/tickets';
import { Send, Ticket, MessageSquare, X, User, Edit } from 'lucide-react';
import { TicketCreationModal } from '../Tickets/TicketCreationModal';
import { CustomerDetailsModal } from './CustomerDetailsModal';

export const ChatWindow = () => {
  const { chats, activeChat, sendMessage, selectedMessages, clearSelectedMessages } = useChatStore();
  const { addTicket } = useTicketStore();
  const [newMessage, setNewMessage] = React.useState('');
  const [isCreatingTicket, setIsCreatingTicket] = React.useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const activeConversation = chats.find((chat) => chat.id === activeChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChat || !newMessage.trim()) return;

    sendMessage(activeChat, newMessage.trim());
    setNewMessage('');
  };

  const handleCreateTicket = (notes: string, files: File[]) => {
    if (selectedMessages.length !== 2 || !activeConversation) return;

    const [start, end] = selectedMessages;
    const startIndex = activeConversation.messages.findIndex((m) => m.id === start.id);
    const endIndex = activeConversation.messages.findIndex((m) => m.id === end.id);
    
    const conversationSnippet = activeConversation.messages
      .slice(
        Math.min(startIndex, endIndex),
        Math.max(startIndex, endIndex) + 1
      )
      .map((m) => `${m.sender}: ${m.text}`)
      .join('\n');

    addTicket({
      title: `Ticket from chat with ${activeConversation.customer.name}`,
      description: `${conversationSnippet}\n\nAdditional Notes:\n${notes}`,
      status: 'open',
      priority: 'medium',
      attachments: files,
    });

    clearSelectedMessages();
    setIsCreatingTicket(false);
  };

  if (!activeConversation) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg border border-gray-200">
        <div className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No chat selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {activeConversation.customer.avatar ? (
                <img
                  src={activeConversation.customer.avatar}
                  alt={activeConversation.customer.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeConversation.customer.name}
                </h2>
                <button
                  onClick={() => setIsEditingCustomer(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                via {activeConversation.customer.platform}
              </p>
            </div>
          </div>
          {selectedMessages.length === 2 && (
            <button
              onClick={() => setIsCreatingTicket(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              <Ticket className="w-4 h-4" />
              Create Ticket
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeConversation.messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isSelected={selectedMessages.some((m) => m.id === message.id)}
            isInSelectedRange={
              selectedMessages.length === 2 &&
              activeConversation.messages.indexOf(message) >= 
                activeConversation.messages.indexOf(selectedMessages[0]) &&
              activeConversation.messages.indexOf(message) <= 
                activeConversation.messages.indexOf(selectedMessages[1])
            }
            isSelectionStart={selectedMessages[0]?.id === message.id}
            isSelectionEnd={selectedMessages[1]?.id === message.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </form>

      {isCreatingTicket && (
        <TicketCreationModal
          onClose={() => setIsCreatingTicket(false)}
          onSubmit={handleCreateTicket}
          selectedMessageCount={
            activeConversation.messages.filter((_, index) => {
              const startIndex = activeConversation.messages.indexOf(selectedMessages[0]);
              const endIndex = activeConversation.messages.indexOf(selectedMessages[1]);
              return index >= Math.min(startIndex, endIndex) && 
                     index <= Math.max(startIndex, endIndex);
            }).length
          }
        />
      )}

      {isEditingCustomer && (
        <CustomerDetailsModal
          customer={activeConversation.customer}
          onClose={() => setIsEditingCustomer(false)}
          onSave={(updatedCustomer) => {
            // Handle customer update logic
            setIsEditingCustomer(false);
          }}
        />
      )}
    </div>
  );
};