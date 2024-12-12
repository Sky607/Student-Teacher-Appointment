import { db,auth } from './firebase_config.js';
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const userData=JSON.parse(localStorage.getItem('user'))

onAuthStateChanged(auth, (user) => {
    if (user && localStorage.getItem('user')) {
    } else {
      window.location.href = '../module/Login.html';
    }
  });
  document.getElementById('logout-button')?.addEventListener('click', async () => {
    await auth.signOut();
    localStorage.clear()
    alert('Logged out successfully!');
    window.location.href = '../module/Login.html';
  });
// Student Panel Elements
const appointmentTeacher = document.getElementById('select-teacher');
const appointmentMessageInput = document.getElementById('appointmentMessage');
const bookAppointmentBtn = document.getElementById('bookAppointment');
const appointmentList = document.getElementById('appointmentList');

const fetchTeachers = async () => {
    const snapshot = await getDocs(collection(db, 'teachers'));
    snapshot.forEach(doc => {
        const data = doc.data();
        const option= document.createElement('option');
        option.textContent = `${data.name}`;
        appointmentTeacher.appendChild(option);
    });
};
// Book Appointment
bookAppointmentBtn.addEventListener('click', async () => {
    const teacher = appointmentTeacher.value;
    const message = appointmentMessageInput.value;
if(userData.userRole!=='student'){
    alert("logged in as student to book appointment!");
    localStorage.clear()
    window.location.href='../module/Login.html'}
    try {
        await addDoc(collection(db, 'appointments'), { teacher, message,status:'pending' });
        alert('Appointment booked successfully!');
        fetchAppointments();
    } catch (error) {
        console.error('Book Appointment Error:', error);
        alert('Failed to book appointment!');
    }
});

// Fetch Appointments
export const fetchAppointments = async () => {
    appointmentList.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'appointments'));
    if(snapshot.empty){
        const h3=document.createElement('h3');
        h3.textContent="No appointment "
        appointmentList.appendChild(h3);
    }
    snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `Teacher: ${data.teacher}, Message: ${data.message}`;
        appointmentList.appendChild(li);
    });
};

// Load Data
window.onload = () => {
    fetchAppointments(),
    fetchTeachers();}
