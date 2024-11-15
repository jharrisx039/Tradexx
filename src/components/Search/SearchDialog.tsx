import React, { useState, useEffect } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { generateAnalysis } from '../../lib/api';
import { useTaskStore } from '../../store';
import clsx from 'clsx';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery: string;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  initialQuery,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addTask } = useTaskStore();

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleAnalysis();
    }
  }, [isOpen, initialQuery]);

  const handleAnalysis = async () => {
    try {
      setIsLoading(true);
      setError('');
      const result = await generateAnalysis(query);
      setResponse(result.response);

      // Handle task or ticket creation
      if (result.type === 'task' && result.data) {
        addTask(result.data);
      }
      // Handle other types of data as needed
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalysis()}
              placeholder="Ask anything or create tasks/tickets..."
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-blue-500 animate-sparkle" />
                <div className="absolute -inset-1">
                  <div className="w-full h-full rotate-45">
                    <Sparkles className="h-8 w-8 text-blue-500 animate-sparkle" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">Thinking...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">{error}</p>
              <button
                onClick={handleAnalysis}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : response ? (
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{response}</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Ask me anything! I can help you with:</p>
              <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
                <li>• Creating new tasks or tickets</li>
                <li>• Analyzing your data and providing insights</li>
                <li>• Answering questions about your projects</li>
                <li>• Managing your workflow</li>
              </ul>
            </div>
          )}
        </div>

        {!isLoading && response && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleAnalysis}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Ask Another Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};