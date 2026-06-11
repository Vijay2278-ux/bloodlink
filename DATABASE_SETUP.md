# Database Setup Instructions

## Setup Your Neon PostgreSQL Database

1. **Get your Neon Database URL:**
   - Go to [https://console.neon.tech](https://console.neon.tech)
   - Create or select your project
   - Click on "Connection string" 
   - Copy the connection string

2. **Update `.env.local` file:**
   - Open `.env.local` in the project root
   - Replace the `DATABASE_URL` with your actual Neon connection string:
   ```
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```
   - Generate a secure JWT_SECRET (random string for production):
   ```
   JWT_SECRET="your-random-secure-string-here"
   ```

3. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
   This will:
   - Create the database tables
   - Generate Prisma client

4. **(Optional) View the database:**
   ```bash
   npx prisma studio
   ```
   This opens a web UI to view and manage your database.

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- Body:
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "password": "securepassword123"
  }
  ```

### Login User
- **POST** `/api/auth/login`
- Body:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

## Features Implemented

✅ User registration with email validation
✅ Secure password hashing with bcryptjs
✅ JWT token-based authentication
✅ Login/logout functionality
✅ User profile storage in database
✅ User session persistence (localStorage)
✅ Protected pages (redirect to login if not authenticated)
✅ User progress tracking (subjects and quizzes)

## Files Created

- `/prisma/schema.prisma` - Database schema
- `/lib/db.ts` - Database connection
- `/lib/auth.ts` - Authentication utilities
- `/lib/auth-context.tsx` - Auth context provider
- `/app/api/auth/register/route.ts` - Registration API
- `/app/api/auth/login/route.ts` - Login API
- `/app/login/page.tsx` - Login page
- `/components/login-form.tsx` - Login/Register form component
- `/components/user-profile.tsx` - User profile display component
- `.env.local` - Environment variables (needs to be configured)

## Next Steps

1. Configure `.env.local` with your Neon database URL
2. Run Prisma migrations: `npx prisma migrate dev --name init`
3. Start the dev server: `npm run dev`
4. Visit `http://localhost:3000/login` to test
