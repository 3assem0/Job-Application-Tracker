import React from 'react';

const mockClients = [
  { id: 1, name: 'Tech Solutions', email: 'contact@techsolutions.com', projects: 2 },
  { id: 2, name: 'Innovate Labs', email: 'hello@innovatelabs.com', projects: 1 },
  { id: 3, name: 'Startup Ventures', email: 'info@startupventures.com', projects: 1 },
  { id: 4, name: 'Digital Growth', email: 'support@digitalgrowth.com', projects: 1 },
  { id: 5, name: 'Retail Express', email: 'sales@retailexpress.com', projects: 1 },
  { id: 6, name: 'Social Media Pro', email: 'team@socialmediapro.com', projects: 1 },
  { id: 7, name: 'App Creators', email: 'contact@appcreators.com', projects: 1 },
];

const ClientsPage = () => (
  <div className="p-4 md:p-6 max-w-4xl mx-auto">
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Clients</h2>
      <p className="text-gray-500 mb-6">Manage your clients and view their details.</p>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {mockClients.map(client => (
            <tr key={client.id}>
              <td className="px-4 py-2 font-medium text-gray-800">{client.name}</td>
              <td className="px-4 py-2 text-gray-600">{client.email}</td>
              <td className="px-4 py-2 text-gray-600">{client.projects}</td>
              <td className="px-4 py-2 text-right">
                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition">Add New Client</button>
      </div>
    </div>
  </div>
);

export default ClientsPage; 