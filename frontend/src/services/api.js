import { supabase } from '@/lib/supabase';

const normalizeCourse = (c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  category: c.category,
  duration: c.duration,
  image: c.image,
  gradient: c.gradient,
  icon: c.icon,
  videoUrl: c.video_url || '',
  lessons: c.lessons ?? 0,
  price: Number(c.price ?? 0),
  students: c.students ?? 0,
  rating: Number(c.rating ?? 0),
  instructor_name: c.instructor?.name ?? '',
  instructor_avatar: c.instructor?.avatar ?? '',
});

const getCurrentProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return data;
};

// Auth API
export const authAPI = {
  login: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const profile = await getCurrentProfile();
    return { access_token: data.session?.access_token, user: profile };
  },
  register: async ({ email, password, name }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    const userId = data.user?.id;
    if (userId) {
      await supabase.from('profiles').upsert({
        id: userId,
        name,
        email,
        role: 'student',
      });
    }
    const profile = await getCurrentProfile();
    return { access_token: data.session?.access_token, user: profile };
  },
  getCurrentUser: async () => getCurrentProfile(),
  updateProfile: async (updates) => {
    const profile = await getCurrentProfile();
    if (!profile) throw new Error('No authenticated user');
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
};

// Courses API
export const coursesAPI = {
  getCourses: async ({ limit = 100, offset = 0, category, search } = {}) => {
    let query = supabase
      .from('courses')
      .select('*, instructor:profiles!courses_instructor_id_fkey(name, avatar)')
      .range(offset, offset + limit - 1);
    if (category) query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    let items = data.map(normalizeCourse);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return items;
  },
  getCourse: async (courseId) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, instructor:profiles!courses_instructor_id_fkey(name, avatar)')
      .eq('id', courseId)
      .single();
    if (error) throw error;
    return normalizeCourse(data);
  },
  createCourse: async (courseData) => {
    const me = await getCurrentProfile();
    if (!me) throw new Error('Not authenticated');
    const payload = { ...courseData, instructor_id: me.id };
    const { data, error } = await supabase
      .from('courses')
      .insert(payload)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
  updateCourse: async (courseId, courseData) => {
    const { data, error } = await supabase
      .from('courses')
      .update(courseData)
      .eq('id', courseId)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
  deleteCourse: async (courseId) => {
    const { error } = await supabase.from('courses').delete().eq('id', courseId);
    if (error) throw error;
    return { success: true };
  },
};

// Enrollments API
export const enrollmentsAPI = {
  enrollInCourse: async (courseId) => {
    const me = await getCurrentProfile();
    if (!me) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('enrollments')
      .insert({ user_id: me.id, course_id: courseId })
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
  getMyEnrollments: async () => {
    const me = await getCurrentProfile();
    if (!me) return [];
    const { data, error } = await supabase
      .from('enrollments')
      .select('*, courses(*)')
      .eq('user_id', me.id);
    if (error) throw error;
    return data;
  },
  updateProgress: async (enrollmentId, progress, completedLessons) => {
    const update = { progress, completed_lessons: completedLessons };
    if (progress >= 100) update.completed_at = new Date().toISOString();
    const { data, error } = await supabase
      .from('enrollments')
      .update(update)
      .eq('id', enrollmentId)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
};

// Certificates API
export const certificatesAPI = {
  getCertificates: async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*, student:profiles!certificates_user_id_fkey(name), course:courses!certificates_course_id_fkey(title), instructor:profiles!certificates_instructor_id_fkey(name)');
    if (error) throw error;
    return data.map(c => ({
      ...c,
      student_name: c.student?.name,
      course_name: c.course?.title,
      instructor_name: c.instructor?.name,
    }));
  },
  getMyCertificates: async () => {
    const me = await getCurrentProfile();
    if (!me) return [];
    const { data, error } = await supabase
      .from('certificates')
      .select('*, course:courses!certificates_course_id_fkey(title), instructor:profiles!certificates_instructor_id_fkey(name)')
      .eq('user_id', me.id);
    if (error) throw error;
    return data.map(c => ({
      ...c,
      course_name: c.course?.title,
      instructor_name: c.instructor?.name,
    }));
  },
  createCertificate: async (certificateData) => {
    const { data, error } = await supabase
      .from('certificates')
      .insert(certificateData)
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
};

// Status API (keeping existing functionality)
export const statusAPI = {
  createStatusCheck: async (clientName) => {
    const { data, error } = await supabase
      .from('status_checks')
      .insert({ client_name: clientName })
      .select('*')
      .single();
    if (error) throw error;
    return data;
  },
  getStatusChecks: async () => {
    const { data, error } = await supabase.from('status_checks').select('*').limit(1000);
    if (error) throw error;
    return data;
  },
};