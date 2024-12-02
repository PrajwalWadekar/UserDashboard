import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DataInput from './components/DataInput/DataInput.jsx';
import Visualization from './components/Visualise/Visualise.jsx';
import Suggestions from './components/Suggestions/Suggestion.jsx';
import MyProfile from './components/UserProfile/MyProfile';
import AccountSettings from './components/UserProfile/AccountSettings';
import ChartOne from './components/Visualise/ChartOne';
import ChartTwo from './components/Visualise/ChartTwo';
import ChartThree from './components/Visualise/ChartThree';
import ExportOptions from './components/Export/ExportOptions';
import CarbonSinks from './components/CarbonSinks/CarbonSinks';
import LandingPage from './components/Landing/LandingPage';
import Login from './components/Landing/Login';
import Register from './components/Landing/Register';

const App = () => {
  const [ownerData, setOwnerData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Coal Mine Road, Mining Town",
    coalMineName: "John's Coal Mine",
    about: "Riverstone Coal Mine is a leading coal mining operation located in India, established in 1985. With a focus on safety, sustainability, and innovation, we extract high-quality coal using advanced mining techniques. Our commitment to reducing environmental impact and supporting local communities is at the core of our operations through continuous investment in modern technologies."
  });

  const inputData = [
    { parameter: "Daily Production (tons)", value: 1500 },
    { parameter: "Employee Count", value: 200 },
    { parameter: "Safety Incidents", value: 2 },
    { parameter: "Operational Hours", value: 24 },
  ];
  
  const suggestions = [
    { parameter: "Emission Reduction", value: "Implement scrubbers to reduce emissions by 15%" },
    { parameter: "Water Usage Optimization", value: "Recycle 50% of water used in operations" },
    { parameter: "Safety Improvement", value: "Conduct bi-weekly safety drills" },
  ];

  // Use localStorage to persist authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // Update localStorage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const handleLogin = async (username, password) => {
    // Here you would typically make an API call to authenticate
    // For now, we'll just simulate a successful login
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        resolve();
      }, 500);
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleRegister = async (userData) => {
    // Here you would typically make an API call to register
    // For now, we'll just simulate a successful registration
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAuthenticated(true);
        resolve();
      }, 500);
    });
  };

  return (
    <Router>
      <Routes>
        {/* Landing and Auth Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register onRegister={handleRegister} />
            )
          } 
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-grow bg-white">
                  <Header 
                    ownerData={ownerData}
                    onLogout={handleLogout}
                  />
                  <main className="p-8 bg-white dark:bg-white flex-grow overflow-auto">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard/dataInput" />} />
                      <Route path="/dataInput" element={<DataInput />} />
                      <Route path="/carbonSinks" element={<CarbonSinks />} />
                      <Route path="/visualise" element={<Visualization />} />
                      <Route path="/suggestions" element={<Suggestions />} />
                      <Route path="/myProfile" element={<MyProfile ownerData={ownerData} />} />
                      <Route path="/accountSettings" element={<AccountSettings ownerData={ownerData} onSave={setOwnerData} />} />
                      <Route path="/chartOne" element={<ChartOne />} />
                      <Route path="/chartTwo" element={<ChartTwo />} />
                      <Route path="/chartThree" element={<ChartThree />} />
                      <Route path="/reports" element={
                        <div>
                          <h1 className="text-2xl font-bold mb-4">Reports</h1>
                          <ExportOptions
                            inputData={inputData}
                            suggestions={suggestions}
                          />
                        </div>
                      } />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
