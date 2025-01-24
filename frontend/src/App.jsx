import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './components/layout/AppContent';
import AppHeader from './components/layout/AppHeader';

const { Footer } = Layout;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token'); 
  };

  return (
    <Router>
      <Layout>
        <AppHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <AppContent />
        <Footer style={{ textAlign: 'center' }}>Тестовое 2025</Footer>
      </Layout>
    </Router>
  );
};

export default App;
