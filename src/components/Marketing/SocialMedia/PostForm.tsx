import React from 'react';
import { X, Upload, Calendar } from 'lucide-react';
import { useMarketingStore } from '../../../store/marketing';
import clsx from 'clsx';

interface PostFormProps {
  onClose: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onClose }) => {
  const { addPost } = useMarketingStore();
  const [formData, setFormData] = React.useState({
    platform: '',
    content: '',
    scheduledFor: '',
  });
  const [media, setMedia] = React.useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({
      ...formData,
      status: formData.scheduledFor ? 'scheduled' : 'draft',
      media: media.map(file => URL.createObjectURL(file)), // In a real app, upload to S3/CDN
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Create Post</h3>
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
              Platform
            </label>
            <select
              required
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Platform</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="What would you like to share?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => setMedia(Array.from(e.target.files || []))}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, Video up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Schedule
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="datetime-local"
                value={formData.scheduledFor}
                onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
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
              {formData.scheduledFor ? 'Schedule Post' : 'Save Draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};