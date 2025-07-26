import React from 'react';

const SummaryCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-xl shadow-md p-5 transition-all hover:shadow-lg border-t-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full ${color.replace('border-t-', 'bg-')} bg-opacity-10 flex items-center justify-center`}>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  </div>
);

export default SummaryCard; 