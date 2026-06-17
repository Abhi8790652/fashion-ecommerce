# Quick Start Guide for Backend + Frontend

## One-Command Setup

Run both frontend and backend together:

```bash
npm run dev:all
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

## Prerequisites

1. **Node.js** (v16+)
2. **MongoDB** - running locally or use MongoDB Atlas cloud
3. **npm** or **yarn**

## Setup Steps

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Setup Environment Variables

**Backend (.env in `/backend` folder):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-ecommerce
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend (.env.local in root):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=862491648968-8g6ildrhaqsc1qjhu3oekdrli6fjol9k.apps.googleusercontent.com
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id_here
```

### Step 3: Start MongoDB
```bash
mongod
```
(Or use MongoDB Atlas connection string in .env)

### Step 4: Run Backend
```bash
cd backend
npm run dev
```

Backend will be at: `http://localhost:5000`

### Step 5: Run Frontend (new terminal)
```bash
npm run dev
```

Frontend will be at: `http://localhost:3000`

## How It Works

1. **User Registration/Login** → Data saved in MongoDB
2. **Authentication** → JWT tokens issued by backend
3. **Product Catalog** → Fetched from backend database
4. **Orders** → Saved in MongoDB with user association
5. **Order History** → Retrieved from database

## API Client

The frontend uses `src/utils/apiClient.ts` to communicate with backend.

Tokens are automatically included in all authenticated requests.

## Testing the Connection

1. Go to `http://localhost:3000`
2. Click Sign Up
3. Create an account - data will save in MongoDB
4. Login with credentials
5. Add items to cart and checkout
6. Orders will save to database

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Check port 5000 is free
- Check .env file exists and MONGODB_URI is correct

### Frontend API calls fail
- Ensure NEXT_PUBLIC_API_URL is set to `http://localhost:5000/api`
- Check backend is running on port 5000
- Check browser console for errors

### MongoDB connection fails
- Install MongoDB Community Edition or use MongoDB Atlas
- For Atlas, update MONGODB_URI in backend .env

## Production Deployment

### Backend Deployment
- Deploy to: Heroku, Railway, Render, or AWS
- Use managed MongoDB (MongoDB Atlas)
- Update FRONTEND_URL in production
- Change JWT_SECRET to strong random value

### Frontend Deployment
- Deploy to: Vercel, Netlify, or AWS
- Update NEXT_PUBLIC_API_URL to your backend URL
- Ensure CORS is configured correctly in backend

