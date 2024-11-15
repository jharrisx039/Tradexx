import React from 'react';
import { useTaskStore } from '../store';
import { ProgressBar } from './ProgressBar';
import { CheckCircle2, Clock, AlertCircle, CreditCard, Wallet, PiggyBank } from 'lucide-react';

export const Dashboard = () => {
  const { tasks } = useTaskStore();

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    inProgress: tasks.filter(t => !t.completed && t.progress > 0).length,
    urgent: tasks.filter(t => t.priority === 'urgent' && !t.completed).length
  };

  const averageProgress = tasks.length > 0
    ? Math.round(tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your tasks and progress</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="mt-1 text-2xl font-semibold">${stats.total}</p>
            </div>
            <div className="p-3 bg-[#E8EDFF] rounded-full">
              <CreditCard className="w-6 h-6 text-[#2D3FE7]" />
            </div>
          </div>
        </div>

        <div className="bg-[#2D3FE7] text-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Completed</p>
              <p className="mt-1 text-2xl font-semibold">${stats.completed}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">In Progress</p>
              <p className="mt-1 text-2xl font-semibold">${stats.inProgress}</p>
            </div>
            <div className="p-3 bg-[#E8EDFF] rounded-full">
              <PiggyBank className="w-6 h-6 text-[#2D3FE7]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar 
                progress={averageProgress} 
                className="h-3 bg-[#E8EDFF]"
                barClassName="bg-[#2D3FE7]" 
              />
              <p className="mt-2 text-sm text-gray-600">{averageProgress}% of all tasks completed</p>
            </div>
            <div className="text-3xl font-semibold text-[#2D3FE7]">{averageProgress}%</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
          <div className="space-y-2">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F5F7FF]">
                <div className={`w-2 h-2 rounded-full ${
                  task.completed ? 'bg-green-500' : 
                  task.priority === 'urgent' ? 'bg-red-500' :
                  'bg-[#2D3FE7]'
                }`} />
                <span className="flex-1 text-gray-900">{task.title}</span>
                <span className="text-sm text-gray-500">{task.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};