from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole = UserRole.STUDENT
    avatar: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    phone: Optional[str] = None
    avatar: Optional[str] = None

class User(UserBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class CourseBase(BaseModel):
    title: str
    description: str
    category: str
    duration: str
    image: str
    gradient: str
    icon: str
    instructor_id: str
    video_url: Optional[str] = None
    lessons: int = 0
    price: float = 0.0

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    duration: Optional[str] = None
    image: Optional[str] = None
    gradient: Optional[str] = None
    icon: Optional[str] = None
    video_url: Optional[str] = None
    lessons: Optional[int] = None
    price: Optional[float] = None

class Course(CourseBase):
    id: str
    instructor_name: str
    instructor_avatar: str
    students: int = 0
    rating: float = 0.0
    created_at: datetime
    updated_at: Optional[datetime] = None

class EnrollmentBase(BaseModel):
    user_id: str
    course_id: str
    progress: float = 0.0
    completed_lessons: int = 0

class EnrollmentCreate(EnrollmentBase):
    pass

class Enrollment(EnrollmentBase):
    id: str
    enrolled_at: datetime
    completed_at: Optional[datetime] = None

class CertificateBase(BaseModel):
    user_id: str
    course_id: str
    certificate_id: str
    grade: str
    instructor_id: str

class CertificateCreate(CertificateBase):
    pass

class Certificate(CertificateBase):
    id: str
    student_name: str
    course_name: str
    instructor_name: str
    issued_at: datetime

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str