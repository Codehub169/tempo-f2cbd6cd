from fastapi import FastAPI, Depends, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from datetime import date, datetime
import json

from . import crud, models, database # schemas are defined here for simplicity
from .database import SessionLocal, engine, get_db, create_db_and_tables

# Pydantic Schemas (moved from a separate schemas.py for this batch)
from pydantic import BaseModel, EmailStr

# Base and Create Schemas
class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    icon_svg_content: Optional[str] = None
    detailed_description: Optional[str] = None
    what_to_expect: Optional[str] = None
    benefits: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    class Config:
        from_attributes = True

class DoctorBase(BaseModel):
    name: str
    specialty: Optional[str] = None
    qualifications: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    areas_of_focus: Optional[List[str]] = [] # Stored as JSON string in DB, parsed to list here
    achievements: Optional[List[str]] = []   # Stored as JSON string in DB, parsed to list here
    clinic_hours: Optional[Dict[str, str]] = {} # Stored as JSON string in DB, parsed to dict here
    # bio_excerpt: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: int
    class Config:
        from_attributes = True

class BookingBase(BaseModel):
    patient_name: str
    patient_phone: str
    patient_email: Optional[EmailStr] = None
    patient_symptoms: Optional[str] = None
    service_id: Optional[int] = None
    doctor_id: Optional[int] = None
    appointment_date: date
    appointment_time: str # e.g., "10:00 AM"

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    id: int
    submitted_at: datetime
    class Config:
        from_attributes = True

class AvailableSlotQuery(BaseModel):
    date: date
    service_id: Optional[int] = None
    doctor_id: Optional[int] = None

# Create database tables on startup (if they don't exist)
# In a production environment, you would use Alembic for migrations.
create_db_and_tables()

