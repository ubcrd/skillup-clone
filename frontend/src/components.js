import React, { useState } from 'react';

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Header Component
export const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center relative z-50">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold flex items-center hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <div className="text-white text-xs">❄</div>
            </div>
          </div>
          Skilio
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/cursos" className="text-gray-300 hover:text-white transition-colors">
          Todos los cursos
        </Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              Mi Dashboard
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <img 
                  src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"} 
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.name}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                  <Link 
                    to="/perfil" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mi Perfil
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Suscríbirse
            </Link>
          </>
        )}
      </nav>
      
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b9c5f5e7?w=50&h=50&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=50&h=50&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face"
  ];

  return (
    <div 
      className="bg-black text-white min-h-screen flex flex-col justify-center items-center px-6 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center max-w-4xl">
        <div className="bg-gray-800 bg-opacity-80 text-gray-300 px-4 py-2 rounded-full text-sm inline-block mb-8">
          SUSCRÍBETE 100% GRATIS
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Aprende, crece y<br />
          <span className="text-orange-500">monetiza tus habilidades</span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Tenemos más de 50 cursos en nuestra web, impartidos por los principales 
          referentes del sector online.
        </p>
        
        <div className="flex items-center justify-center mb-8 space-x-4">
          <div className="flex -space-x-2">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Usuario ${index + 1}`}
                className="w-12 h-12 rounded-full border-2 border-gray-800"
              />
            ))}
          </div>
          <div className="flex text-yellow-400 text-xl">
            ★★★★★
          </div>
        </div>
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
          Suscríbete
        </button>
      </div>
    </div>
  );
};

// Course Card Component
export const CourseCard = ({ course, onClick }) => {
  return (
    <div 
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick && onClick(course)}
    >
      <div 
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.gradient})`,
        }}
      >
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-4xl opacity-90">
            {course.icon}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-3 leading-tight">
          {course.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm">{course.category}</span>
          <div className="flex items-center text-orange-400 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {course.duration}
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {course.description}
        </p>
        
        <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors duration-300">
          Acceder al curso
        </button>
      </div>
    </div>
  );
};

// Courses Section
export const CoursesSection = ({ onCourseClick }) => {
  const courses = [
    {
      id: 1,
      title: "Domina tus finanzas personales desde cero",
      category: "Inversiones",
      duration: "3h 22min",
      description: "Aprende a tomar el control de tu dinero desde cero y de forma sencilla de forma definitiva.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
      gradient: "#10B981, #059669",
      icon: "💰"
    },
    {
      id: 2,
      title: "Curso completo de ChatGPT desde cero",
      category: "Tecnología",
      duration: "3h 45min",
      description: "Aprende a utilizar ChatGPT para resolver problemas, optimizar tareas y mejorar tu productividad.",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&w=400&q=80",
      gradient: "#06B6D4, #0891B2",
      icon: "🤖"
    },
    {
      id: 3,
      title: "Crea un canal de YouTube sin hacer vídeos",
      category: "Marketing",
      duration: "2h 19min",
      description: "Aprende a crear un canal automatizado que genere ingresos sin la necesidad de grabar vídeos.",
      image: "https://images.unsplash.com/photo-1459184070881-58235578f004?auto=format&fit=crop&w=400&q=80",
      gradient: "#EF4444, #DC2626",
      icon: "▶️"
    },
    {
      id: 4,
      title: "Cómo ganar dinero con el Arbitraje",
      category: "Inversiones",
      duration: "1h 02min",
      description: "Descubre una estrategia efectiva para operar con criptoactivos y registra tus operaciones paso a paso.",
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?auto=format&fit=crop&w=400&q=80",
      gradient: "#F59E0B, #D97706",
      icon: "₿"
    },
    {
      id: 5,
      title: "Curso básico sobre Trading en Forex desde cero",
      category: "Inversiones",
      duration: "1h 06min",
      description: "Aprende las bases del trading de forex y domina una estrategia rentable paso a paso.",
      image: "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?auto=format&fit=crop&w=400&q=80",
      gradient: "#06B6D4, #0284C7",
      icon: "📊"
    },
    {
      id: 6,
      title: "Curso de arbitraje en Amazon FBA desde cero",
      category: "Ecommerce",
      duration: "4h 27min",
      description: "Aprende a ganar dinero con Amazon FBA dominando el arbitraje paso a paso desde cero.",
      image: "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?auto=format&fit=crop&w=400&q=80",
      gradient: "#F59E0B, #D97706",
      icon: "📦"
    },
    {
      id: 7,
      title: "Curso de inversión inmobiliaria",
      category: "Inversiones",
      duration: "2h 21min",
      description: "Aprende a realizar tu primera inversión inmobiliaria con poco dinero paso a paso.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80",
      gradient: "#8B5CF6, #7C3AED",
      icon: "🏠"
    },
    {
      id: 8,
      title: "Fundamentos sobre Criptomonedas",
      category: "Inversiones",
      duration: "4h 13min",
      description: "Aprende los fundamentos de invertir en criptomonedas y cómo generar ingreso con ellas de forma segura.",
      image: "https://images.unsplash.com/photo-1639754390580-2e7437267698?auto=format&fit=crop&w=400&q=80",
      gradient: "#10B981, #059669",
      icon: "🚀"
    }
  ];

  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16">
          Explora nuestros cursos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onClick={onCourseClick} />
          ))}
        </div>
        
        <div className="text-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Ver todos los cursos
          </button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 border-t border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="text-2xl font-bold flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <div className="text-white text-xs">❄</div>
              </div>
            </div>
            Skilio
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center space-x-8 mb-8 text-gray-400">
          <a href="#" className="hover:text-white transition-colors">
            Términos y condiciones
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Aviso Legal
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Política de Cookies
          </a>
        </div>
        
        <p className="text-gray-400 text-sm">
          Skilio © 2025 - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

// Modal Component for Course Details
export const CourseModal = ({ course, isOpen, onClose }) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="p-8">
          <h2 className="text-white text-2xl font-bold mb-4">{course.title}</h2>
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>
            <span className="text-gray-400 text-sm">⏱ {course.duration}</span>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            {course.description}
          </p>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-white text-lg font-semibold">Lo que aprenderás:</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Conceptos fundamentales desde cero
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Estrategias prácticas aplicables
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Casos de estudio reales
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✓</span>
                Herramientas y recursos adicionales
              </li>
            </ul>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Comenzar curso
          </button>
        </div>
      </div>
    </div>
  );
};