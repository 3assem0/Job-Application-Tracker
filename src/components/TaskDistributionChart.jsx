import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { COLORS } from './mockData';

const TaskDistributionChart = ({ projects }) => {
  const statusCount = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});
  
  const data = Object.keys(statusCount).map(status => ({
    name: status,
    value: statusCount[status]
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Task Distribution</h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} projects`, 'Count']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskDistributionChart; 