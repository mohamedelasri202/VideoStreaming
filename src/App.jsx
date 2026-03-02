import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
// import VideoDetails from './pages/VideoDetails';

function App() {
  
  const isAuthenticated = !!localStorage.getItem('loggedUser');

  return (
    <Router>
      <Routes>
        {/* Public Routes - Note the Capital Letters! */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/video/:id" 
          element={isAuthenticated ? <VideoDetails /> : <Navigate to="/login" />} 
        />

        {/* Fallback - Redirects any unknown URL to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;