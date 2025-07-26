export const mockProjects = [
  { id: 1, name: 'Website Redesign', status: 'In Progress', deadline: '2023-08-15', category: 'Web Development', progress: 70, client: 'Tech Solutions' },
  { id: 2, name: 'Mobile App Concept', status: 'Pending', deadline: '2023-09-01', category: 'Mobile App', progress: 10, client: 'Innovate Labs' },
  { id: 3, name: 'Brand Identity Kit', status: 'Completed', deadline: '2023-07-20', category: 'Design', progress: 100, client: 'Startup Ventures' },
  { id: 4, name: 'SEO Strategy', status: 'In Progress', deadline: '2023-08-30', category: 'Marketing', progress: 45, client: 'Digital Growth' },
  { id: 5, name: 'E-commerce Platform', status: 'Backlog', deadline: '2023-10-10', category: 'Web Development', progress: 5, client: 'Retail Express' },
  { id: 6, name: 'Content Calendar', status: 'Completed', deadline: '2023-07-10', category: 'Marketing', progress: 100, client: 'Social Media Pro' },
  { id: 7, name: 'UI/UX Audit', status: 'In Progress', deadline: '2023-08-25', category: 'Design', progress: 60, client: 'App Creators' },
  { id: 8, name: 'API Integration', status: 'Pending', deadline: '2023-09-15', category: 'Web Development', progress: 20, client: 'Tech Solutions' },
];

export const mockActivities = [
  { id: 1, text: 'Completed "Brand Identity Kit" project', time: '2 mins ago', icon: '✅' },
  { id: 2, text: 'Received payment from TechSolutions', time: '1 hour ago', icon: '💰' },
  { id: 3, text: 'New task added for "Website Redesign"', time: '3 hours ago', icon: '📝' },
  { id: 4, text: 'Client feedback received for "SEO Strategy"', time: '5 hours ago', icon: '💬' },
  { id: 5, text: 'Started "Mobile App Concept" wireframes', time: 'Yesterday', icon: '✏️' },
];

export const mockEarnings = [
  { month: 'Jan', earnings: 4200 },
  { month: 'Feb', earnings: 3100 },
  { month: 'Mar', earnings: 2800 },
  { month: 'Apr', earnings: 3900 },
  { month: 'May', earnings: 5100 },
  { month: 'Jun', earnings: 4800 },
  { month: 'Jul', earnings: 5700 },
];

export const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export const getStatusColor = (status) => {
  switch (status) {
    case 'In Progress': return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-300' };
    case 'Completed': return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' };
    case 'Pending': return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' };
    case 'Backlog': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' };
    default: return { bg: 'bg-gray-200', text: 'text-gray-600', border: 'border-gray-400' };
  }
};
