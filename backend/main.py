from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles # Import StaticFiles
from pydantic import BaseModel, EmailStr, validator
from typing import List, Optional, Dict
from datetime import date, time, datetime, timedelta # Added timedelta
import os # For path joining

# --- Database Setup (Mock for now, replace with actual SQLite connection later) ---
# This section will be replaced by database interactions using models.py and database.py
# For MVP, using in-memory data that mimics database structure.

# Mock Data (Replace with actual database calls)
SERVICES_DB = [
    {"id": 1, "name": "Comprehensive Eye Examination", "description": "Full check-up including vision tests, glaucoma screening, and retina examination.", "detailed_description": "Our comprehensive eye examination is a thorough assessment of your vision and eye health. It includes a detailed patient history, visual acuity testing, refraction to determine your prescription, eye muscle coordination tests, peripheral vision screening, intraocular pressure measurement (for glaucoma), and a dilated fundus examination to check the health of your retina and optic nerve. Regular exams are crucial for early detection of eye diseases.", "icon_svg_content": "<svg>...</svg>", "image_url": "https://via.placeholder.com/800x400.png?text=Eye+Exam", "what_to_expect": ["Discussion of your medical history and vision concerns.", "Series of vision tests.", "Eye health evaluation, possibly with pupil dilation.", "Personalized advice and prescription if needed."], "benefits": ["Detects eye diseases early.", "Ensures accurate vision correction.", "Provides peace of mind about your eye health."]},
    {"id": 2, "name": "Cataract Surgery Consultation", "description": "Evaluation and consultation for cataract surgery, including IOL options.", "detailed_description": "If you suspect you have cataracts or have been diagnosed, this consultation provides a complete evaluation. We discuss your symptoms, perform specialized tests to assess the cataract's impact on your vision, and explain the surgical procedure in detail. We also cover various intraocular lens (IOL) options to best suit your lifestyle and visual needs post-surgery.", "icon_svg_content": "<svg>...</svg>", "image_url": "https://via.placeholder.com/800x400.png?text=Cataract+Consult", "what_to_expect": ["Detailed eye examination focusing on cataracts.", "Discussion of surgical options and IOLs.", "Pre-operative measurements and planning.", "Opportunity to ask all your questions."], "benefits": ["Clear understanding of your condition.", "Personalized treatment plan.", "Information on restoring clear vision."]},
    {"id": 3, "name": "Glaucoma Management", "description": "Diagnosis, treatment, and long-term management of glaucoma.", "detailed_description": "Glaucoma is a serious condition that can lead to irreversible blindness if not managed. Our glaucoma service includes advanced diagnostic tests like OCT scans and visual field testing. We offer medical, laser, and surgical treatments tailored to control intraocular pressure and preserve vision. Ongoing monitoring is key to managing glaucoma effectively.", "icon_svg_content": "<svg>...</svg>", "image_url": "https://via.placeholder.com/800x400.png?text=Glaucoma+Care", "what_to_expect": ["Comprehensive glaucoma testing.", "Personalized treatment plan (eye drops, laser, or surgery).", "Regular follow-up appointments to monitor progress."], "benefits": ["Early detection and intervention.", "Preservation of existing vision.", "Long-term management strategy."]},
    {"id": 4, "name": "Retina and Vitreous Services", "description": "Care for conditions like diabetic retinopathy and macular degeneration.", "detailed_description": "Our retina specialists manage a wide array of conditions affecting the back of the eye, including diabetic retinopathy, macular degeneration, retinal detachments, and uveitis. We utilize advanced imaging and offer treatments such as intravitreal injections, laser therapy, and vitreoretinal surgery.", "icon_svg_content": "<svg>...</svg>", "image_url": "https://via.placeholder.com/800x400.png?text=Retina+Services", "what_to_expect": ["Specialized retinal imaging (OCT, FFA).", "Thorough diagnosis and explanation of condition.", "Discussion of treatment options (injections, laser, surgery)."], "benefits": ["Expert care for complex retinal conditions.", "Access to advanced treatment modalities.", "Focus on preserving and improving vision."]}
]

