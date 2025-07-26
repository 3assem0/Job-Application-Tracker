import React, { useState } from 'react';

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    title: 'Senior Web Developer',
    bio: 'Freelance web developer with 5+ years of experience building modern web applications.',
    website: 'https://johndoe.dev'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
          <p className="text-gray-500 mt-1">Update your personal information and preferences</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-4xl text-indigo-600 font-bold">JD</span>
              </div>
              <button 
                type="button"
                className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
              >
                Change Avatar
              </button>
              <p className="text-xs text-gray-500 mt-3 text-center">JPG, GIF or PNG. Max size of 5MB</p>
            </div>
            
            <div className="md:w-2/3 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input 
                      type="url" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">Brief description for your profile.</p>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button 
              type="button"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 mr-3"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsPage; 