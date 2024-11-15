import React from 'react';
import { Employee } from '../../../store/hr';
import { BarChart2, TrendingUp, Users } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';

interface PerformanceMetricsProps {
  employees: Employee[];
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ employees }) => {
  const metrics = React.useMemo(() => {
    const employeesWithReviews = employees.filter(emp => emp.performance.length > 0);
    const totalReviews = employeesWithReviews.reduce((acc, emp) => acc + emp.performance.length, 0);
    const averageRating = employeesWithReviews.reduce((acc, emp) => {
      const latestReview = emp.performance[emp.performance.length - 1];
      return acc + latestReview.rating;
    }, 0) / employeesWithReviews.length;

    return {
      totalEmployees: employees.length,
      reviewedEmployees: employeesWithReviews.length,
      totalReviews,
      averageRating: averageRating || 0,
      reviewCoverage: (employeesWithReviews.length / employees.length) * 100 || 0,
    };
  }, [employees]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.averageRating.toFixed(1)}/5</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <BarChart2 className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.averageRating * 20} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Review Coverage</p>
            <p className="mt-1 text-2xl font-semibold">{Math.round(metrics.reviewCoverage)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.reviewCoverage} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.totalReviews}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {metrics.reviewedEmployees} out of {metrics.totalEmployees} employees reviewed
        </p>
      </div>
    </>
  );
};