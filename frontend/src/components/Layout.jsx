import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer'; // Import the actual Footer component

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-clinic-background text-clinic-text-primary">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <Footer /> {/* Use the actual Footer component */}
    </div>
  );
};

export default Layout;
