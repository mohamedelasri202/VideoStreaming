import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VideoDetails from './pages/VideoDetails';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile'

function App() {
  const isAuthenticated = !!localStorage.getItem('loggedUser');

  return (
    <Router>
      <div className="bg-black min-h-screen"> {/* Force black background everywhere */}
        {isAuthenticated && <Navbar />}
        
        {/* Wrap  pages in a div that adds space for the fixed Navbar */}
        <div className={isAuthenticated ? "pt-20" : ""}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
            <Route path="/video/:id" element={<ProtectedRoute><VideoDetails /></ProtectedRoute>} />
            <Route path ="/profile" element ={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;