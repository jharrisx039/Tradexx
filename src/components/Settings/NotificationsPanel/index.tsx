import React from 'react';
import { Bell, Mail, MessageSquare, Calendar, AlertTriangle, Clock } from 'lucide-react';
import clsx from 'clsx';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  type: 'email' | 'push' | 'in_app';
  enabled: boolean;
}

interface NotificationCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  settings: NotificationSetting[];
}

export const NotificationsPanel = () => {
  const [categories] = React.useState<NotificationCategory[]>([
    {
      id: 'general',
      name: 'General Notifications',
      icon: Bell,
      settings: [
        {
          id: 'system_updates',
          title: 'System Updates',
          description: 'Get notified about system updates and maintenance',
          type: 'push',
          enabled: true,
        },
        {
          id: 'security_alerts',
          title: 'Security Alerts',
          description: 'Receive alerts about security-related events',
          type: 'email',
          enabled: true,
        },
      ],
    },
    {
      id: 'tasks',
      name: 'Task Notifications',
      icon: Clock,
      settings: [
        {
          id: 'task_assigned',
          title: 'Task Assignments',
          description: 'When a task is assigned to you',
          type: 'in_app',
          enabled: true,
        },
        {
          id: 'task_due',
          title: 'Task Due Dates',
          description: 'Reminders for upcoming task deadlines',
          type: 'push',
          enabled: true,
        },
        {
          id: 'task_comments',
          title: 'Task Comments',
          description: 'When someone comments on your tasks',
          type: 'in_app',
          enabled: true,
        },
      ],
    },
    {
      id: 'messages',
      name: 'Message Notifications',
      icon: MessageSquare,
      settings: [
        {
          id: 'new_message',
          title: 'New Messages',
          description: 'When you receive a new message',
          type: 'push',
          enabled: true,
        },
        {
          id: 'message_mentions',
          title: 'Mentions',
          description: 'When someone mentions you in a message',
          type: 'push',
          enabled: true,
        },
      ],
    },
    {
      id: 'calendar',
      name: 'Calendar Notifications',
      icon: Calendar,
      settings: [
        {
          id: 'event_reminder',
          title: 'Event Reminders',
          description: 'Reminders for upcoming events',
          type: 'push',
          enabled: true,
        },
        {
          id: 'event_changes',
          title: 'Event Changes',
          description: 'When an event you\'re attending is modified',
          type: 'email',
          enabled: true,
        },
      ],
    },
    {
      id: 'alerts',
      name: 'System Alerts',
      icon: AlertTriangle,
      settings: [
        {
          id: 'error_alerts',
          title: 'Error Alerts',
          description: 'Critical system errors and issues',
          type: 'email',
          enabled: true,
        },
        {
          id: 'performance_alerts',
          title: 'Performance Alerts',
          description: 'System performance warnings',
          type: 'push',
          enabled: true,
        },
      ],
    },
  ]);

  const [settings, setSettings] = React.useState<Record<string, boolean>>(() => {
    const initialSettings: Record<string, boolean> = {};
    categories.forEach(category => {
      category.settings.forEach(setting => {
        initialSettings[setting.id] = setting.enabled;
      });
    });
    return initialSettings;
  });

  const handleToggle = (settingId: string) => {
    setSettings(prev => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };

  const getNotificationTypeIcon = (type: NotificationSetting['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'push':
        return <Bell className="h-4 w-4 text-purple-500" />;
      case 'in_app':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage how and when you want to be notified
        </p>
      </div>

      <div className="space-y-6">
        {categories.map(category => {
          const Icon = category.icon;
          
          return (
            <div key={category.id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {category.settings.map(setting => (
                  <div key={setting.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            {setting.title}
                          </span>
                          {getNotificationTypeIcon(setting.type)}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {setting.description}
                        </p>
                      </div>
                      <div className="ml-4">
                        <button
                          type="button"
                          onClick={() => handleToggle(setting.id)}
                          className={clsx(
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            settings[setting.id] ? 'bg-blue-600' : 'bg-gray-200'
                          )}
                        >
                          <span
                            className={clsx(
                              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                              settings[setting.id] ? 'translate-x-5' : 'translate-x-0'
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};