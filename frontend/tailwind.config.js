/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007BFF',       // Bright Blue
        'secondary': '#28A745',     // Success Green
        'accent': '#FFC107',        // Amber
        'neutral-dark': '#343A40',  // Dark Grey (Text)
        'neutral-medium': '#6C757D',// Medium Grey (Secondary Text/Icons)
        'neutral-light': '#E9ECEF', // Light Grey (Backgrounds/Borders)
        'neutral-extralight': '#F8F9FA', // Off-White (Backgrounds)
        'error': '#DC3545',         // Error Red
        // Custom palette from HTML preview (if preferred for direct match)
        'clinic-primary': '#007B8A',       // Teal
        'clinic-primary-dark': '#005F6B',
        'clinic-accent': '#F5A623',        // Orange
        'clinic-accent-dark': '#D88C0A',
        'clinic-text': '#333333',
        'clinic-text-light': '#555555',
        'clinic-bg-light': '#F4F7F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'clinic': '8px', // Matching HTML preview's border-radius
      },
      boxShadow: {
        'clinic-card': '0 4px 15px rgba(0, 0, 0, 0.1)', // Matching HTML preview
      }
    },
  },
  plugins: [],
}
