import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockEarnings } from './mockData';

const MonthlyEarningsChart = () => (
  <div className="bg-white rounded-xl shadow-md p-5">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-800">Monthly Earnings</h3>
      <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">
        View Report
      </button>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={mockEarnings} barSize={30}>
        <defs>
          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip 
          contentStyle={{ 
            borderRadius: '8px', 
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
          formatter={(value) => [`$${value}`, 'Earnings']}
        />
        <Bar dataKey="earnings" fill="url(#colorEarnings)" name="Earnings" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyEarningsChart; 