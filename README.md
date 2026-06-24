# Booking Portal Frontend Guide

This project is a React + TypeScript + Vite frontend for a booking portal with two separate portals:

- Vendor Portal
- Customer Portal

This README is written for the backend team so they can understand the current frontend structure, routes, data flow, and the expected backend integration points.

## 1. Overview

The app currently uses localStorage as a temporary data layer. This means the frontend is simulating backend behavior for now.

The main user flows are:

1. Vendor logs in and sees bookings
2. Vendor updates booking status
3. Customer logs in and sees available vendors
4. Customer creates a booking request
5. Customer receives a notification when the vendor updates the booking status

## 2. Portal Summary

### Vendor Portal

Used by service providers/vendors.

Main routes:

- /login
- /dashboard
- /bookings

Main responsibilities:

- vendor authentication
- display bookings for the vendor
- update booking status
- show new booking requests as notifications

### Customer Portal

Used by customers who want to book services.

Main routes:

- /customer/login
- /customer/register
- /customer/dashboard

Main responsibilities:

- customer authentication
- customer registration
- view vendors
- create booking requests
- receive notifications when booking status changes

## 3. Important System Flow

### Vendor flow

1. Vendor opens the login page
2. Vendor enters email and password
3. Frontend checks localStorage for a matching vendor account
4. If valid, frontend stores a vendor session
5. Vendor is redirected to the dashboard
6. Vendor sees bookings filtered to their vendor ID
7. Vendor can update a booking status to Pending, Accepted, or Rejected
8. Booking data is updated in localStorage

### Customer flow

1. Customer opens the customer login page
2. Customer enters email and password
3. Frontend checks localStorage for a matching customer account
4. If valid, frontend stores a customer session
5. Customer is redirected to the customer dashboard
6. Customer sees available vendors
7. Customer submits a booking request
8. Booking is stored in localStorage
9. When the vendor updates the status, the customer dashboard creates a notification

## 4. Main Frontend Files

### Vendor-related files

- src/features/auth/view/LoginView.tsx
  - Vendor login UI
- src/features/auth/viewmodel/useLoginViewModel.ts
  - Vendor login logic
- src/features/auth/model/auth.model.ts
  - Vendor form and data model
- src/features/dashboard/view/DashboardView.tsx
  - Vendor dashboard UI
- src/features/dashboard/viewmodel/useDashboardViewModel.ts
  - Vendor dashboard behavior and booking status updates
- src/features/bookings/view/BookingsView.tsx
  - Booking management UI
- src/features/bookings/viewmodel/useBookingsViewModel.ts
  - Booking list logic

### Customer-related files

- src/features/customer_auth/view/CustomerLoginView.tsx
  - Customer login UI
- src/features/customer_auth/view/CustomerRegisterView.tsx
  - Customer registration UI
- src/features/customer_auth/viewmodel/useCustomerLoginViewModel.ts
  - Customer login logic
- src/features/customer_auth/viewmodel/useCustomerRegisterViewModel.ts
  - Customer registration logic
- src/features/customer_dashboard/view/CustomerDashboardView.tsx
  - Customer dashboard UI
- src/features/customer_dashboard/viewmodel/useCustomerDashboardViewModel.ts
  - Customer dashboard logic, booking creation, notification handling
- src/features/customer_dashboard/model/customerDashboard.model.ts
  - Customer booking and notification data model

### Shared UI files

- src/shared-components/AuthGuard/AuthGuard.tsx
  - Protects vendor routes
- src/shared-components/AuthGuard/CustomerAuthGuard.tsx
  - Protects customer routes
- src/shared-components/NotificationBell/NotificationBell.tsx
  - Notification UI component
- src/shared-components/BookingModal/BookingModal.tsx
  - Modal used for booking status updates
- src/shared-components/StatusBadge/StatusBadge.tsx
  - Status badge UI

## 5. Routing Structure

Main routes registered in src/App.tsx:

- /login
- /register
- /dashboard
- /bookings
- /customer/login
- /customer/register
- /customer/dashboard

Route constants are stored in:

- src/routes/index.tsx

## 6. Folder Structure

src/

- App.tsx
  - Main router setup
- routes/
  - Route constants
- features/
  - auth/
  - dashboard/
  - bookings/
  - customer_auth/
  - customer_dashboard/
- shared-components/
  - Reusable UI components

## 7. Current Data Storage

The frontend currently uses these localStorage keys:

- session
  - vendor session
- customer_session
  - customer session
- vendors
  - vendor accounts and vendor data
- customers
  - customer accounts and customer data
- bookings
  - all booking records
- notifications\_<customerId>
  - customer notification list

## 8. Backend Integration Notes

The current frontend is a mock implementation. When the backend is ready, these front-end actions should become real API calls.

Recommended backend endpoints:

### Authentication

- POST /auth/vendor/login
- POST /auth/customer/login
- POST /auth/customer/register

### Bookings

- GET /vendors/{vendorId}/bookings
- POST /bookings
- PATCH /bookings/{bookingId}/status
- GET /customers/{customerId}/bookings

### Notifications

- GET /customers/{customerId}/notifications
- POST /notifications or event-based notification trigger on booking status change

## 9. Most Important Backend Requirement

The most important integration point is this flow:

1. Customer creates a booking
2. Booking is stored with status Pending
3. Vendor updates the booking status
4. Customer must receive a notification about the update

This is currently simulated in the frontend by reading and comparing booking data from localStorage.

## 10. Running the Project

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```
