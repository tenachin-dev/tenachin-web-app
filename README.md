Doctor Appointment System

A simple doctor appointment booking system using Next.js and Firebase.

🎥 How It Works

This short demo shows how doctors configure their appointment slots and how patients browse doctors, select available dates and times, and book appointments.

<video src="https://github.com/yared098/tenachin-web-meeting/raw/main/docs/demo.mp4" controls width="100%"></video>

Demo

If the video player is not displayed by GitHub, you can watch the video directly:

▶️ Watch Demo Video

# Tenachin Web Meeting

Tenachin is a mobile-first healthcare web application that allows patients to:

* Create an account and log in
* Browse doctors
* Search doctors by name or specialization
* View doctor information
* View available appointment dates and time slots
* Book appointments
* View booked appointments
* Track appointment status
* Join video consultations
* Manage their profile
* Change their password
* View Terms and Privacy Policy

The application is built with **Next.js, TypeScript, Tailwind CSS, and Firebase**.

---

# Tech Stack

| Technology              | Purpose                   |
| ----------------------- | ------------------------- |
| Next.js                 | Web application framework |
| React                   | UI                        |
| TypeScript              | Type safety               |
| Tailwind CSS            | Styling                   |
| Firebase Authentication | User authentication       |
| Firebase Firestore      | Database                  |
| Jitsi Meet              | Video consultation        |
| ESLint                  | Code quality              |
| npm                     | Package management        |

---

# Requirements

Before running the project, install:

* Node.js 18+
* npm 9+
* Git

Check your versions:

```bash
node -v
npm -v
git --version
```

Recommended:

```text
Node.js 20+
npm 10+
```

---

# Getting Started

## 1. Clone the project

```bash
git clone <YOUR_REPOSITORY_URL>
```

Go into the project:

```bash
cd tenachin-web-meeting
```

---

# 2. Install dependencies

Run:

```bash
npm install
```

This installs all packages from:

```text
package.json
package-lock.json
```

---

# 3. Create the environment file

Create this file in the project root:

```text
.env.local
```

The structure should be:

```text
tenachin-web-meeting/
├── .env.local
├── package.json
├── next.config.ts
├── app/
├── components/
├── lib/
└── ...
```

Add the Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

Example:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=dfgsd
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=astutransport
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=astutransport.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=dsdfasd
NEXT_PUBLIC_FIREBASE_APP_ID=1:315469618700:web:sds
```

### Important

Do not commit `.env.local` to Git.

Make sure `.gitignore` contains:

```text
.env
.env.local
.env.*.local
```

The project should receive Firebase configuration through environment variables rather than hardcoding it in the source code.

---

# 4. Firebase Configuration

The application uses Firebase for:

* Authentication
* Firestore database

Firebase configuration is located here:

```text
lib/
└── firebase/
    ├── config.js
    ├── auth.js
    └── firestore.js
```

## Firebase Config

`lib/firebase/config.js` loads the environment variables:

```javascript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

---

# 5. Firebase Authentication

Firebase Authentication is used for patient login and registration.

The project currently uses:

```text
Email + Password
```

Authentication helper functions are located in:

```text
lib/firebase/auth.js
```

Available functions include:

```javascript
registerUser()
loginUser()
logoutUser()
listenToAuthState()
```

Make sure Email/Password authentication is enabled in the Firebase Console.

---

# 6. Firestore Database

The application uses Cloud Firestore.

Main collections:

```text
doctors
patients
appointments
users
messages
slots
```

## Doctors

Example fields:

```text
doctorId
name
email
profile
profileImage
specialization
consultationFee
rating
experience
isAvailable
createdAt
```

---

## Appointments

Example fields:

```text
appointmentId
doctorId
patientId
doctorName
patientName
patientEmail
date
time
consultationFee
status
meetingId
createdAt
```

Appointment statuses:

```text
pending
confirmed
active
completed
cancelled
```

Recommended flow:

```text
pending
   ↓
confirmed
   ↓
active
   ↓
completed
```

Cancellation can happen from:

```text
pending → cancelled

confirmed → cancelled
```

---

## Slots

Doctor availability is stored in:

```text
slots/{doctorId}
```

Example:

```text
doctorId
doctorName

monday:
  - 08:00-08:30
  - 09:00-09:30
  - 10:00-10:30

tuesday:
  - 08:00-08:30

wednesday:
  - 13:00-13:30

slotDuration: 30
updatedAt
```

Appointments use the doctor's available slots.

---

# 7. Run the Project

Start the development server:

```bash
npm run dev
```

You should see something similar to:

```text
▲ Next.js
- Local: http://localhost:3000
```

