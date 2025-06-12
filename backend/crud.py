from sqlalchemy.orm import Session
from . import models, schemas # schemas will be in main.py or a separate schemas.py
from datetime import date, datetime, timedelta
import json

# Helper to convert model instance to dictionary, handling JSON strings
def model_to_dict(model_instance, pydantic_schema):
    obj_data = {}
    for column in model_instance.__table__.columns:
        value = getattr(model_instance, column.name)
        # Attempt to parse JSON strings for specific fields based on schema
        if column.name in pydantic_schema.model_fields and pydantic_schema.model_fields[column.name].annotation == list[str]:
            try:
                value = json.loads(value) if isinstance(value, str) else value
            except json.JSONDecodeError:
                value = [] # or handle error as appropriate
        elif column.name in pydantic_schema.model_fields and pydantic_schema.model_fields[column.name].annotation == dict:
             try:
                value = json.loads(value) if isinstance(value, str) else value
             except json.JSONDecodeError:
                value = {} # or handle error
        obj_data[column.name] = value
    return obj_data

# Services CRUD
def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()

def get_services(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Service).offset(skip).limit(limit).all()

def create_service(db: Session, service: schemas.ServiceCreate):
    db_service = models.Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

# Doctors CRUD
def get_doctor(db: Session, doctor_id: int):
    return db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()

def get_doctors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Doctor).offset(skip).limit(limit).all()

def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    # Handle JSON fields by converting dicts to JSON strings before saving
    doctor_data = doctor.model_dump()
    if isinstance(doctor_data.get('areas_of_focus'), list):
        doctor_data['areas_of_focus'] = json.dumps(doctor_data['areas_of_focus'])
    if isinstance(doctor_data.get('achievements'), list):
        doctor_data['achievements'] = json.dumps(doctor_data['achievements'])
    if isinstance(doctor_data.get('clinic_hours'), dict):
        doctor_data['clinic_hours'] = json.dumps(doctor_data['clinic_hours'])
    
    db_doctor = models.Doctor(**doctor_data)
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

# Bookings CRUD
def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.model_dump())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings_for_day(db: Session, appointment_date: date, doctor_id: int = None):
    query = db.query(models.Booking).filter(models.Booking.appointment_date == appointment_date)
    if doctor_id:
        query = query.filter(models.Booking.doctor_id == doctor_id)
    return query.all()

# Contact Messages CRUD
def create_contact_message(db: Session, contact_message: schemas.ContactMessageCreate):
    db_contact_message = models.ContactMessage(**contact_message.model_dump())
    db.add(db_contact_message)
    db.commit()
    db.refresh(db_contact_message)
    return db_contact_message

# Availability Logic (Example)
def get_available_slots_for_day(db: Session, day: date, service_id: int = None, doctor_id: int = None):
    # This is a simplified example. Real-world logic would be more complex,
    # considering doctor's specific schedules, holidays, buffer times, etc.
    
    # Define standard clinic operating hours and slot duration
    # For this example, let's assume 9 AM to 5 PM, 1-hour slots
    # These could come from doctor's specific schedule in a more advanced system
    all_possible_slots = []    
    start_hour = 9
    end_hour = 17 # 5 PM
    
    current_time = datetime(day.year, day.month, day.day, start_hour, 0)
    end_datetime = datetime(day.year, day.month, day.day, end_hour, 0)

    while current_time < end_datetime:
        all_possible_slots.append(current_time.strftime("%I:%M %p")) # e.g., "09:00 AM"
        current_time += timedelta(hours=1)

    booked_slots_query = db.query(models.Booking.appointment_time).filter(models.Booking.appointment_date == day)
    if doctor_id:
        booked_slots_query = booked_slots_query.filter(models.Booking.doctor_id == doctor_id)
    
    booked_slots_for_day = [booking.appointment_time for booking in booked_slots_query.all()]
    
    available_slots = [slot for slot in all_possible_slots if slot not in booked_slots_for_day]
    
    return available_slots
