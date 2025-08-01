/*
  # Create Skilio Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `password` (text, hashed)
      - `role` (text, enum: student, instructor, admin)
      - `avatar` (text, optional)
      - `bio` (text, optional)
      - `phone` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp, optional)
    
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `duration` (text)
      - `image` (text)
      - `gradient` (text)
      - `icon` (text)
      - `instructor_id` (uuid, foreign key to users)
      - `video_url` (text, optional)
      - `lessons` (integer, default 0)
      - `price` (decimal, default 0.0)
      - `students` (integer, default 0)
      - `rating` (decimal, default 0.0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp, optional)
    
    - `enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `course_id` (uuid, foreign key to courses)
      - `progress` (decimal, default 0.0)
      - `completed_lessons` (integer, default 0)
      - `enrolled_at` (timestamp)
      - `completed_at` (timestamp, optional)
    
    - `certificates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `course_id` (uuid, foreign key to courses)
      - `instructor_id` (uuid, foreign key to users)
      - `certificate_id` (text, unique)
      - `grade` (text)
      - `issued_at` (timestamp)
    
    - `status_checks` (keeping existing functionality)
      - `id` (uuid, primary key)
      - `client_name` (text)
      - `timestamp` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for instructors to manage their courses
    - Add policies for admins to manage all data
*/

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'instructor', 'admin');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  password text NOT NULL,
  role user_role DEFAULT 'student',
  avatar text,
  bio text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  duration text NOT NULL,
  image text NOT NULL,
  gradient text NOT NULL,
  icon text NOT NULL,
  instructor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  video_url text,
  lessons integer DEFAULT 0,
  price decimal DEFAULT 0.0,
  students integer DEFAULT 0,
  rating decimal DEFAULT 0.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  progress decimal DEFAULT 0.0,
  completed_lessons integer DEFAULT 0,
  enrolled_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  instructor_id uuid REFERENCES users(id) ON DELETE CASCADE,
  certificate_id text UNIQUE NOT NULL,
  grade text NOT NULL,
  issued_at timestamptz DEFAULT now()
);

-- Create status_checks table (keeping existing functionality)
CREATE TABLE IF NOT EXISTS status_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_checks ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Anyone can create users"
  ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Courses policies
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Instructors can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update own courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (
    instructor_id::text = auth.uid()::text OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete courses"
  ON courses
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Enrollments policies
CREATE POLICY "Users can read own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Users can create own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Users can update own enrollments"
  ON enrollments
  FOR UPDATE
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Instructors can read enrollments for their courses"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = enrollments.course_id 
      AND courses.instructor_id::text = auth.uid()::text
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Certificates policies
CREATE POLICY "Users can read own certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Instructors can create certificates"
  ON certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Admins can read all certificates"
  ON certificates
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Status checks policies (open for demo purposes)
CREATE POLICY "Anyone can manage status checks"
  ON status_checks
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO users (id, email, name, password, role, avatar) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'admin@skilio.com', 'Admin User', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', 'admin', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'),
  ('550e8400-e29b-41d4-a716-446655440002', 'instructor@skilio.com', 'María González', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', 'instructor', 'https://images.unsplash.com/photo-1494790108755-2616b9c5f5e7?w=50&h=50&fit=crop&crop=face'),
  ('550e8400-e29b-41d4-a716-446655440003', 'carlos@skilio.com', 'Carlos Rodríguez', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', 'instructor', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face'),
  ('550e8400-e29b-41d4-a716-446655440004', 'student@skilio.com', 'Juan Estudiante', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qK', 'student', 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=50&h=50&fit=crop&crop=face');

-- Insert sample courses
INSERT INTO courses (id, title, description, category, duration, image, gradient, icon, instructor_id, lessons, students, rating) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Domina tus finanzas personales desde cero', 'Aprende a tomar el control de tu dinero desde cero y de forma sencilla de forma definitiva.', 'Inversiones', '3h 22min', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80', '#10B981, #059669', '💰', '550e8400-e29b-41d4-a716-446655440002', 12, 1543, 4.8),
  ('650e8400-e29b-41d4-a716-446655440002', 'Curso completo de ChatGPT desde cero', 'Aprende a utilizar ChatGPT para resolver problemas, optimizar tareas y mejorar tu productividad.', 'Tecnología', '3h 45min', 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?auto=format&fit=crop&w=400&q=80', '#06B6D4, #0891B2', '🤖', '550e8400-e29b-41d4-a716-446655440003', 15, 2847, 4.9),
  ('650e8400-e29b-41d4-a716-446655440003', 'Crea un canal de YouTube sin hacer vídeos', 'Aprende a crear un canal automatizado que genere ingresos sin la necesidad de grabar vídeos.', 'Marketing', '2h 19min', 'https://images.unsplash.com/photo-1459184070881-58235578f004?auto=format&fit=crop&w=400&q=80', '#EF4444, #DC2626', '▶️', '550e8400-e29b-41d4-a716-446655440002', 8, 923, 4.7),
  ('650e8400-e29b-41d4-a716-446655440004', 'Cómo ganar dinero con el Arbitraje', 'Descubre una estrategia efectiva para operar con criptoactivos y registra tus operaciones paso a paso.', 'Inversiones', '1h 02min', 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?auto=format&fit=crop&w=400&q=80', '#F59E0B, #D97706', '₿', '550e8400-e29b-41d4-a716-446655440003', 6, 1256, 4.6);