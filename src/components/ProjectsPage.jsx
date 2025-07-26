import React, { useState } from 'react';
import { getStatusColor } from './mockData';

const ProjectsPage = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) || 
                         project.client.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const statusOptions = [
    { value: 'all', label: 'All Projects' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Backlog', label: 'Backlog' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Projects</h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Project
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredProjects.map(project => {
          const statusColor = getStatusColor(project.status);
          return (
            <div 
              key={project.id} 
              className="bg-white rounded-xl shadow-md p-5 space-y-4 border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor.bg} ${statusColor.text}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-800">{project.category}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium text-gray-800">{project.deadline}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-800">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View Details
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage; 