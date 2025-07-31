import React, { useState } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  CoursesSection, 
  Footer, 
  CourseModal 
} from './components';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="App bg-black min-h-screen">
      <Header />
      <HeroSection />
      <CoursesSection onCourseClick={handleCourseClick} />
      <Footer />
      <CourseModal 
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;