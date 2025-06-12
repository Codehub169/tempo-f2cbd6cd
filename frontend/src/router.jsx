import HomePage from './pages/HomePage';
// Import other pages here as they are created
// import AboutPage from './pages/AboutPage';
// import ServicesPage from './pages/ServicesPage';
// import ServiceDetailPage from './pages/ServiceDetailPage';
// import DoctorsPage from './pages/DoctorsPage';
// import DoctorDetailPage from './pages/DoctorDetailPage';
// import ContactPage from './pages/ContactPage';
// import AppointmentBookingPage from './pages/AppointmentBookingPage';
// import AppointmentConfirmationPage from './pages/AppointmentConfirmationPage';

const appRoutes = [
  { path: '/', element: HomePage, exact: true },
  // { path: '/about', element: AboutPage },
  // { path: '/services', element: ServicesPage },
  // { path: '/services/:serviceId', element: ServiceDetailPage }, // Example with params
  // { path: '/doctors', element: DoctorsPage },
  // { path: '/doctors/:doctorId', element: DoctorDetailPage }, // Example with params
  // { path: '/contact', element: ContactPage },
  // { path: '/book-appointment', element: AppointmentBookingPage },
  // { path: '/appointment-confirmed', element: AppointmentConfirmationPage },
];

export default appRoutes;
