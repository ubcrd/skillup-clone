import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { CourseCard } from './components';

// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: "Domina tus finanzas personales desde cero",
    category: "Inversiones",
    duration: "3h 22min",
    description: "Aprende a tomar el control de tu dinero desde cero y de forma sencilla de forma definitiva.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
    gradient: "#10B981, #059669",
    icon: "💰",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lessons: 12,
    students: 1543,
    rating: 4.8,
    instructor: "María González",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5f5e7?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 2,
    title: "Curso completo de ChatGPT desde cero",
    category: "Tecnología",
    duration: "3h 45min",
    description: "Aprende a utilizar ChatGPT para resolver problemas, optimizar tareas y mejorar tu productividad.",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&w=400&q=80",
    gradient: "#06B6D4, #0891B2",
    icon: "🤖",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lessons: 15,
    students: 2847,
    rating: 4.9,
    instructor: "Carlos Rodríguez",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 3,
    title: "Crea un canal de YouTube sin hacer vídeos",
    category: "Marketing",
    duration: "2h 19min",
    description: "Aprende a crear un canal automatizado que genere ingresos sin la necesidad de grabar vídeos.",
    image: "https://images.unsplash.com/photo-1459184070881-58235578f004?auto=format&fit=crop&w=400&q=80",
    gradient: "#EF4444, #DC2626",
    icon: "▶️",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lessons: 8,
    students: 923,
    rating: 4.7,
    instructor: "Ana Martínez",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face"
  },
  {
    id: 4,
    title: "Cómo ganar dinero con el Arbitraje",
    category: "Inversiones",
    duration: "1h 02min",
    description: "Descubre una estrategia efectiva para operar con criptoactivos y registra tus operaciones paso a paso.",
    image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?auto=format&fit=crop&w=400&q=80",
    gradient: "#F59E0B, #D97706",
    icon: "₿",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    lessons: 6,
    students: 1256,
    rating: 4.6,
    instructor: "Luis Fernández",
    instructorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
  }
];

// Login Page
export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        enrolledCourses: [1, 2],
        completedLessons: 5
      };
      onLogin(userData);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Iniciar Sesión</h2>
          <p className="mt-2 text-gray-400">Accede a tu cuenta de Skilio</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-orange-500 hover:text-orange-400">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="font-medium text-orange-500 hover:text-orange-400">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Register Page
export const RegisterPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: 1,
        name: formData.name,
        email: formData.email,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        enrolledCourses: [],
        completedLessons: 0
      };
      onLogin(userData);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
          <p className="mt-2 text-gray-400">Únete a Skilio y empieza a aprender</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Nombre completo"
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contraseña"
              />
            </div>
            <div>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-700 rounded bg-gray-800"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              Acepto los{' '}
              <a href="#" className="text-orange-500 hover:text-orange-400">
                términos y condiciones
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="font-medium text-orange-500 hover:text-orange-400">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Course Page
export const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(true);

  useEffect(() => {
    // Find course by ID
    const foundCourse = coursesData.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando curso...</div>
      </div>
    );
  }

  const lessons = [
    "Introducción al curso",
    "Conceptos básicos",
    "Fundamentos teóricos",
    "Casos prácticos",
    "Herramientas necesarias",
    "Ejercicios prácticos",
    "Proyecto final",
    "Recursos adicionales"
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={course.videoUrl}
                  title={course.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold text-white mb-4">{course.title}</h1>
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.lessons} lecciones
                  </div>
                  <div className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    {course.students} estudiantes
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <img 
                    src={course.instructorAvatar} 
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-white font-medium">{course.instructor}</h3>
                    <p className="text-gray-400 text-sm">Instructor</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-gray-400">({course.rating})</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 sticky top-8">
              <h3 className="text-white text-xl font-bold mb-4">Contenido del curso</h3>
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentLesson === index 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                        currentLesson === index ? 'bg-white text-orange-500' : 'bg-gray-700 text-gray-400'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm">{lesson}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {!isEnrolled && (
                <button 
                  onClick={() => setIsEnrolled(true)}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Inscribirse al curso
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// All Courses Page
export const AllCoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Todos', 'Inversiones', 'Tecnología', 'Marketing', 'Ecommerce'];

  const filteredCourses = coursesData.filter(course => {
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todos los Cursos
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explora nuestra completa biblioteca de cursos y encuentra el perfecto para ti
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map(course => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <CourseCard course={course} />
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">🔍</div>
            <h3 className="text-white text-xl font-bold mb-2">No se encontraron cursos</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard Page
export const Dashboard = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Requerido</h2>
          <p className="text-gray-400 mb-6">Necesitas iniciar sesión para ver tu dashboard</p>
          <Link 
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const enrolledCourses = coursesData.filter(course => 
    user.enrolledCourses?.includes(course.id)
  );

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            ¡Bienvenido de vuelta, {user.name}!
          </h1>
          <p className="text-gray-400">Continúa con tu aprendizaje</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Cursos Inscritos</h3>
            <div className="text-3xl font-bold text-white">{user.enrolledCourses?.length || 0}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Lecciones Completadas</h3>
            <div className="text-3xl font-bold text-white">{user.completedLessons || 0}</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium mb-2">Progreso Total</h3>
            <div className="text-3xl font-bold text-white">65%</div>
          </div>
        </div>

        {/* Current Courses */}
        {enrolledCourses.length > 0 ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Mis Cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <Link key={course.id} to={`/course/${course.id}`}>
                  <div className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-white font-bold mb-2">{course.title}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm">{course.category}</span>
                        <span className="text-orange-400 text-sm">{course.duration}</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2 mb-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <p className="text-gray-400 text-sm">40% completado</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-6xl mb-4">📚</div>
            <h3 className="text-white text-xl font-bold mb-2">No tienes cursos inscritos</h3>
            <p className="text-gray-400 mb-6">Explora nuestro catálogo y comienza a aprender</p>
            <Link 
              to="/cursos"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Ver Cursos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Page
export const ProfilePage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Requerido</h2>
          <p className="text-gray-400 mb-6">Necesitas iniciar sesión para ver tu perfil</p>
          <Link 
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would update the user data
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 h-40"></div>
          
          <div className="relative px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-900 mb-4 sm:mb-0"
              />
              <div className="sm:ml-6 flex-1">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isEditing ? 'Cancelar' : 'Editar Perfil'}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm font-medium mb-2">
                      Biografía
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Cuéntanos un poco sobre ti..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Información Personal</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm">Email</label>
                      <p className="text-white">{user.email}</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm">Teléfono</label>
                      <p className="text-white">{user.phone || 'No especificado'}</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm">Biografía</label>
                      <p className="text-white">{user.bio || 'No hay biografía disponible'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">Estadísticas</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cursos inscritos</span>
                      <span className="text-white font-medium">{user.enrolledCourses?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lecciones completadas</span>
                      <span className="text-white font-medium">{user.completedLessons || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Miembro desde</span>
                      <span className="text-white font-medium">Enero 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};