import React from 'react';
import { X, Plus } from 'lucide-react';
import clsx from 'clsx';

interface WorkflowFormProps {
  onClose: () => void;
}

export const WorkflowForm: React.FC<WorkflowFormProps> = ({ onClose }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    trigger: '',
    steps: [] as { type: string; content: string }[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workflow creation logic here
    onClose();
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { type: 'email', content: '' }],
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }));
  };

  const updateStep = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Create Workflow</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Workflow Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Trigger
            </label>
            <select
              required
              value={formData.trigger}
              onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Trigger</option>
              <option value="signup">New Signup</option>
              <option value="purchase">Purchase Made</option>
              <option value="abandoned">Cart Abandoned</option>
              <option value="custom">Custom Event</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Workflow Steps
              </label>
              <button
                type="button"
                onClick={addStep}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Step
              </button>
            </div>

            <div className="space-y-4">
              {formData.steps.map((step, index) => (
                <div
                  key={index}
                  className="relative border border-gray-200 rounded-lg p-4"
                >
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="space-y-3">
                    <select
                      value={step.type}
                      onChange={(e) => updateStep(index, 'type', e.target.value)}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="email">Send Email</option>
                      <option value="wait">Wait</option>
                      <option value="condition">Check Condition</option>
                      <option value="action">Perform Action</option>
                    </select>

                    {step.type === 'email' && (
                      <textarea
                        value={step.content}
                        onChange={(e) => updateStep(index, 'content', e.target.value)}
                        placeholder="Email content..."
                        rows={3}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    )}

                    {step.type === 'wait' && (
                      <input
                        type="number"
                        value={step.content}
                        onChange={(e) => updateStep(index, 'content', e.target.value)}
                        placeholder="Wait duration in hours"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    )}

                    {step.type === 'condition' && (
                      <input
                        type="text"
                        value={step.content}
                        onChange={(e) => updateStep(index, 'content', e.target.value)}
                        placeholder="Condition expression"
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Workflow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};