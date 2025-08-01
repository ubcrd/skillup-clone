import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Header Component
export const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'admin': return '/admin/dashboard';
      case 'instructor': return '/instructor/dashboard';
      default: return '/dashboard';
    }
  };

  const getDashboardText = () => {
    if (!user) return 'Mi Dashboard';
    switch (user.role) {
      case 'admin': return 'Panel Admin';
      case 'instructor': return 'Panel Instructor';
      default: return 'Mi Dashboard';
    }
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
        {isAuthenticated ? (
          <>
            <Link to={getDashboardLink()} className="text-gray-300 hover:text-white transition-colors">
              {getDashboardText()}
            </Link>
            
            {/* Admin specific links */}
            {user.role === 'admin' && (
              <>
                <Link to="/admin/courses" className="text-gray-300 hover:text-white transition-colors">
                  Gestión Cursos
                </Link>
                <Link to="/admin/certificates" className="text-gray-300 hover:text-white transition-colors">
                  Certificados
                </Link>
              </>
            )}
            
            {/* Instructor specific links */}
            {user.role === 'instructor' && (
              <>
                <Link to="/instructor/courses" className="text-gray-300 hover:text-white transition-colors">
                  Mis Cursos
                </Link>
                <Link to="/instructor/certificates" className="text-gray-300 hover:text-white transition-colors">
                  Certificados
                </Link>
              </>
            )}
            
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
                {user.role && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' ? 'bg-red-600' : 
                    user.role === 'instructor' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {user.role}
                  </span>
                )}
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
                    to={getDashboardLink()} 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getDashboardText()}
                  </Link>
                  
                  {user.role === 'admin' && (
                    <>
                      <Link 
                        to="/admin/courses" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Gestión de Cursos
                      </Link>
                      <Link 
                        to="/admin/certificates" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sistema de Certificados
                      </Link>
                    </>
                  )}
                  
                  {user.role === 'instructor' && (
                    <>
                      <Link 
                        to="/instructor/courses" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Gestionar Mis Cursos
                      </Link>
                      <Link 
                        to="/instructor/certificates" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Mis Certificados
                      </Link>
                    </>
                  )}
                  
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
        
        <Link 
          to="/register"
          className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
        >
          Suscríbete
        </Link>
      </div>
    </div>
  );
};

// Course Card Component
export const CourseCard = ({ course }) => {
  return (
    <div 
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
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
export const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { coursesAPI } = await import('./services/api');
        const coursesData = await coursesAPI.getCourses({ limit: 8 });
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16">
            Explora nuestros cursos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-800 rounded mb-3"></div>
                  <div className="h-3 bg-gray-800 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded mb-6"></div>
                  <div className="h-10 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-4xl md:text-5xl font-bold text-center mb-16">
          Explora nuestros cursos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/cursos"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Ver todos los cursos
          </Link>
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
