import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await api.get('/api/auth/check');
        if (res.data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bento-bg text-spark-gold">Weryfikacja sesji...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login onLoginSuccess={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
