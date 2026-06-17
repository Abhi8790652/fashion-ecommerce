# Fashion Ecommerce Backend

Node.js + Express + MongoDB API backend for the Fashion Ecommerce application.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string and email credentials.

4. Make sure MongoDB is running on your machine.

## Running the Backend

### Development Mode
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=men` - Get products by category
- `GET /api/products?featured=true` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)

### Orders
- `POST /api/orders` - Create order (requires token)
- `GET /api/orders` - Get user's orders (requires token)
- `GET /api/orders/:id` - Get single order (requires token)

## Required Environment Variables

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

## Database Models

### User
- name (required)
- email (required, unique)
- password (hashed)
- phone, address, city, state, zip, country
- role (user/admin)

### Product
- name, description, price
- category (men/women/accessories)
- images, stock
- featured, bestSeller, newArrival, onSale
- rating, reviewCount

### Order
- userId (reference to User)
- items (array of products)
- totalPrice, shippingPrice, tax, finalPrice
- status (pending/processing/shipped/delivered/cancelled)
- paymentMethod (card/cod/upi)
- shippingAddress
- orderNumber (auto-generated)