Open:

```text
http://localhost:3000
```

---

# 8. Other Useful Commands

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```

## Start production server

```bash
npm start
```

## Run ESLint

```bash
npm run lint
```

Recommended before committing:

```bash
npm run lint
npm run build
```

---

# 9. Project Structure

Main project structure:

```text
tenachin-web-meeting/
│
├── app/
│   ├── bookings/
│   │   ├── page.tsx
│   │   └── [bookingId]/
│   │       └── page.tsx
│   │
│   ├── doctors/
│   │   └── [doctorId]/
│   │       └── page.tsx
│   │
│   ├── meeting/
│   │   └── [meetingId]/
│   │       └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── privacy/
│   │   └── page.tsx
│   │
│   ├── terms/
│   │   └── page.tsx
│   │
│   └── page.tsx
│
├── components/
│   ├── auth/
│   │   └── AuthGuard.tsx
│   │
│   ├── doctors/
│   │   └── DoctorsScreen.tsx
│   │
│   ├── profile/
│   │   └── ProfileScreen.tsx
│   │
│   └── ...
│
├── lib/
│   └── firebase/
│       ├── config.js
│       ├── auth.js
│       └── firestore.js
│
├── public/
│
├── types/
│
├── hooks/
│
├── services/
│
├── context/
│
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# 10. Main Application Flow

The main patient flow is:

```text
Login / Register
      ↓
Home
      ↓
Doctors
      ↓
Doctor Details
      ↓
Select Date
      ↓
Select Time Slot
      ↓
Book Appointment
      ↓
Home
      ↓
Bookings Tab
      ↓
Booking Details
      ↓
Join Consultation
      ↓
Jitsi Video Meeting
```

---

# 11. Home Navigation

The application uses a mobile-style bottom navigation:

```text
Home
Doctors
Bookings
Profile
```

The Home page controls the active tab.

The main scroll container is inside the mobile frame.

Important:

> Child screens should not create their own full-page scrolling container unless they are standalone routes.

The Home layout is:

```text
h-dvh
│
└── Mobile Frame
    │
    ├── Header
    │
    ├── Scrollable Content
    │
    │   ├── Home
    │   ├── Doctors
    │   ├── Bookings
    │   └── Profile
    │
    └── Bottom Navigation
```

---

# 12. Booking Flow

When a patient books an appointment:

1. Validate doctor
2. Validate date
3. Validate time slot
4. Check authentication
5. Check whether slot is already booked
6. Create appointment in Firestore
7. Navigate back to Home
8. Automatically select the Bookings tab

Example:

```text
Doctor Detail
     ↓
Book Appointment
     ↓
Firestore
     ↓
/?tab=bookings&bookingId=APPOINTMENT_ID
     ↓
Bookings tab
```

The `bookingId` can be used to identify the appointment that was just created.

---

# 13. Doctor Details

Doctor detail pages are located at:

```text
app/doctors/[doctorId]/page.tsx
```

The page loads:

```text
doctors/{doctorId}
```

and:

```text
slots/{doctorId}
```

The page displays:

* Doctor profile
* Specialization
* Rating
* Experience
* Consultation fee
* Availability
* Available dates
* Available time slots

---

# 14. Appointment Timing

Doctor slots are 30 minutes.

Example:

```text
Slot:
13:30 - 14:00

Consultation:
13:30 - 13:55

Buffer:
13:55 - 14:00
```

The consultation duration is currently:

```text
25 minutes
```

The remaining 5 minutes provide a buffer before the next 30-minute slot.

For production, meeting start/end times should be stored as authoritative Firestore timestamps rather than relying only on the browser clock.

---

# 15. Video Meetings

Video consultation uses:

```text
Jitsi Meet
```

Meeting route:

```text
app/meeting/[meetingId]/page.tsx
```

The meeting URL follows:

```text
https://meet.jit.si/{meetingId}
```

The appointment should contain:

```text
meetingId
```

Only confirmed appointments should be allowed to access the consultation.

---

# 16. Booking Status

The expected appointment lifecycle is:

```text
pending
```

Patient creates the appointment.

```text
confirmed
```

Doctor confirms the appointment.

```text
active
```

Consultation is currently active.

```text
completed
```

Consultation has finished.

```text
cancelled
```

Appointment was cancelled.

---

# 17. Authentication Protection

Protected pages use:

```text
components/auth/AuthGuard.tsx
```

The AuthGuard checks whether the Firebase user is authenticated.

Unauthenticated users should be redirected to:

```text
/login
```

---

# 18. Important Development Rules

## Do not hardcode Firebase configuration

Use:

```text
.env.local
```