DOCTORS_DB = [
    {"id": 1, "name": "Dr. Priya Sharma", "specialty": "Chief Ophthalmologist<br>Cataract & Refractive Surgeon", "bio": "Dr. Priya Sharma is a renowned ophthalmologist with over 15 years of experience specializing in advanced cataract surgery and laser vision correction. She is committed to providing patient-centered care and utilizing the latest surgical techniques.\n\nShe completed her medical degree from AIIMS, New Delhi, and pursued further specialization in ophthalmology. Dr. Sharma is an active member of several national and international ophthalmological societies and frequently presents at conferences.", "image_url": "https://via.placeholder.com/400x400.png?text=Dr.+Priya+Sharma", "areas_of_focus": ["Advanced Cataract Surgery", "LASIK & Refractive Surgery", "Corneal Diseases"], "clinic_hours": {"Mon": "10 AM - 1 PM", "Wed": "2 PM - 5 PM", "Fri": "10 AM - 1 PM"}, "achievements": ["Gold Medalist in MS Ophthalmology", "Published 20+ research papers", "Performed over 5000 successful cataract surgeries"]},
    {"id": 2, "name": "Dr. Arjun Verma", "specialty": "Glaucoma & Retina Specialist", "bio": "Dr. Arjun Verma is a distinguished specialist in the diagnosis and management of glaucoma and various retinal disorders, including diabetic retinopathy and macular degeneration. He believes in a proactive approach to preserve vision.\n\nDr. Verma earned his credentials from a top medical college in India and completed fellowships in Glaucoma and Vitreoretinal surgery. He is known for his meticulous approach and dedication to his patients.", "image_url": "https://via.placeholder.com/400x400.png?text=Dr.+Arjun+Verma", "areas_of_focus": ["Glaucoma Diagnosis & Management", "Diabetic Retinopathy", "Macular Degeneration", "Retinal Laser Therapy"], "clinic_hours": {"Tue": "9 AM - 12 PM", "Thu": "3 PM - 6 PM", "Sat": "9 AM - 12 PM"}, "achievements": ["Best Paper Award at National Retina Conclave", "Pioneer in minimally invasive glaucoma surgery techniques in the region"]},
    {"id": 3, "name": "Dr. Ananya Reddy", "specialty": "Pediatric Ophthalmologist<br>Squint Specialist", "bio": "Dr. Ananya Reddy focuses on eye care for children, addressing conditions such as refractive errors, amblyopia (lazy eye), and strabismus (squint). She has a gentle and patient-friendly approach, making children comfortable during examinations.\n\nShe is passionate about early intervention for pediatric eye conditions to ensure healthy visual development.", "image_url": "https://via.placeholder.com/400x400.png?text=Dr.+Ananya+Reddy", "areas_of_focus": ["Pediatric Eye Exams", "Amblyopia Treatment", "Strabismus Surgery", "Childhood Myopia Control"], "clinic_hours": {"Mon": "2 PM - 5 PM", "Wed": "9 AM - 12 PM", "Fri": "2 PM - 5 PM"}, "achievements": ["Community Service Award for Pediatric Eye Camps", "Authored chapters in pediatric ophthalmology textbooks"]}
]

# Mock Bookings (to simulate existing appointments for availability checks)
BOOKINGS_DB = [
    {"booking_id": 1, "doctor_id": 1, "appointment_date": "2024-09-15", "appointment_time": "10:00"},
    {"booking_id": 2, "doctor_id": 1, "appointment_date": "2024-09-15", "appointment_time": "11:00"},
    {"booking_id": 3, "doctor_id": 2, "appointment_date": "2024-09-16", "appointment_time": "14:30"},
]

CONTACT_SUBMISSIONS_DB = []

# --- Pydantic Models for Request/Response Validation ---
class Service(BaseModel):
    id: int
    name: str
    description: str
    detailed_description: Optional[str] = None
    icon_svg_content: Optional[str] = None
    image_url: Optional[str] = None
    what_to_expect: Optional[List[str]] = []
    benefits: Optional[List[str]] = []

class Doctor(BaseModel):
    id: int
    name: str
    specialty: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    areas_of_focus: Optional[List[str]] = []
    clinic_hours: Optional[Dict[str, str]] = {}
    achievements: Optional[List[str]] = []

class BookingBase(BaseModel):
    patient_name: str
    patient_phone: str
    patient_email: EmailStr
    service_id: Optional[int] = None
    doctor_id: Optional[int] = None
    appointment_date: date
    appointment_time: time # Using time type
    patient_symptoms: Optional[str] = None

    @validator('appointment_date')
    def date_must_be_in_future(cls, value):
        if value < date.today():
            raise ValueError('Appointment date must be in the future.')
        return value

class BookingCreate(BookingBase):
    pass

class BookingResponse(BookingBase):
    booking_id: int
    status: str = "Confirmed"

