#!/bin/bash

# Backend Installation Script for Unix/Mac/Linux

echo "Installing Backend Dependencies..."
cd backend
npm install

echo ""
echo "Creating .env file from template..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo ".env file created. Please update it with your MongoDB URI and other settings."
else
    echo ".env file already exists."
fi

echo ""
echo "Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your MongoDB URI"
echo "2. Make sure MongoDB is running"
echo "3. Run 'npm run dev' in the backend folder to start the server"

cd ..
