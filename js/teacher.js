import { db,auth } from './firebase_config.js';
import { collection, getDocs,updateDoc,deleteDoc ,doc,where,query} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


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
// Teacher Panel Elements
const teacherAppointments = document.getElementById('teacherAppointments');

// Fetch Appointments for Teacher
export const fetchTeacherPendingAppointments = async () => {
    const appointmentRef=collection(db,'appointments');
    const queries=query(appointmentRef,where('status','==','pending'))
    const snapshot = await getDocs(queries);
    if(snapshot.empty){
      const h4=document.createElement('h4');
      h4.textContent='No pending appointment'
      teacherAppointments.appendChild(h4)
    }
   
    snapshot.forEach(doc => {
        const div = document.createElement('div');
        
        const approveButton=document.createElement('button');
        approveButton.className="approve-btn"
        approveButton.textContent="approve"
        approveButton.setAttribute('data-id',doc.id)

        const rejectButton=document.createElement('button');
        rejectButton.className="reject-btn"
        rejectButton.textContent="Reject"
        rejectButton.setAttribute('data-id',doc.id)

        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `Student: ${data.message}, Requested with ${data.teacher}`;
        li.appendChild(approveButton)
        li.appendChild(rejectButton)
        div.appendChild(li)
        teacherAppointments.appendChild(div);
    });
};
const teacherApprovedAppointments =document.getElementById('teacherApprovedAppointments')
export const fetchTeacherApprovedAppointments = async () => {
  const appointmentRef=collection(db,'appointments');
  const queries=query(appointmentRef,where('status','==','approved'))
  const snapshot = await getDocs(queries);
  if(snapshot.empty){
    const h4=document.createElement('h4');
    h4.textContent='No appointment to approve'
    teacherApprovedAppointments.appendChild(h4)
  }
  snapshot.forEach(doc => {
    const div = document.createElement('div');
      const data = doc.data();
      const li = document.createElement('li');
      li.textContent = `Student: ${data.message}, Requested with ${data.teacher}`;
      div.appendChild(li)
      teacherApprovedAppointments.appendChild(div);
  });
};
teacherAppointments.addEventListener('click', async (e) =>{

  if(e.target &&  e.target.classList.contains('approve-btn')){
    const docId = e.target.getAttribute('data-id');
    const updatedData = {
  status:'approved'
    };

    try {
      const appointmentRef = doc(db, "appointments", docId); // Reference to the teacher document
      await updateDoc(appointmentRef, updatedData); // Update the teacher's data
      alert('appointment approved  successfully!');
      fetchTeacherPendingAppointments()
      fetchTeacherApprovedAppointments()
    } catch (error) {

      console.error("Error approving appointment: ", error);
      alert('Error approving appointment.');
    }
  };
});


teacherAppointments.addEventListener('click', async (e) =>{

  if(e.target &&  e.target.classList.contains('reject-btn')){
        const docId = e.target.getAttribute('data-id'); // Get the teacher's document ID
    
        try {
          const appointmentRef = doc(db, "appointments", docId);
          await deleteDoc(appointmentRef)
         
          alert('appointment rejected successfully!');
          fetchTeacherPendingAppointments()
        } catch (error) {
          console.error("Error appointment rejected: ", error);
          alert('Error appointment rejected');
        }}
    });


// Load Data
window.onload=()=>{fetchTeacherPendingAppointments(),fetchTeacherApprovedAppointments()}
