import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Plus, Briefcase, Calendar, FileText, Edit, Trash2, ArrowLeft, Download, Upload, Menu, X, Search, Filter, TrendingUp, Clock, CheckCircle, AlertCircle, Building, User, MapPin, DollarSign, Star, Eye, MoreVertical } from 'lucide-react';

// Job Application Context
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

const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, { 
    jobs: [
      // Sample data for demonstration
      {
        id: '1',
        companyName: 'Tech Corp',
        jobTitle: 'Frontend Developer',
        status: 'Applied',
        applicationDate: '2025-01-15',
        notes: 'Applied through their careers page. Initial screening call scheduled.',
        createdAt: '2025-01-15T10:00:00Z'
      },
      {
        id: '2',
        companyName: 'StartupXYZ',
        jobTitle: 'Full Stack Engineer',
        status: 'Interviewing',
        applicationDate: '2025-01-10',
        notes: 'Had first round interview. Technical challenge completed.',
        createdAt: '2025-01-10T14:30:00Z'
      },
      {
        id: '3',
        companyName: 'Big Company Inc',
        jobTitle: 'Software Engineer',
        status: 'Offer',
        applicationDate: '2025-01-05',
        notes: 'Received offer! Salary: $120K. Need to respond by Friday.',
        createdAt: '2025-01-05T09:15:00Z'
      },
      {
        id: '4',
        companyName: 'Innovation Labs',
        jobTitle: 'React Developer',
        status: 'Rejected',
        applicationDate: '2025-01-01',
        notes: 'Good interview process but they went with someone else.',
        createdAt: '2025-01-01T16:20:00Z'
      }
    ]
  });

  // In a real Vite app, you'd uncomment this for localStorage persistence
  // useEffect(() => {
  //   try {
  //     const savedJobs = JSON.parse(localStorage.getItem('jobApplications') || '[]');
  //     dispatch({ type: 'LOAD_JOBS', payload: savedJobs });
  //   } catch (error) {
  //     console.error('Error loading jobs:', error);
  //     dispatch({ type: 'LOAD_JOBS', payload: [] });
  //   }
  // }, []);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem('jobApplications', JSON.stringify(state.jobs));
  //   } catch (error) {
  //     console.error('Error saving jobs:', error);
  //   }
  // }, [state.jobs]);

  return (
    <JobContext.Provider value={{ state, dispatch }}>
      {children}
    </JobContext.Provider>
  );
};

const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

