import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import ProjectDetail from './pages/ProjectDetail';
import SellProject from './pages/SellProject';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import './App.css';
import HowItWorksScroll from './components/ui/How/HowItWorks';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
        
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <Home />
                    <HowItWorksScroll />
                    <Footer />
                  </>
                }
              />
              <Route path="/projects" element={<><Navbar /><AllProjects /></>} />
              <Route path="/project/:id" element={<><Navbar /><ProjectDetail /></>} />
              <Route path="/sell" element={<><Navbar /><SellProject /></>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/profile" element={<><Navbar /><Profile /></>} />
              <Route path="/cart" element={<><Navbar /><Cart /></>} />
              <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;