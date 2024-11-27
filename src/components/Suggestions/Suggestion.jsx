import React, { useState, useEffect } from 'react';
import GeneralSuggestions from './GeneralSuggestions';
import PersonalizedSuggestions from './PersonalizedSuggestions';
import OfficerSuggestions from './OfficerSuggestions';

const Suggestions = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [filters, setFilters] = useState({
    category: 'all',
    priority: 'all',
    timeframe: 'all'
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  const filterOptions = {
    category: ['all', 'Carbon Emissions', 'Water Usage', 'Energy Efficiency', 'Waste Management'],
    priority: ['all', 'High', 'Medium', 'Low'],
    timeframe: ['all', 'Short-term', 'Medium-term', 'Long-term']
  };

  const filterIcons = {
    category: {
      'all': '🏷️',
      'Carbon Emissions': '🏭',
      'Water Usage': '💧',
      'Energy Efficiency': '⚡',
      'Waste Management': '♻️'
    },
    priority: {
      'all': '⭐',
      'High': '🔴',
      'Medium': '🟡',
      'Low': '🟢'
    },
    timeframe: {
      'all': '⏱️',
      'Short-term': '⚡',
      'Medium-term': '⏳',
      'Long-term': '📅'
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        setIsFilterExpanded(prev => !prev);
      }
      if (e.key === 'Escape' && isFilterExpanded) {
        setIsFilterExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFilterExpanded]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const tabs = [
    { id: 'general', label: 'General Suggestions', icon: '🌍' },
    { id: 'personalized', label: 'Personalized Suggestions', icon: '📊' },
    { id: 'officer', label: 'Officer Suggestions', icon: '👨‍💼' }
  ];

  const getFilterIcon = (type, value) => {
    return filterIcons[type]?.[value] || filterIcons[type]?.['all'];
  };

  return (
    <div className="p-6 rounded-lg shadow-md mt-8 ml-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Emission Reduction Pathways</h2>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Emission Level</p>
              <p className="text-2xl font-bold text-black">75%</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xl">📈</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Target Reduction</p>
              <p className="text-2xl font-bold text-black">25%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-black shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Implementation Progress</p>
              <p className="text-2xl font-bold text-black">60%</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs and Filter Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'bg-white text-black border border-black hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            title="Toggle Filters (Ctrl+F)"
          >
            <span className="text-xl">🔍</span>
            <span className="hidden md:inline">Filters</span>
          </button>

          {/* Filter Dropdown */}
          {isFilterExpanded && (
            <div className="absolute right-0 top-full mt-2 bg-gradient-to-r from-black to-gray-800 backdrop-blur-xl rounded-lg shadow-2xl border border-gray-700 p-4 min-w-[300px] z-50">
              <div className="flex flex-col space-y-4">
                {Object.entries(filterOptions).map(([type, options]) => (
                  <div key={type} className="group">
                    <div className="flex items-center space-x-2">
                      <span className="text-white text-lg transform transition-transform group-hover:scale-110 duration-200">
                        {filterIcons[type]['all']}
                      </span>
                      <select
                        className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200 pr-6 w-full"
                        value={filters[type]}
                        onChange={(e) => handleFilterChange(type, e.target.value)}
                        onFocus={() => setActiveFilter(type)}
                        onBlur={() => setActiveFilter(null)}
                        style={{ 
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right center',
                          backgroundSize: '16px'
                        }}
                      >
                        {options.map(option => (
                          <option key={option} value={option} className="bg-gray-900 text-white">
                            {option === 'all' ? `All ${type}s` : option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={`mt-1 h-px bg-gradient-to-r from-transparent ${
                      type === 'category' ? 'via-blue-400' :
                      type === 'priority' ? 'via-purple-400' :
                      'via-green-400'
                    } to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {Object.entries(filters).some(([_, value]) => value !== 'all') && (
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(filters).map(([type, value]) => value !== 'all' && (
            <span
              key={type}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              {getFilterIcon(type, value)}
              <span className="ml-2">{value}</span>
              <button
                onClick={() => handleFilterChange(type, 'all')}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="bg-white p-6 rounded-lg border border-black shadow-lg">
        {selectedTab === 'general' && <GeneralSuggestions filters={filters} />}
        {selectedTab === 'personalized' && <PersonalizedSuggestions data={data} filters={filters} />}
        {selectedTab === 'officer' && <OfficerSuggestions filters={filters} />}
      </div>
    </div>
  );
};

export default Suggestions;
