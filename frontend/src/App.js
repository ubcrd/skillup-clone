import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// Home Page Component
const HomePage = ({ onCourseClick }) => {
  return (
    <>
      <HeroSection />
      <CoursesSection onCourseClick={onCourseClick} />
    </>
  );
};

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App bg-black min-h-screen">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onCourseClick={handleCourseClick} />} 
          />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage onLogin={handleLogin} />} 
          />
          <Route 
            path="/course/:id" 
            element={<CoursePage />} 
          />
          <Route 
            path="/cursos" 
            element={<AllCoursesPage />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard user={user} />} 
          />
          <Route 
            path="/perfil" 
            element={<ProfilePage user={user} />} 
          />
        </Routes>
        <Footer />
        <CourseModal 
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </Router>
  );
}

export default App;