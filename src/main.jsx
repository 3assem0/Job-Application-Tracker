import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './App';
import OverviewPage from './components/OverviewPage';
import ProjectsPage from './components/ProjectsPage';
import ProfileSettingsPage from './components/ProfileSettingsPage';
import NotFound from './components/NotFound';
import ClientsPage from './components/ClientsPage';
import { mockProjects, mockActivities } from './components/mockData';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <OverviewPage projects={mockProjects} activities={mockActivities} />,
      },
      {
        path: 'projects',
        element: <ProjectsPage projects={mockProjects} />,
      },
      {
        path: 'clients',
        element: <ClientsPage />,
      },
      {
        path: 'profile',
        element: <ProfileSettingsPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
