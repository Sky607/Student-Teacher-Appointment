# Student-Teacher Booking Appointment System

## Project Overview

The **Student-Teacher Booking Appointment System** is a web-based application designed to simplify and streamline the appointment scheduling process between students and teachers. The application provides distinct modules for **Admins**, **Students**, and **Teachers**, ensuring efficient communication and management. The system leverages **HTML**, **CSS**, **JavaScript**, and **Firebase (Firestore Database)** for functionality and responsiveness.

---

## Features

### Admin Panel
- **Add Teacher:** Admins can add new teachers by entering their name, department, and subject.
- **Update/Delete Teacher:** Manage the teacher list by updating or deleting existing records.
- **Approve Student Registrations:** Admins have control over approving or rejecting student registration requests.

### Student Panel
- **Register/Login:** Students can register and log in to the system.
- **Search Teacher:** Search for teachers by name, department, or subject.
- **Book Appointment:** Book an appointment with a selected teacher by providing details like the message and timing.
- **View Appointments:** Students can view their upcoming and past appointments.

### Teacher Panel
- **Manage Appointments:** Teachers can view and manage their appointments, including approving or canceling requests.
- **View Messages:** Read messages sent by students regarding appointments.
- **Logout:** Securely log out of the system.

### Responsive Design
- Fully responsive navigation bar that adapts to all screen sizes.
- Hamburger menu for easy navigation on mobile devices.

---

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase Firestore (NoSQL Database)
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase Hosting (optional for deployment)

---

## File Structure

```plaintext
project-root/
├── index.html         # Main HTML file for the application
├── style.css          # CSS file for styling
├── admin.js           # JavaScript file for Admin functionalities
├── student.js         # JavaScript file for Student functionalities
├── teacher.js         # JavaScript file for Teacher functionalities
├── firebase-config.js # Firebase configuration and initialization
└── assets/            # Directory for images and additional assets
```

---

## Firebase Configuration

1. Create a Firebase project in the Firebase Console.
2. Enable **Firestore Database** and **Authentication** (Email/Password).
3. Replace the placeholders in the `firebase-config.js` file with your Firebase project credentials:

```javascript
const firebaseConfig = {
    apiKey: "<YOUR_API_KEY>",
    authDomain: "<YOUR_AUTH_DOMAIN>",
    projectId: "<YOUR_PROJECT_ID>",
    storageBucket: "<YOUR_STORAGE_BUCKET>",
    messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
    appId: "<YOUR_APP_ID>"
};
```

---



## Execution Workflow

### Admin Workflow
1. Log in using admin credentials.
2. Navigate to the "Admin Panel."
3. Add, update, or delete teacher records .
4. To update fields just type the details in the update form and click the update field button in the teacher column as whom you wanted to update.
5. Approve student registrations.

### Student Workflow
1. Register and log in as a student.
2. Search for teachers by their name, department, or subject.
3. Book an appointment by providing a message and preferred timing.
4. View and manage booked appointments.

### Teacher Workflow
1. Log in using teacher credentials.
2. Navigate to the "Teacher Panel."
3. View and manage appointment requests.
4. Approve or cancel appointments and view related messages.

---

## Responsive Design

The application features a fully responsive design:
- **Navbar:** Adapts to different screen sizes, with a hamburger menu on smaller screens.
- **Panels:** Adjust dynamically to fit various devices, ensuring usability on mobile, tablet, and desktop.

---

## Logging and Error Handling

- **Logging:**
  - Each action (e.g., booking an appointment, adding a teacher) is logged in the Firestore database.
  - User authentication events are logged for security purposes.

- **Error Handling:**
  - Input validation for all forms.
  - Firebase error codes are handled and displayed as user-friendly messages.

---

## Future Enhancements

- Add email notifications for appointment confirmations.
- Implement role-based dashboards.
- Enable real-time updates using Firebase Realtime Database.
- Include calendar integration for better appointment management.

---

## Contributions

Contributions are welcome! If you want to improve this project, feel free to fork the repository and submit a pull request.

---

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 1f8e1170897586a68ac6938ed11907aba9d297d3
=======
>>>>>>> 1f8e1170897586a68ac6938ed11907aba9d297d3
## Contact

For any inquiries or suggestions, please contact:
- **Developer:** Shashi Kumar Yadav


---
##git clone
git clone https://github.com/Sky607/student-teacher-appointment-booking.git

<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 1f8e1170897586a68ac6938ed11907aba9d297d3
=======
>>>>>>> 1f8e1170897586a68ac6938ed11907aba9d297d3