// Enhanced Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-4 left-20 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-20 w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center py-5">
          <button 
            onClick={() => handleNavigation('dashboard')}
            className="text-2xl font-bold flex items-center gap-3 hover:text-blue-200 transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-2 bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Briefcase className="h-7 w-7" />
            </div>
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              JobTracker Pro
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'dashboard' 
                  ? ' bg-opacity-20 text-white shadow-lg backdrop-blur-sm' 
                  : ' hover:bg-opacity-10 text-blue-100 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('add')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                currentPage === 'add' 
                  ? ' bg-opacity-20 text-white shadow-lg backdrop-blur-sm' 
                  : ' hover:bg-opacity-10 text-blue-100 hover:text-white'
              }`}
            >
              Add Job
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2  hover:bg-opacity-20 rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-2">
            <button 
              className="block w-full py-3 px-4 text-left  hover:bg-opacity-10 rounded-lg transition-all duration-300"
              onClick={() => handleNavigation('dashboard')}
            >
              Dashboard
            </button>
            <button 
              className="block w-full py-3 px-4 text-left  hover:bg-opacity-10 rounded-lg transition-all duration-300"
              onClick={() => handleNavigation('add')}
            >
              Add Job
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

// Enhanced Dashboard Component
const Dashboard = ({ setCurrentPage, setSelectedJobId }) => {
  const { state } = useJobs();
  const fileInputRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Applied': 
        return { 
          color: 'bg-blue-50 text-blue-700 border-blue-200', 
          icon: Clock, 
          bgGradient: 'from-blue-500 to-indigo-500',
          lightBg: 'bg-blue-50'
        };
      case 'Interviewing': 
        return { 
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200', 
          icon: User, 
          bgGradient: 'from-yellow-500 to-orange-500',
          lightBg: 'bg-yellow-50'
        };
      case 'Offer': 
        return { 
          color: 'bg-green-50 text-green-700 border-green-200', 
          icon: CheckCircle, 
          bgGradient: 'from-green-500 to-emerald-500',
          lightBg: 'bg-green-50'
        };
      case 'Rejected': 
        return { 
          color: 'bg-red-50 text-red-700 border-red-200', 
          icon: AlertCircle, 
          bgGradient: 'from-red-500 to-pink-500',
          lightBg: 'bg-red-50'
        };
      default: 
        return { 
          color: 'bg-gray-50 text-gray-700 border-gray-200', 
          icon: Clock, 
          bgGradient: 'from-gray-500 to-slate-500',
          lightBg: 'bg-gray-50'
        };
    }
  };

  const exportJobs = () => {
    const dataStr = JSON.stringify(state.jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importJobs = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedJobs = JSON.parse(e.target.result);
          if (Array.isArray(importedJobs)) {
            // In Vite app, you'd dispatch to update state and save to localStorage
            alert('Import feature would work with localStorage in a real Vite app!');
          } else {
            alert('Invalid file format. Please select a valid JSON file.');
          }
        } catch (error) {
          alert('Error reading file. Please select a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleJobClick = (jobId) => {
    setSelectedJobId(jobId);
    setCurrentPage('details');
  };

  // Filter and sort jobs
  const filteredJobs = state.jobs
    .filter(job => {
      const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.applicationDate) - new Date(a.applicationDate);
        case 'oldest':
          return new Date(a.applicationDate) - new Date(b.applicationDate);
        case 'company':
          return a.companyName.localeCompare(b.companyName);
        case 'title':
          return a.jobTitle.localeCompare(b.jobTitle);
        default:
          return 0;
      }
    });

  const statusCounts = state.jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Track your job applications and land your dream job
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportJobs}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            <button
              onClick={() => setCurrentPage('add')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add Job
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={importJobs}
            className="hidden"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Applications</h3>
                <p className="text-3xl font-bold text-gray-900">{state.jobs.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          {['Applied', 'Interviewing', 'Offer', 'Rejected'].map((status) => {
            const config = getStatusConfig(status);
            const IconComponent = config.icon;
            return (
              <div key={status} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{status}</h3>
                    <p className="text-3xl font-bold text-gray-900">{statusCounts[status] || 0}</p>
                  </div>
                  <div className={`p-3 bg-gradient-to-r ${config.bgGradient} rounded-xl`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by company or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white transition-all duration-300"
                >
                  <option value="All">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="company">Company A-Z</option>
                <option value="title">Job Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Applications List */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 mx-auto max-w-md border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {searchTerm || statusFilter !== 'All' ? 'No matching jobs found' : 'No job applications yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'All' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Start tracking your job applications by adding your first one.'}
              </p>
              {!searchTerm && statusFilter === 'All' && (
                <button
                  onClick={() => setCurrentPage('add')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Job
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => {
              const config = getStatusConfig(job.status);
              const IconComponent = config.icon;
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group transform hover:scale-[1.02]"
                >
                  <button
                    onClick={() => handleJobClick(job.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 ${config.lightBg} rounded-xl flex-shrink-0`}>
                            <Building className="h-6 w-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                              {job.jobTitle}
                            </h3>
                            <p className="text-gray-600 font-medium flex items-center gap-2 mb-2">
                              <Briefcase className="h-4 w-4" />
                              {job.companyName}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Applied: {new Date(job.applicationDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.color} font-medium`}>
                          <IconComponent className="h-4 w-4" />
                          {job.status}
                        </div>
                        <div className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300">
                          <Eye className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Add Job Component
const AddJob = ({ setCurrentPage }) => {
  const { dispatch } = useJobs();
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    status: 'Applied',
    applicationDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (formData.companyName && formData.jobTitle) {
      setIsLoading(true);
      
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newJob = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_JOB', payload: newJob });
      setIsLoading(false);
      setCurrentPage('dashboard');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="p-3 hover:bg-white hover:bg-opacity-80 rounded-xl transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Add New Application</h1>
            <p className="text-gray-600 mt-1">Fill in the details of your job application</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-3">
                  Company Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-3">
                  Job Title *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                    placeholder="Enter job title"
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                  Application Status *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-gray-800 appearance-none bg-white"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="applicationDate" className="block text-sm font-semibold text-gray-700 mb-3">
                  Application Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    id="applicationDate"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 text-gray-800"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-3">
                Notes
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-vertical text-gray-800"
                  placeholder="Add any notes about this application..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Application...
                  </span>
                ) : (
                  'Add Job Application'
                )}
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('dashboard')}
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Job Details Component
const JobDetails = ({ selectedJobId, setCurrentPage, setSelectedJobId }) => {
  const { state, dispatch } = useJobs();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const job = state.jobs.find(j => j.id === selectedJobId);

  useEffect(() => {
    if (job) {
      setEditFormData(job);
    }
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 mx-auto max-w-md border border-gray-100 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Job not found</h3>
          <p className="text-gray-500 mb-6">This job application may have been deleted or doesn't exist.</p>
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Applied': 
        return { 
          color: 'bg-blue-50 text-blue-700 border-blue-200', 
          icon: Clock, 
          bgGradient: 'from-blue-500 to-indigo-500',
          lightBg: 'bg-blue-50'
        };
      case 'Interviewing': 
        return { 
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200', 
          icon: User, 
          bgGradient: 'from-yellow-500 to-orange-500',
          lightBg: 'bg-yellow-50'
        };
      case 'Offer': 
        return { 
          color: 'bg-green-50 text-green-700 border-green-200', 
          icon: CheckCircle, 
          bgGradient: 'from-green-500 to-emerald-500',
          lightBg: 'bg-green-50'
        };
      case 'Rejected': 
        return { 
          color: 'bg-red-50 text-red-700 border-red-200', 
          icon: AlertCircle, 
          bgGradient: 'from-red-500 to-pink-500',
          lightBg: 'bg-red-50'
        };
      default: 
        return { 
          color: 'bg-gray-50 text-gray-700 border-gray-200', 
          icon: Clock, 
          bgGradient: 'from-gray-500 to-slate-500',
          lightBg: 'bg-gray-50'
        };
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job application? This action cannot be undone.')) {
      setIsLoading(true);
      
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'DELETE_JOB', payload: job.id });
      setCurrentPage('dashboard');
    }
  };

  const handleEditSubmit = async (e) => {
    if (e) e.preventDefault();
    if (editFormData.companyName && editFormData.jobTitle) {
      setIsLoading(true);
      
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'UPDATE_JOB', payload: editFormData });
      setIsEditing(false);
      setIsLoading(false);
    } else {
      alert('Please fill in all required fields (Company Name and Job Title)');
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const config = getStatusConfig(job.status);
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="p-3 hover:bg-white hover:bg-opacity-80 rounded-xl transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800">Job Details</h1>
            <p className="text-gray-600 mt-1">View and manage your job application</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {isEditing ? (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <Edit className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Edit Application</h2>
              </div>

              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="companyName"
                        value={editFormData.companyName || ''}
                        onChange={handleEditChange}
                        required
                        className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Job Title *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="jobTitle"
                        value={editFormData.jobTitle || ''}
                        onChange={handleEditChange}
                        required
                        className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Status *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <select
                        name="status"
                        value={editFormData.status || ''}
                        onChange={handleEditChange}
                        className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 appearance-none bg-white"
                      >
                        <option value="Applied">Applied</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Application Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="date"
                        name="applicationDate"
                        value={editFormData.applicationDate || ''}
                        onChange={handleEditChange}
                        required
                        className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Notes
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-4 text-gray-400 h-5 w-5" />
                    <textarea
                      name="notes"
                      value={editFormData.notes || ''}
                      onChange={handleEditChange}
                      rows={4}
                      className="w-full pl-11 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-vertical"
                      placeholder="Add any notes about this application..."
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleEditSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving Changes...
                      </span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditFormData(job);
                    }}
                    className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Section */}
              <div className={`bg-gradient-to-r ${config.bgGradient} p-8 text-white`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="p-4  bg-opacity-20 rounded-2xl backdrop-blur-sm">
                      <Building className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{job.jobTitle}</h2>
                      <p className="text-xl text-white text-opacity-90 flex items-center gap-2 mb-1">
                        <Briefcase className="h-5 w-5" />
                        {job.companyName}
                      </p>
                      <p className="text-white text-opacity-75 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Applied on {new Date(job.applicationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 bg-opacity-20 text-white px-6 py-3 rounded-xl hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-red-500 bg-opacity-90 text-white px-6 py-3 rounded-xl hover:bg-opacity-100 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        Application Status
                      </h3>
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border ${config.color} font-semibold text-lg`}>
                        <IconComponent className="h-5 w-5" />
                        {job.status}
                      </div>
                    </div>

                    {job.notes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Notes
                        </h3>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Details</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Created</p>
                          <p className="text-gray-800">
                            {new Date(job.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Application Date</p>
                          <p className="text-gray-800">
                            {new Date(job.applicationDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Days Since Applied</p>
                          <p className="text-gray-800">
                            {Math.floor((new Date() - new Date(job.applicationDate)) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedJobId, setSelectedJobId] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} setSelectedJobId={setSelectedJobId} />;
      case 'add':
        return <AddJob setCurrentPage={setCurrentPage} />;
      case 'details':
        return <JobDetails selectedJobId={selectedJobId} setCurrentPage={setCurrentPage} setSelectedJobId={setSelectedJobId} />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} setSelectedJobId={setSelectedJobId} />;
    }
  };

  return (
    <JobProvider>
      <div className="min-h-screen">
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main>
          {renderCurrentPage()}
        </main>
      </div>
    </JobProvider>
  );
};

export default App;