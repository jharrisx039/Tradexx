import React from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, FileText } from 'lucide-react';
import { Candidate } from '../../../store/hr';
import clsx from 'clsx';

interface CandidateListProps {
  candidates: Candidate[];
}

const statusColors = {
  new: 'bg-blue-50 text-blue-700',
  screening: 'bg-yellow-50 text-yellow-700',
  interview: 'bg-purple-50 text-purple-700',
  offer: 'bg-green-50 text-green-700',
  hired: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-red-50 text-red-700',
};

export const CandidateList: React.FC<CandidateListProps> = ({ candidates }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resume
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.name}
                      </div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    statusColors[candidate.status as keyof typeof statusColors]
                  )}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(candidate.createdAt), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {candidate.resume ? (
                    <a
                      href={candidate.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <FileText className="h-5 w-5" />
                    </a>
                  ) : (
                    <span className="text-gray-400">No resume</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};