app = FastAPI(title="NayanJyoti Eye Clinic API", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:9000", "http://127.0.0.1:9000"], # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Sample Data Seeding (for MVP demonstration) ---
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    try:
        # Check if services exist
        if db.query(models.Service).count() == 0:
            sample_services = [
                schemas.ServiceCreate(name="Comprehensive Eye Exams", description="Regular eye check-ups for maintaining good eye health.", image_url="https://via.placeholder.com/400x250.png?text=Comprehensive+Eye+Exam", icon_svg_content="<svg>...</svg>", detailed_description="Detailed exam process...", what_to_expect="Expect a series of tests...", benefits="Early detection, vision correction."),
                schemas.ServiceCreate(name="Cataract Surgery", description="Advanced, minimally invasive cataract surgery.", image_url="https://via.placeholder.com/400x250.png?text=Cataract+Surgery", detailed_description="Our cataract surgery uses...", what_to_expect="Pre-op, surgery, post-op...", benefits="Restored clear vision."),
                schemas.ServiceCreate(name="LASIK & Refractive Surgery", description="Achieve freedom from glasses and contact lenses.", image_url="https://via.placeholder.com/400x250.png?text=LASIK", detailed_description="State-of-the-art LASIK...", what_to_expect="Consultation, procedure, recovery...", benefits="Vision correction without glasses."),
                schemas.ServiceCreate(name="Glaucoma Treatment", description="Comprehensive management and treatment for glaucoma.", image_url="https://via.placeholder.com/400x250.png?text=Glaucoma+Treatment", detailed_description="Early diagnosis and treatment options for glaucoma.", what_to_expect="Regular monitoring, medication, or surgical options.", benefits="Preservation of sight by managing intraocular pressure."),
                schemas.ServiceCreate(name="Pediatric Ophthalmology", description="Specialized eye care for children.", image_url="https://via.placeholder.com/400x250.png?text=Pediatric+Ophthalmology", detailed_description="Addressing vision problems in infants and children.", what_to_expect="Child-friendly exams and treatments.", benefits="Ensuring healthy vision development in children.")
            ]
            for service_in in sample_services:
                crud.create_service(db=db, service=service_in)
        
        # Check if doctors exist
        if db.query(models.Doctor).count() == 0:
            sample_doctors = [
                schemas.DoctorCreate(name="Dr. Ananya Sharma", specialty="MBBS, MS (Ophthalmology)<br>Specialist in Cataract & Refractive Surgery", qualifications="MS Ophthalmology", bio="Dr. Sharma is a leading expert...", image_url="https://via.placeholder.com/400x250.png?text=Dr.+Ananya+Sharma", areas_of_focus=["Cataract Surgery", "LASIK"], achievements=["Gold Medalist in MS", "Published 20+ papers"], clinic_hours={"Mon-Fri": "10 AM - 6 PM", "Sat": "10 AM - 2 PM"}),
                schemas.DoctorCreate(name="Dr. Rohan Verma", specialty="MBBS, DNB (Ophthalmology)<br>Specialist in Glaucoma & Medical Retina", qualifications="DNB Ophthalmology", bio="Dr. Verma has extensive experience...", image_url="https://via.placeholder.com/400x250.png?text=Dr.+Rohan+Verma", areas_of_focus=["Glaucoma Management", "Retinal Diseases"], achievements=["Fellowship in Glaucoma", "Speaker at National Conferences"], clinic_hours={"Mon-Wed-Fri": "9 AM - 5 PM"}),
                schemas.DoctorCreate(name="Dr. Priya Singh", specialty="MBBS, DO, FICO<br>Pediatric Ophthalmology & Strabismus Specialist", qualifications="DO, FICO", bio="Dr. Singh is dedicated to child eye care...", image_url="https://via.placeholder.com/400x250.png?text=Dr.+Priya+Singh", areas_of_focus=["Pediatric Eye Exams", "Strabismus Surgery"], achievements=["Award for Excellence in Pediatric Care"], clinic_hours={"Tue-Thu-Sat": "11 AM - 7 PM"})
            ]
            for doctor_in in sample_doctors:
                crud.create_doctor(db=db, doctor=doctor_in)
        print("Sample data seeded.")
    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

# API Endpoints
@app.get("/api", tags=["Root"])
async def read_root():
    return {"message": "Welcome to NayanJyoti Eye Clinic API"}

# Services Endpoints
@app.get("/api/services", response_model=List[Service], tags=["Services"])
def read_services(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    services = crud.get_services(db, skip=skip, limit=limit)
    return [schemas.Service(**crud.model_to_dict(s, schemas.Service)) for s in services]

@app.get("/api/services/{service_id}", response_model=Service, tags=["Services"])
def read_service(service_id: int, db: Session = Depends(get_db)):
    db_service = crud.get_service(db, service_id=service_id)
    if db_service is None:
        raise HTTPException(status_code=404, detail="Service not found")
    return schemas.Service(**crud.model_to_dict(db_service, schemas.Service))

# Doctors Endpoints
@app.get("/api/doctors", response_model=List[Doctor], tags=["Doctors"])
def read_doctors(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    doctors = crud.get_doctors(db, skip=skip, limit=limit)
    # Manually parse JSON fields for response model if not automatically handled by Pydantic v2 from_attributes
    # This is now handled by model_to_dict and Pydantic schema
    return [schemas.Doctor(**crud.model_to_dict(doc, schemas.Doctor)) for doc in doctors]

@app.get("/api/doctors/{doctor_id}", response_model=Doctor, tags=["Doctors"])
def read_doctor(doctor_id: int, db: Session = Depends(get_db)):
    db_doctor = crud.get_doctor(db, doctor_id=doctor_id)
    if db_doctor is None:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return schemas.Doctor(**crud.model_to_dict(db_doctor, schemas.Doctor))

# Appointment & Availability Endpoints
@app.get("/api/availability", response_model=List[str], tags=["Appointments"])
def get_availability(query_date: date, service_id: Optional[int] = None, doctor_id: Optional[int] = None, db: Session = Depends(get_db)):
    # query = params.model_dump()
    available_slots = crud.get_available_slots_for_day(db, day=query_date, service_id=service_id, doctor_id=doctor_id)
    return available_slots

@app.post("/api/bookings", response_model=Booking, status_code=201, tags=["Appointments"])
def create_new_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    # Basic validation: Check if slot is still available (could be more robust)
    existing_bookings = crud.get_bookings_for_day(db, appointment_date=booking.appointment_date, doctor_id=booking.doctor_id)
    for existing_booking in existing_bookings:
        if existing_booking.appointment_time == booking.appointment_time:
            raise HTTPException(status_code=400, detail="Selected time slot is no longer available.")
    
    # Check if doctor and service exist if IDs are provided
    if booking.doctor_id and not crud.get_doctor(db, booking.doctor_id):
        raise HTTPException(status_code=404, detail=f"Doctor with id {booking.doctor_id} not found.")
    if booking.service_id and not crud.get_service(db, booking.service_id):
        raise HTTPException(status_code=404, detail=f"Service with id {booking.service_id} not found.")

    return crud.create_booking(db=db, booking=booking)

# Contact Form Endpoint
@app.post("/api/contact", response_model=ContactMessage, status_code=201, tags=["Contact"])
def submit_contact_form(message: ContactMessageCreate, db: Session = Depends(get_db)):
    return crud.create_contact_message(db=db, contact_message=message)

# To run the app (example, usually done via uvicorn command):
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
