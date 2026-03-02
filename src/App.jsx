import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Router, Routes } from 'react-router-dom';

function App() {
  const isAuthenticated = !! localStorage.getItem('loggedUser');
  return (
    <Router>
      <Routes>
        {/*Public routes */}
        <Route path ="/login"  element ={<login/>} />
        <Route path ="/register" element = {<register/>}/>

        {/*routes that need auth*/}
        <Route path="/"
        
        element = {isAuthenticated ?<Home/> :<Navigate to = "/login"/>}
        
        />
        <Route path= "/video/:id"
        
        element ={isAuthenticated ? <videoDetails/>: <Navigate to = "/login"/>}
        />

        {/*fallback*/}

        <Route  path="*" element ={<Navigate to= "/"/>}/>





      </Routes>
    </Router>
  )
}

export default App