class ContactSubmission(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactSubmissionResponse(ContactSubmission):
    submission_id: int
    submitted_at: datetime

# AvailableSlotQuery model - not explicitly used in endpoint params but good for reference
class AvailableSlotQuery(BaseModel):
    query_date: date
    service_id: Optional[int] = None
    doctor_id: Optional[int] = None

# --- FastAPI App Initialization ---
app = FastAPI(
    title="NayanJyoti Eye Clinic API",
    description="API for managing clinic services, doctors, and appointments.",
    version="1.0.0"
)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:9000", "http://127.0.0.1:9000"], # Allow frontend dev server on port 9000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Endpoints ---

@app.get("/api/services", response_model=List[Service])
async def get_all_services():
    return SERVICES_DB

@app.get("/api/services/{service_id}", response_model=Service)
async def get_service_by_id(service_id: int):
    service = next((s for s in SERVICES_DB if s["id"] == service_id), None)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@app.get("/api/doctors", response_model=List[Doctor])
async def get_all_doctors():
    return DOCTORS_DB

@app.get("/api/doctors/{doctor_id}", response_model=Doctor)
async def get_doctor_by_id(doctor_id: int):
    doctor = next((d for d in DOCTORS_DB if d["id"] == doctor_id), None)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@app.get("/api/availability", response_model=List[str])
async def get_availability_slots(
    query_date: date,
    service_id: Optional[int] = Query(None),
    doctor_id: Optional[int] = Query(None)
):
    # Basic mock availability logic
    # In a real app, this would query the database and consider doctor schedules, holidays, etc.
    if query_date < date.today():
        return [] # No slots for past dates

    # Example: Generate slots from 9 AM to 5 PM, 30-min intervals
    available_slots = []
    start_hour = 9
    end_hour = 17 # 5 PM
    current_time_obj = datetime.strptime(f"{start_hour}:00", "%H:%M").time()
    end_time_obj = datetime.strptime(f"{end_hour}:00", "%H:%M").time()

    while current_time_obj < end_time_obj:
        slot_str = current_time_obj.strftime("%H:%M")
        is_booked = False
        for booking in BOOKINGS_DB:
            # Check if this slot on this date is booked (optionally for specific doctor)
            if booking["appointment_date"] == query_date.isoformat() and booking["appointment_time"] == slot_str:
                if doctor_id and booking["doctor_id"] == doctor_id:
                    is_booked = True
                    break
                elif not doctor_id: # General availability, if slot is booked by anyone
                    # This logic might need refinement for service-specific or general slots
                    is_booked = True 
                    break
        if not is_booked:
            available_slots.append(slot_str)
        
        # Increment current_time_obj by 30 minutes
        current_dt = datetime.combine(date.today(), current_time_obj)
        current_dt = current_dt + timedelta(minutes=30)
        current_time_obj = current_dt.time()

    return available_slots

@app.post("/api/bookings", response_model=BookingResponse, status_code=201)
async def create_booking(booking: BookingCreate):
    # Basic check for slot availability again (could be more robust)
    for existing_booking in BOOKINGS_DB:
        if (
            existing_booking["appointment_date"] == booking.appointment_date.isoformat() and
            existing_booking["appointment_time"] == booking.appointment_time.strftime("%H:%M") and
            (not booking.doctor_id or existing_booking["doctor_id"] == booking.doctor_id)
        ):
            raise HTTPException(status_code=400, detail="Time slot no longer available. Please select another time.")

    new_booking_id = max([b["booking_id"] for b in BOOKINGS_DB] + [0]) + 1
    new_booking_data = booking.dict()
    new_booking_data["booking_id"] = new_booking_id
    new_booking_data["appointment_date"] = booking.appointment_date.isoformat()
    new_booking_data["appointment_time"] = booking.appointment_time.strftime("%H:%M")
    BOOKINGS_DB.append(new_booking_data)
    response_data = {**new_booking_data, "status": "Confirmed"}
    # Ensure response matches BookingResponse model if time needs to be converted back
    # For this mock DB, we are storing time as string, so this is fine for now.
    # If BookingResponse expects `time` object, conversion would be needed.
    # BookingResponse inherits from BookingBase which has `appointment_time: time`
    # This means the returned `appointment_time` should be a `time` object.
    response_data["appointment_time"] = booking.appointment_time # Keep as time object for response
    return response_data

@app.post("/api/contact-submissions", response_model=ContactSubmissionResponse, status_code=201)
async def submit_contact_message(submission: ContactSubmission):
    new_submission_id = len(CONTACT_SUBMISSIONS_DB) + 1
    submission_data = submission.dict()
    submission_data["submission_id"] = new_submission_id
    submission_data["submitted_at"] = datetime.utcnow()
    CONTACT_SUBMISSIONS_DB.append(submission_data)
    return submission_data

# --- Static Files Mounting (for serving the React frontend) ---
# Get the directory of the current script (main.py)
backend_dir = os.path.dirname(os.path.abspath(__file__))
# Construct the path to the frontend's build directory
frontend_dist_path = os.path.join(backend_dir, "..", "frontend", "dist")

# Check if the directory exists before mounting
if os.path.exists(frontend_dist_path) and os.path.isdir(frontend_dist_path):
    app.mount("/", StaticFiles(directory=frontend_dist_path, html=True), name="static-frontend")
else:
    print(f"WARNING: Frontend build directory not found at {frontend_dist_path}. Static file serving will be disabled.")
    # Optionally, you could raise an error or have a fallback if serving frontend is critical
    # For development, API might still be useful standalone.

# --- Main entry point (for Uvicorn) ---
if __name__ == "__main__":
    import uvicorn
    # This is for local development. For production, use a process manager like Gunicorn with Uvicorn workers.
    uvicorn.run(app, host="0.0.0.0", port=9000) # Changed port to 9000
