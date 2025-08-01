from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from typing import List, Optional
import os
import logging
from pathlib import Path

# Import our models and dependencies
from backend.models import (
    User, UserCreate, UserUpdate, UserLogin, Token,
    Course, CourseCreate, CourseUpdate,
    Enrollment, EnrollmentCreate,
    Certificate, CertificateCreate,
    StatusCheck, StatusCheckCreate
)
from backend.auth import (
    authenticate_user, create_access_token, get_current_user,
    get_current_admin_user, get_current_instructor_user,
    get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
)
from backend.database import db

# Load environment variables
ROOT_DIR = Path(__file__).parent
if (ROOT_DIR / '.env').exists():
    from dotenv import load_dotenv
    load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Skilio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Skilio API is running", "status": "healthy"}

# Authentication endpoints
@api_router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    """Register a new user"""
    # Check if user already exists
    existing_user = await db.get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    user_dict = user_data.dict()
    user_dict['password'] = get_password_hash(user_data.password)
    
    # Set default avatar if not provided
    if not user_dict.get('avatar'):
        user_dict['avatar'] = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    
    created_user = await db.create_user(user_dict)
    if not created_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": created_user["id"]}, expires_delta=access_token_expires
    )
    
    # Remove password from response
    user_response = User(**created_user)
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user_response
    )

@api_router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Login user"""
    user = await authenticate_user(user_credentials.email, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.id}, expires_delta=access_token_expires
    )
    
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=user
    )

# User endpoints
@api_router.get("/users/me", response_model=User)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

@api_router.put("/users/me", response_model=User)
async def update_current_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    update_data = user_update.dict(exclude_unset=True)
    if not update_data:
        return current_user
    
    updated_user = await db.update_user(current_user.id, update_data)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user"
        )
    
    return User(**updated_user)

# Course endpoints
@api_router.get("/courses", response_model=List[Course])
async def get_courses(
    limit: int = 100,
    offset: int = 0,
    category: Optional[str] = None,
    search: Optional[str] = None
):
    """Get all courses with optional filtering"""
    courses = await db.get_courses(limit=limit, offset=offset, category=category)
    
    # Apply search filter if provided
    if search:
        search_lower = search.lower()
        courses = [
            course for course in courses
            if search_lower in course['title'].lower() or 
               search_lower in course['description'].lower()
        ]
    
    return [Course(**course) for course in courses]

@api_router.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: str):
    """Get a specific course"""
    course = await db.get_course_by_id(course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return Course(**course)

@api_router.post("/courses", response_model=Course)
async def create_course(
    course_data: CourseCreate,
    current_user: User = Depends(get_current_instructor_user)
):
    """Create a new course (instructors and admins only)"""
    course_dict = course_data.dict()
    course_dict['instructor_id'] = current_user.id
    
    created_course = await db.create_course(course_dict)
    if not created_course:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create course"
        )
    
    # Get the course with instructor details
    course_with_details = await db.get_course_by_id(created_course['id'])
    return Course(**course_with_details)

@api_router.put("/courses/{course_id}", response_model=Course)
async def update_course(
    course_id: str,
    course_update: CourseUpdate,
    current_user: User = Depends(get_current_instructor_user)
):
    """Update a course (instructors and admins only)"""
    # Check if course exists and user has permission
    existing_course = await db.get_course_by_id(course_id)
    if not existing_course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if user is the instructor or admin
    if current_user.role != "admin" and existing_course['instructor_id'] != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this course"
        )
    
    update_data = course_update.dict(exclude_unset=True)
    if not update_data:
        return Course(**existing_course)
    
    updated_course = await db.update_course(course_id, update_data)
    if not updated_course:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update course"
        )
    
    # Get the course with instructor details
    course_with_details = await db.get_course_by_id(course_id)
    return Course(**course_with_details)

@api_router.delete("/courses/{course_id}")
async def delete_course(
    course_id: str,
    current_user: User = Depends(get_current_admin_user)
):
    """Delete a course (admins only)"""
    success = await db.delete_course(course_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    return {"message": "Course deleted successfully"}

# Enrollment endpoints
@api_router.post("/enrollments", response_model=Enrollment)
async def enroll_in_course(
    enrollment_data: EnrollmentCreate,
    current_user: User = Depends(get_current_user)
):
    """Enroll current user in a course"""
    # Check if course exists
    course = await db.get_course_by_id(enrollment_data.course_id)
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    # Check if already enrolled
    existing_enrollment = await db.get_enrollment(current_user.id, enrollment_data.course_id)
    if existing_enrollment:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Already enrolled in this course"
        )
    
    # Create enrollment
    enrollment_dict = enrollment_data.dict()
    enrollment_dict['user_id'] = current_user.id
    
    created_enrollment = await db.create_enrollment(enrollment_dict)
    if not created_enrollment:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create enrollment"
        )
    
    return Enrollment(**created_enrollment)

@api_router.get("/enrollments/me", response_model=List[dict])
async def get_my_enrollments(current_user: User = Depends(get_current_user)):
    """Get current user's enrollments"""
    enrollments = await db.get_user_enrollments(current_user.id)
    return enrollments

@api_router.put("/enrollments/{enrollment_id}/progress")
async def update_enrollment_progress(
    enrollment_id: str,
    progress: float,
    completed_lessons: int,
    current_user: User = Depends(get_current_user)
):
    """Update enrollment progress"""
    updated_enrollment = await db.update_enrollment_progress(
        enrollment_id, progress, completed_lessons
    )
    if not updated_enrollment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Enrollment not found"
        )
    
    return {"message": "Progress updated successfully"}

# Certificate endpoints
@api_router.get("/certificates", response_model=List[Certificate])
async def get_certificates(
    limit: int = 100,
    offset: int = 0,
    current_user: User = Depends(get_current_admin_user)
):
    """Get all certificates (admins only)"""
    certificates = await db.get_certificates(limit=limit, offset=offset)
    return [Certificate(**cert) for cert in certificates]

@api_router.get("/certificates/me", response_model=List[Certificate])
async def get_my_certificates(current_user: User = Depends(get_current_user)):
    """Get current user's certificates"""
    certificates = await db.get_user_certificates(current_user.id)
    return [Certificate(**cert) for cert in certificates]

@api_router.post("/certificates", response_model=Certificate)
async def create_certificate(
    certificate_data: CertificateCreate,
    current_user: User = Depends(get_current_instructor_user)
):
    """Create a new certificate (instructors and admins only)"""
    certificate_dict = certificate_data.dict()
    
    # Generate unique certificate ID
    import uuid
    certificate_dict['certificate_id'] = f"CERT-{datetime.now().year}-{str(uuid.uuid4())[:8].upper()}"
    
    created_certificate = await db.create_certificate(certificate_dict)
    if not created_certificate:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create certificate"
        )
    
    return Certificate(**created_certificate)

# Status check endpoints (keeping existing functionality)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input_data: StatusCheckCreate):
    """Create a status check"""
    status_dict = input_data.dict()
    created_status = await db.create_status_check(status_dict)
    return StatusCheck(**created_status)

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """Get all status checks"""
    status_checks = await db.get_status_checks()
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)