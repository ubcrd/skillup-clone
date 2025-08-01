import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { 
  Header, 
  HeroSection, 
  CoursesSection, 
  Footer, 
  CourseModal 
} from './components';
import {
  LoginPage,
  RegisterPage,
  CoursePage,
  AllCoursesPage,
  Dashboard,
  ProfilePage
} from './pages';
import {
  AdminDashboard,
  InstructorDashboard,
  CourseManagement,
  CertificateSystem
} from './adminPages';

// Home Page Component  
const HomePage = () => {
  return (
    <>
      <HeroSection />
      <CoursesSection />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-black min-h-screen">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/cursos" element={<AllCoursesPage />} />
            
            {/* Student Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<ProfilePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<CourseManagement />} />
            <Route path="/admin/certificates" element={<CertificateSystem />} />
            
            {/* Instructor Routes */}
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/courses" element={<CourseManagement />} />
            <Route path="/instructor/certificates" element={<CertificateSystem />} />
            
            {/* Certificate Routes */}
            <Route path="/certificates" element={<CertificateSystem />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;