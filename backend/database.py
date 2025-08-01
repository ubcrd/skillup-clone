import os
from supabase import create_client, Client
from typing import Optional, List, Dict, Any
import uuid
from datetime import datetime
import asyncio
from functools import wraps

# Initialize Supabase client
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_ANON_KEY')

if not supabase_url or not supabase_key:
    raise ValueError("SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables")

supabase: Client = create_client(supabase_url, supabase_key)

def async_supabase(func):
    """Decorator to handle async operations with Supabase"""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, func, *args, **kwargs)
    return wrapper

class Database:
    def __init__(self):
        self.supabase = supabase

    # User operations
    @async_supabase
    def create_user(self, user_data: dict) -> dict:
        """Create a new user"""
        user_data['id'] = str(uuid.uuid4())
        user_data['created_at'] = datetime.utcnow().isoformat()
        
        result = self.supabase.table('users').insert(user_data).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_user_by_email(self, email: str) -> Optional[dict]:
        """Get user by email"""
        result = self.supabase.table('users').select('*').eq('email', email).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_user_by_id(self, user_id: str) -> Optional[dict]:
        """Get user by ID"""
        result = self.supabase.table('users').select('*').eq('id', user_id).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def update_user(self, user_id: str, user_data: dict) -> Optional[dict]:
        """Update user"""
        user_data['updated_at'] = datetime.utcnow().isoformat()
        result = self.supabase.table('users').update(user_data).eq('id', user_id).execute()
        return result.data[0] if result.data else None

    # Course operations
    @async_supabase
    def create_course(self, course_data: dict) -> dict:
        """Create a new course"""
        course_data['id'] = str(uuid.uuid4())
        course_data['created_at'] = datetime.utcnow().isoformat()
        
        result = self.supabase.table('courses').insert(course_data).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_courses(self, limit: int = 100, offset: int = 0, category: Optional[str] = None) -> List[dict]:
        """Get all courses with optional filtering"""
        query = self.supabase.table('courses').select('''
            *,
            users!courses_instructor_id_fkey(name, avatar)
        ''').range(offset, offset + limit - 1)
        
        if category and category != 'Todos':
            query = query.eq('category', category)
            
        result = query.execute()
        
        # Transform the data to include instructor info
        courses = []
        for course in result.data:
            course_data = course.copy()
            if course.get('users'):
                course_data['instructor_name'] = course['users']['name']
                course_data['instructor_avatar'] = course['users']['avatar']
                del course_data['users']
            courses.append(course_data)
            
        return courses

    @async_supabase
    def get_course_by_id(self, course_id: str) -> Optional[dict]:
        """Get course by ID"""
        result = self.supabase.table('courses').select('''
            *,
            users!courses_instructor_id_fkey(name, avatar)
        ''').eq('id', course_id).execute()
        
        if result.data:
            course = result.data[0]
            if course.get('users'):
                course['instructor_name'] = course['users']['name']
                course['instructor_avatar'] = course['users']['avatar']
                del course['users']
            return course
        return None

    @async_supabase
    def update_course(self, course_id: str, course_data: dict) -> Optional[dict]:
        """Update course"""
        course_data['updated_at'] = datetime.utcnow().isoformat()
        result = self.supabase.table('courses').update(course_data).eq('id', course_id).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def delete_course(self, course_id: str) -> bool:
        """Delete course"""
        result = self.supabase.table('courses').delete().eq('id', course_id).execute()
        return len(result.data) > 0

    # Enrollment operations
    @async_supabase
    def create_enrollment(self, enrollment_data: dict) -> dict:
        """Create a new enrollment"""
        enrollment_data['id'] = str(uuid.uuid4())
        enrollment_data['enrolled_at'] = datetime.utcnow().isoformat()
        
        result = self.supabase.table('enrollments').insert(enrollment_data).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_user_enrollments(self, user_id: str) -> List[dict]:
        """Get user enrollments with course details"""
        result = self.supabase.table('enrollments').select('''
            *,
            courses(*)
        ''').eq('user_id', user_id).execute()
        
        return result.data

    @async_supabase
    def get_enrollment(self, user_id: str, course_id: str) -> Optional[dict]:
        """Get specific enrollment"""
        result = self.supabase.table('enrollments').select('*').eq('user_id', user_id).eq('course_id', course_id).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def update_enrollment_progress(self, enrollment_id: str, progress: float, completed_lessons: int) -> Optional[dict]:
        """Update enrollment progress"""
        update_data = {
            'progress': progress,
            'completed_lessons': completed_lessons
        }
        
        if progress >= 100:
            update_data['completed_at'] = datetime.utcnow().isoformat()
            
        result = self.supabase.table('enrollments').update(update_data).eq('id', enrollment_id).execute()
        return result.data[0] if result.data else None

    # Certificate operations
    @async_supabase
    def create_certificate(self, certificate_data: dict) -> dict:
        """Create a new certificate"""
        certificate_data['id'] = str(uuid.uuid4())
        certificate_data['issued_at'] = datetime.utcnow().isoformat()
        
        result = self.supabase.table('certificates').insert(certificate_data).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_certificates(self, limit: int = 100, offset: int = 0) -> List[dict]:
        """Get all certificates with user and course details"""
        result = self.supabase.table('certificates').select('''
            *,
            users!certificates_user_id_fkey(name),
            courses!certificates_course_id_fkey(title),
            instructors:users!certificates_instructor_id_fkey(name)
        ''').range(offset, offset + limit - 1).execute()
        
        # Transform the data
        certificates = []
        for cert in result.data:
            cert_data = cert.copy()
            if cert.get('users'):
                cert_data['student_name'] = cert['users']['name']
                del cert_data['users']
            if cert.get('courses'):
                cert_data['course_name'] = cert['courses']['title']
                del cert_data['courses']
            if cert.get('instructors'):
                cert_data['instructor_name'] = cert['instructors']['name']
                del cert_data['instructors']
            certificates.append(cert_data)
            
        return certificates

    @async_supabase
    def get_user_certificates(self, user_id: str) -> List[dict]:
        """Get certificates for a specific user"""
        result = self.supabase.table('certificates').select('''
            *,
            courses!certificates_course_id_fkey(title),
            instructors:users!certificates_instructor_id_fkey(name)
        ''').eq('user_id', user_id).execute()
        
        # Transform the data
        certificates = []
        for cert in result.data:
            cert_data = cert.copy()
            if cert.get('courses'):
                cert_data['course_name'] = cert['courses']['title']
                del cert_data['courses']
            if cert.get('instructors'):
                cert_data['instructor_name'] = cert['instructors']['name']
                del cert_data['instructors']
            certificates.append(cert_data)
            
        return certificates

    # Status check operations (keeping existing functionality)
    @async_supabase
    def create_status_check(self, status_data: dict) -> dict:
        """Create a new status check"""
        status_data['id'] = str(uuid.uuid4())
        status_data['timestamp'] = datetime.utcnow().isoformat()
        
        result = self.supabase.table('status_checks').insert(status_data).execute()
        return result.data[0] if result.data else None

    @async_supabase
    def get_status_checks(self, limit: int = 1000) -> List[dict]:
        """Get all status checks"""
        result = self.supabase.table('status_checks').select('*').limit(limit).execute()
        return result.data

# Global database instance
db = Database()