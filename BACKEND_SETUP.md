# Backend Integration Guide

## How to Connect Frontend with Backend

Your backend is now set up and ready! Follow these steps to connect it:

### 1. Setup Backend

Navigate to backend folder:
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-ecommerce
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows (if MongoDB is installed)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env to your cloud connection string
```

### 3. Start Backend Server

```bash
npm run dev
```

The backend will run on: `http://localhost:5000`

### 4. Update Frontend .env

Update your frontend `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Run Frontend

```bash
npm run dev
```

### 6. Test the Integration

The frontend will now:
- Register/Login users with the backend database
- Store authentication tokens
- Fetch products from backend
- Create and track orders in MongoDB
- All data persists across sessions!

## API Endpoints Available

### Auth
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update profile (requires token)

### Products
- `GET /api/products` - List all products
- `GET /api/products?category=men` - Filter by category
- `GET /api/products?featured=true` - Get featured products
- `GET /api/products/:id` - Get single product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## Architecture

```
fashion-ecommerce/
├── frontend (Next.js) → http://localhost:3000
│   ├── src/utils/apiClient.ts (handles API calls)
│   └── src/contexts/AuthContext.tsx (uses backend now)
│
└── backend (Express) → http://localhost:5000
    ├── src/models/ (MongoDB schemas)
    ├── src/controllers/ (business logic)
    ├── src/routes/ (API endpoints)
    └── src/middleware/ (authentication)
```

## Database

All data is now stored in MongoDB:
- User accounts and profiles
- Products
- Orders and order history
- Authentication tokens handled via JWT

## Next Steps

1. Update AuthContext.tsx to use apiClient
2. Update FeaturedProductsContext.tsx to fetch from backend
3. Test authentication and order flow
4. Add error handling and loading states
5. Deploy backend to production (Heroku, Railway, Render, etc.)

