#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "--- NayanJyoti Eye Clinic Application Setup & Launch ---"

# Navigate to the directory where this script is located to ensure relative paths work correctly
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Frontend setup
echo "
>>> [1/6] Frontend: Navigating to frontend directory..."
if [ ! -d "frontend" ]; then
    echo "Error: 'frontend' directory not found in $SCRIPT_DIR. Please ensure the directory structure is correct."
    exit 1
fi
cd frontend

echo "
>>> [2/6] Frontend: Installing Dependencies (npm install)..."
if ! npm install; then
    echo "Error: npm install failed. Please check for errors above."
    exit 1
fi

echo "
>>> [3/6] Frontend: Building Application (npm run build)..."
if ! npm run build; then
    echo "Error: npm run build failed. Please check for errors above."
    exit 1
fi

echo "
>>> Frontend setup complete. Navigating back to project root..."
cd .. # Back to project root ($SCRIPT_DIR)

# Backend setup
echo "
>>> [4/6] Backend: Navigating to backend directory..."
if [ ! -d "backend" ]; then
    echo "Error: 'backend' directory not found in $SCRIPT_DIR. Please ensure the directory structure is correct."
    exit 1
fi
cd backend

echo "
>>> [5/6] Backend: Installing Python Dependencies (pip install -r requirements.txt)..."
if ! python3 -m pip install -r requirements.txt; then
    echo "Error: pip install failed. Please ensure Python 3 and pip are installed and check for errors above."
    exit 1
fi

echo "
>>> [6/6] Backend: Starting FastAPI Server on Port 9000 (uvicorn)..."
# The backend/main.py is configured to serve static files from ../frontend/dist
# and all API routes are prefixed with /api.
# The frontend will be served from the root (http://localhost:9000)
# and API calls will go to http://localhost:9000/api/...
# Using --reload for development convenience. Remove for production.
if ! uvicorn main:app --host 0.0.0.0 --port 9000 --reload; then
    echo "Error: Failed to start Uvicorn server. Please check for errors above."
    exit 1
fi

echo "
-----------------------------------------------------"
echo " NayanJyoti Eye Clinic Application should now be running!"
echo " Frontend accessible at: http://localhost:9000"
echo " API (example):        http://localhost:9000/api/services"
echo "-----------------------------------------------------"
