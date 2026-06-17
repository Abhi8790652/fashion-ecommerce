@echo off
REM Backend Installation Script

echo Installing Backend Dependencies...
cd backend
call npm install

echo.
echo Creating .env file from template...
if not exist .env (
    copy .env.example .env
    echo .env file created. Please update it with your MongoDB URI and other settings.
) else (
    echo .env file already exists.
)

echo.
echo Backend setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env with your MongoDB URI
echo 2. Make sure MongoDB is running
echo 3. Run 'npm run dev' in the backend folder to start the server

cd ..
pause
