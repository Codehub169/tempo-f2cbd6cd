#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Frontend Build ---
echo "Building frontend..."
cd frontend

# Install dependencies (if not already installed or if package-lock.json changed)
# npm ci # Use 'ci' for faster, more reliable builds in CI environments
npm install # or npm install if you prefer flexibility

# Run the build process
npm run build
echo "Frontend build complete. Output in frontend/dist/"
cd ..

# --- Backend Setup (Virtual Environment & Dependencies) ---
echo "Setting up backend..."
cd backend

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
  echo "Virtual environment created."
fi

# Activate virtual environment
source venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt
echo "Backend dependencies installed."

# --- Start Backend Server ---
# The backend/main.py is now configured to serve static files from ../frontend/dist
# So, we only need to start the FastAPI server.

echo "Starting FastAPI server on http://localhost:9000"
echo "The API will be available at http://localhost:9000/api/..."
echo "The frontend will be served from http://localhost:9000/"

# Run Uvicorn server
# Use --reload for development to automatically reload on code changes
uvicorn main:app --host 0.0.0.0 --port 9000 --reload

# Deactivate virtual environment when script exits (optional, as script termination usually handles this)
# deactivate # This line might not execute if uvicorn is killed with Ctrl+C