instead of putting configuration directly inside components.

---

## Do not commit environment files

Never commit:

```text
.env.local
.env
.env.*.local
```

---

## Do not put Firebase Admin credentials in frontend code

Never add:

```text
serviceAccountKey.json
private keys
Firebase Admin SDK credentials
```

to the frontend.

`NEXT_PUBLIC_*` variables are exposed to the browser.

---

## Use Firestore as the source of truth

Doctors, appointments and slots should come from Firestore.

Avoid creating fake/static data inside UI components for production functionality.

---

# 19. Loading States

The application uses skeleton loading instead of large loading spinners.

For example:

```text
Doctor Card
████████████
████████
████
```

Skeletons should resemble the final UI.

This provides a better mobile user experience.

---

# 20. Mobile UI Architecture

The application is designed primarily for mobile.

Maximum mobile frame width:

```text
430px
```

The general layout is:

```text
max-w-[430px]
h-dvh
```

On larger screens, the application appears as a mobile-style application frame centered on the page.

---

# 21. Troubleshooting

## Firebase configuration error

If Firebase does not initialize, check:

```bash
cat .env.local
```

Make sure all required variables exist.

After changing `.env.local`, restart Next.js:

```bash
Ctrl + C
npm run dev
```

Then:

```bash
npm run dev
```

---

## Module not found

Run:

```bash
rm -rf node_modules
npm install
```

Then:

```bash
npm run dev
```

---

## Build errors

Run:

```bash
npm run lint
```

Then:

```bash
npm run build
```

Fix the first error before continuing.

---

## Firestore permission denied

If you receive:

```text
FirebaseError: Missing or insufficient permissions
```

check the Firestore Security Rules in the Firebase Console.

Do not solve this by making the entire database public.

---

# 22. Git Workflow

Before starting work:

```bash
git pull
```

Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

After making changes:

```bash
git status
```

Then:

```bash
git add .
```

Commit:

```bash
git commit -m "Add your feature"
```

Push:

```bash
git push origin feature/your-feature-name
```

---

# 23. Before Making a Pull Request

Run:

```bash
npm run lint
```

Then:

```bash
npm run build
```

Make sure:

* No TypeScript errors
* No ESLint errors
* Firebase works
* Login works
* Doctor list works
* Appointment booking works
* Bookings appear correctly
* Video meeting route works
* Mobile layout works

---

# 24. First-Time Setup Checklist

For a new developer:

```text
[ ] Install Node.js
[ ] Clone repository
[ ] cd into project
[ ] Run npm install
[ ] Create .env.local
[ ] Add Firebase configuration
[ ] Enable Firebase Authentication
[ ] Verify Firestore access
[ ] Run npm run dev
[ ] Open http://localhost:3000
[ ] Create/login with a test account
[ ] Test doctors
[ ] Test appointment booking
[ ] Test bookings
[ ] Test video meeting
[ ] Run npm run lint
[ ] Run npm run build
```

---

# 25. Environment Variables Summary

Required variables:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

Example `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_VALUE
```

Do not copy another developer's private credentials.

Use the Firebase project configuration provided for the environment you are working on.

---

# 26. Quick Start

For an experienced developer, the entire setup is:

```bash
git clone <YOUR_REPOSITORY_URL>

cd tenachin-web-meeting

npm install
```

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_VALUE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_VALUE
```

Then:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

For production verification:

```bash
npm run lint
npm run build
npm start
```

---

# 27. Important Note for the Next Developer

Before changing the application architecture, understand the existing navigation and Firebase structure.

The project currently follows:

```text
Next.js App Router
        +
Firebase Authentication
        +
Firestore
        +
Mobile-first UI
        +
Jitsi Video Consultation
```

Keep the UI simple, responsive and mobile-first.

When adding new functionality:

1. Check the existing Firebase structure first.
2. Reuse existing components and helpers.
3. Avoid duplicating Firebase initialization.
4. Keep Firestore field names consistent.
5. Keep appointment statuses consistent.
6. Keep the single-scroll mobile architecture.
7. Test both mobile and desktop layouts.
8. Run `npm run lint` and `npm run build` before committing.


# Developer & Contact

**Developer:** Fdessa

**Email:** [fdessalew@gmail.com](mailto:fdessalew@gmail.com)

For any questions, issues, bugs, feature requests, or development support related to this project, please contact the developer by email.

If you need help with:

* Project setup
* Firebase configuration
* Bug fixing
* New features
* Deployment
* Technical questions
* Project maintenance

Please contact:

**[fdessalew@gmail.com](mailto:fdessalew@gmail.com)**

---

© 2026 Tenachin. All rights reserved.

