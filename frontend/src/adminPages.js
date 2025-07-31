import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Mock data for admin views
const adminData = {
  totalUsers: 12547,
  totalCourses: 89,
  totalInstructors: 23,
  monthlyRevenue: 45670,
  activeStudents: 8934,
  completionRate: 73,
  averageRating: 4.7,
  topCourses: [
    { id: 1, name: "ChatGPT Mastery", students: 2847, revenue: 12450, rating: 4.9 },
    { id: 2, name: "Finanzas Personales", students: 1543, revenue: 8750, rating: 4.8 },
    { id: 3, name: "YouTube Automation", students: 923, revenue: 6230, rating: 4.7 }
  ]
};

const instructorData = {
  totalStudents: 3456,
  totalCourses: 8,
  totalRevenue: 23450,
  averageRating: 4.8,
  monthlyViews: 15670,
  completionRate: 68,
  recentEnrollments: 34,
  activeCourses: [
    { id: 1, name: "Finanzas Personales", students: 1543, progress: 45, revenue: 8750 },
    { id: 2, name: "Inversión Inmobiliaria", students: 456, progress: 62, revenue: 3400 }
  ]
};

// Admin Dashboard Component
export const AdminDashboard = ({ user }) => {
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-400">Solo los administradores pueden acceder a esta sección</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-400">Gestiona toda la plataforma desde aquí</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-blue-100 text-sm font-medium">Total Usuarios</p>
                <p className="text-2xl font-bold text-white">{adminData.totalUsers.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-green-100 text-sm font-medium">Total Cursos</p>
                <p className="text-2xl font-bold text-white">{adminData.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-purple-100 text-sm font-medium">Instructores</p>
                <p className="text-2xl font-bold text-white">{adminData.totalInstructors}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-orange-100 text-sm font-medium">Ingresos Mensuales</p>
                <p className="text-2xl font-bold text-white">${adminData.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Courses */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Cursos Más Populares</h3>
            <div className="space-y-4">
              {adminData.topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{course.name}</h4>
                      <p className="text-gray-400 text-sm">{course.students} estudiantes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">${course.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-yellow-400 text-sm">
                      ★ {course.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Estadísticas Rápidas</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Estudiantes Activos</span>
                  <span className="text-white font-bold">{adminData.activeStudents.toLocaleString()}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Tasa de Finalización</span>
                  <span className="text-white font-bold">{adminData.completionRate}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${adminData.completionRate}%`}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Rating Promedio</span>
                  <span className="text-white font-bold">{adminData.averageRating}/5.0</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${(adminData.averageRating/5)*100}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/admin/courses"
            className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-colors group"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Gestionar Cursos</h3>
                <p className="text-blue-200 text-sm">CRUD completo de cursos</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/users"
            className="bg-green-600 hover:bg-green-700 rounded-xl p-6 transition-colors group"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Gestionar Usuarios</h3>
                <p className="text-green-200 text-sm">Estudiantes e instructores</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/analytics"
            className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 transition-colors group"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Analytics</h3>
                <p className="text-purple-200 text-sm">Métricas detalladas</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Instructor Dashboard Component
export const InstructorDashboard = ({ user }) => {
  if (!user || user.role !== 'instructor') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Acceso Denegado</h2>
          <p className="text-gray-400">Solo los instructores pueden acceder a esta sección</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel del Instructor</h1>
          <p className="text-gray-400">Gestiona tus cursos y estudiantes</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-blue-100 text-sm font-medium">Total Estudiantes</p>
                <p className="text-2xl font-bold text-white">{instructorData.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-green-100 text-sm font-medium">Mis Cursos</p>
                <p className="text-2xl font-bold text-white">{instructorData.totalCourses}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-orange-100 text-sm font-medium">Ingresos Totales</p>
                <p className="text-2xl font-bold text-white">${instructorData.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-yellow-100 text-sm font-medium">Rating Promedio</p>
                <p className="text-2xl font-bold text-white">{instructorData.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Mis Cursos Activos</h3>
              <Link 
                to="/instructor/courses/new"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Crear Curso
              </Link>
            </div>
            <div className="space-y-4">
              {instructorData.activeCourses.map((course) => (
                <div key={course.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-medium">{course.name}</h4>
                    <span className="text-green-400 font-bold">${course.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{course.students} estudiantes</span>
                    <span>Progreso promedio: {course.progress}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{width: `${course.progress}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Link 
                      to={`/instructor/courses/${course.id}/edit`}
                      className="text-orange-400 hover:text-orange-300 text-sm"
                    >
                      Editar curso →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Métricas del Mes</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Visualizaciones</span>
                  <span className="text-white font-bold">{instructorData.monthlyViews.toLocaleString()}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Nuevas Inscripciones</span>
                  <span className="text-white font-bold">{instructorData.recentEnrollments}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Tasa de Finalización</span>
                  <span className="text-white font-bold">{instructorData.completionRate}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${instructorData.completionRate}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/instructor/courses"
            className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 transition-colors"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Gestionar Cursos</h3>
                <p className="text-blue-200 text-sm">Crear y editar contenido</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/instructor/students"
            className="bg-green-600 hover:bg-green-700 rounded-xl p-6 transition-colors"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Mis Estudiantes</h3>
                <p className="text-green-200 text-sm">Ver progreso y métricas</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/instructor/analytics"
            className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 transition-colors"
          >
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div>
                <h3 className="text-white font-bold">Analytics</h3>
                <p className="text-purple-200 text-sm">Métricas detalladas</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Course Management Component (Admin/Instructor)
export const CourseManagement = ({ user }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Domina tus finanzas personales desde cero",
      instructor: "María González",
      category: "Inversiones",
      students: 1543,
      status: "Activo",
      createdAt: "2024-01-15",
      revenue: 8750
    },
    {
      id: 2,
      title: "Curso completo de ChatGPT desde cero",
      instructor: "Carlos Rodríguez",
      category: "Tecnología",
      students: 2847,
      status: "Activo",
      createdAt: "2024-02-20",
      revenue: 12450
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cursos</h1>
            <p className="text-gray-400">Administra todos los cursos de la plataforma</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Crear Nuevo Curso
          </button>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text"
              placeholder="Buscar cursos..."
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Todas las categorías</option>
              <option>Inversiones</option>
              <option>Tecnología</option>
              <option>Marketing</option>
            </select>
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Todos los estados</option>
              <option>Activo</option>
              <option>Borrador</option>
              <option>Pausado</option>
            </select>
            <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Todos los instructores</option>
              <option>María González</option>
              <option>Carlos Rodríguez</option>
            </select>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estudiantes
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Ingresos
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{course.title}</div>
                        <div className="text-gray-400 text-sm">{course.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {course.students.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-green-400 font-bold">
                      ${course.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          Editar
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Eliminar
                        </button>
                        <button className="text-gray-400 hover:text-gray-300">
                          Ver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Certificate System Component
export const CertificateSystem = ({ user }) => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      courseName: "Domina tus finanzas personales desde cero",
      studentName: "Juan Pérez",
      completedDate: "2024-03-15",
      certificateId: "CERT-2024-001543",
      instructor: "María González",
      grade: "A+",
      downloadUrl: "#"
    },
    {
      id: 2,
      courseName: "Curso completo de ChatGPT desde cero",
      studentName: "Ana Martínez",
      completedDate: "2024-03-20",
      certificateId: "CERT-2024-002847",
      instructor: "Carlos Rodríguez",
      grade: "A",
      downloadUrl: "#"
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <div className="min-h-screen bg-black py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Certificados</h1>
          <p className="text-gray-400">Gestiona y visualiza todos los certificados emitidos</p>
        </div>

        {/* Certificate Preview Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Certificate Design */}
              <div className="p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="border-8 border-blue-600 p-8">
                  <div className="text-blue-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM9 10a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm.01-5a1 1 0 000 2H9a1 1 0 001 1v.01a1 1 0 11-2 0V8a1 1 0 001-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">CERTIFICADO DE FINALIZACIÓN</h1>
                  <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                  
                  <p className="text-lg text-gray-600 mb-4">Se certifica que</p>
                  <h2 className="text-3xl font-bold text-blue-600 mb-6">{selectedCertificate.studentName}</h2>
                  
                  <p className="text-lg text-gray-600 mb-2">ha completado exitosamente el curso</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">{selectedCertificate.courseName}</h3>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-gray-600">Instructor</p>
                      <p className="font-semibold text-gray-800">{selectedCertificate.instructor}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fecha de Finalización</p>
                      <p className="font-semibold text-gray-800">{selectedCertificate.completedDate}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-gray-600">Calificación</p>
                      <p className="font-semibold text-green-600 text-xl">{selectedCertificate.grade}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ID del Certificado</p>
                      <p className="font-mono text-sm text-gray-800">{selectedCertificate.certificateId}</p>
                    </div>
                  </div>
                  
                  <div className="border-t-2 border-blue-600 pt-4 mt-8">
                    <p className="text-sm text-gray-600">Skilio - Plataforma de Educación Online</p>
                    <p className="text-xs text-gray-500">Este certificado puede ser verificado en skilio.com/verify</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 flex justify-between">
                <button 
                  onClick={() => setSelectedCertificate(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                  Cerrar
                </button>
                <div className="space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
                    Descargar PDF
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                    Enviar por Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certificates List */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Certificados Emitidos</h2>
              <div className="flex space-x-4">
                <input 
                  type="text"
                  placeholder="Buscar certificados..."
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
                  Generar Reporte
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Fecha de Finalización
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Calificación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ID Certificado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">
                      {cert.studentName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{cert.courseName}</div>
                      <div className="text-gray-400 text-sm">por {cert.instructor}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {cert.completedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {cert.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                      {cert.certificateId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedCertificate(cert)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Ver
                        </button>
                        <button className="text-green-400 hover:text-green-300">
                          Descargar
                        </button>
                        <button className="text-orange-400 hover:text-orange-300">
                          Reenviar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Certificate Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-blue-600 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <div>
                <p className="text-blue-100 text-sm">Total Certificados</p>
                <p className="text-2xl font-bold text-white">3,247</p>
              </div>
            </div>
          </div>

          <div className="bg-green-600 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <div>
                <p className="text-green-100 text-sm">Este Mes</p>
                <p className="text-2xl font-bold text-white">247</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-600 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <div>
                <p className="text-purple-100 text-sm">Calificación Media</p>
                <p className="text-2xl font-bold text-white">A-</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-600 rounded-xl p-6">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-orange-100 text-sm">Tiempo Promedio</p>
                <p className="text-2xl font-bold text-white">45 días</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};