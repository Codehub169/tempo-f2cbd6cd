from sqlalchemy import Column, Integer, String, Text, Date, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import json # For JSON fields if needed, though Text can also store JSON strings

Base = declarative_base()

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=True) # Short description for cards
    image_url = Column(String, nullable=True)
    icon_svg_content = Column(Text, nullable=True) # Store SVG content as text
    detailed_description = Column(Text, nullable=True)
    what_to_expect = Column(Text, nullable=True)
    benefits = Column(Text, nullable=True)

    # Relationship (if services are booked)
    # bookings = relationship("Booking", back_populates="service")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    specialty = Column(String, nullable=True) # e.g., "MBBS, MS (Ophthalmology)<br>Specialist in Cataract & Refractive Surgery"
    qualifications = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    areas_of_focus = Column(Text, nullable=True) # Could be JSON string: '["Cataract", "Glaucoma"]'
    achievements = Column(Text, nullable=True) # Could be JSON string: '["Award 1", "Publication 2"]'
    clinic_hours = Column(Text, nullable=True) # Could be JSON string: '{"Mon-Fri": "9am-5pm", "Sat": "10am-2pm"}'
    # bio_excerpt = Column(Text, nullable=True) # If needed separately from full bio

    # Relationship
    # bookings = relationship("Booking", back_populates="doctor")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, nullable=False)
    patient_phone = Column(String, nullable=False)
    patient_email = Column(String, nullable=True)
    patient_symptoms = Column(Text, nullable=True)
    
    service_id = Column(Integer, ForeignKey("services.id"), nullable=True) # Can be optional if booking directly with doctor
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=True) # Can be optional if booking for general service
    
    appointment_date = Column(Date, nullable=False)
    appointment_time = Column(String, nullable=False) # e.g., "10:00 AM"
    
    status = Column(String, default="confirmed") # e.g., confirmed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships (optional, if you want to access Service/Doctor objects from Booking)
    # service = relationship("Service", back_populates="bookings")
    # doctor = relationship("Doctor", back_populates="bookings")

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    submitted_at = Column(DateTime, default=datetime.utcnow)
