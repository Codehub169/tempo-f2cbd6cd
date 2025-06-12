import axios from 'axios';

// The backend API will eventually be served from the same port (9000) under /api,
// after the frontend is built and served by the backend.
// For development, if backend runs on a different port (e.g. 8000), update this.
const API_BASE_URL = '/api'; // Relative URL for production
// const API_BASE_URL = 'http://localhost:8000/api'; // Example for local dev with separate backend server

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for handling errors (optional, but good practice)
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Log error or show user-friendly message
    console.error('API call error:', error.response || error.message || error);
    // Potentially re-throw error for component-level handling
    return Promise.reject(error);
  }
);

// Service related API calls
export const getServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    // console.error('Error fetching services:', error);
    // For now, return mock data if API fails or is not ready
    // This should be removed once backend is live
    return Promise.resolve([]); // Or throw error
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching service ${id}:`, error);
    return Promise.resolve(null); // Or throw error
  }
};

// Doctor related API calls
export const getDoctors = async () => {
  try {
    const response = await apiClient.get('/doctors');
    return response.data;
  } catch (error) {
    // console.error('Error fetching doctors:', error);
    return Promise.resolve([]);
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    // console.error(`Error fetching doctor ${id}:`, error);
    return Promise.resolve(null);
  }
};

// Appointment related API calls
export const getAvailableSlots = async (filters) => {
  // filters could be { serviceId, doctorId, date }
  try {
    const response = await apiClient.get('/appointments/slots', { params: filters });
    return response.data;
  } catch (error) {
    // console.error('Error fetching available slots:', error);
    return Promise.resolve([]);
  }
};

export const submitBooking = async (bookingData) => {
  try {
    const response = await apiClient.post('/appointments', bookingData);
    return response.data; // Should include confirmation details
  } catch (error) {
    // console.error('Error submitting booking:', error);
    // Rethrow to be handled by the calling component, e.g., show error message to user
    throw error; 
  }
};

// Contact form API call
export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data; // Should include success message
  } catch (error) {
    // console.error('Error submitting contact form:', error);
    throw error;
  }
};

export default apiClient;
