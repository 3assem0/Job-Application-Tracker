import React from 'react';
import SummaryCard from './SummaryCard';
import MonthlyEarningsChart from './MonthlyEarningsChart';
import TaskDistributionChart from './TaskDistributionChart';
import { mockProjects, getStatusColor } from './mockData';

const OverviewPage = ({ projects, activities }) => {
  const total = projects.length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const due = projects.filter(p => ['Pending', 'In Progress'].includes(p.status)).length;
  const backlog = projects.filter(p => p.status === 'Backlog').length;

  return (
    <div className="p-4 md:p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <SummaryCard 
          label="Total Projects" 
          value={total} 
          icon="📁" 
          color="border-t-indigo-500" 
        />
        <SummaryCard 
          label="Completed" 
          value={completed} 
          icon="✅" 
          color="border-t-emerald-500" 
        />
        <SummaryCard 
          label="In Progress" 
          value={due} 
          icon="🔄" 
          color="border-t-amber-500" 
        />
        <SummaryCard 
          label="Backlog" 
          value={backlog} 
          icon="📦" 
          color="border-t-gray-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyEarningsChart />
        <TaskDistributionChart projects={projects} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
              View All
            </button>
          </div>
          <ul className="space-y-4">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 flex-shrink-0">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-medium">{a.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Upcoming Deadlines</h3>
          <ul className="space-y-4">
            {mockProjects
              .filter(project => project.status !== 'Completed')
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
              .slice(0, 4)
              .map(project => {
                const statusColor = getStatusColor(project.status);
                return (
                  <li key={project.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <p className="text-gray-800 font-medium">{project.name}</p>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor.bg} ${statusColor.text}`}>
                        {project.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">Due: {project.deadline}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage; 