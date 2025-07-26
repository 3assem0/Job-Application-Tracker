import React, { createContext, useContext, useReducer } from 'react';

const JobContext = createContext();

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_JOBS':
      return { ...state, jobs: action.payload };
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => 
          job.id === action.payload.id ? action.payload : job
        )
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.payload)
      };
    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, { 
    jobs: [
      // Sample data for demonstration
      {
        id: '1',
        companyName: 'Tech Corp',
        jobTitle: 'Frontend Developer',
        status: 'Applied',
        applicationDate: '2024-01-15',
        notes: 'Applied through their careers page. Initial screening call scheduled.',
        createdAt: '2024-01-15T10:00:00Z'
      }
    ]
  });

  // In a real app, you'd handle localStorage here
  // useEffect(() => {
  //   const savedJobs = JSON.parse(localStorage.getItem('jobApplications') || '[]');
  //   dispatch({ type: 'LOAD_JOBS', payload: savedJobs });
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('jobApplications', JSON.stringify(state.jobs));
  // }, [state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};