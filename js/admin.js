import {db,auth} from './firebase_config.js'
import { collection, setDoc, getDocs ,doc,deleteDoc,updateDoc,where,query} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { onAuthStateChanged,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const userData=JSON.parse(localStorage.getItem('user'))
onAuthStateChanged(auth, (user) => {
    if (user && localStorage.getItem('user')) {
    } else {
      window.location.href = '../module/Login.html';
    }
  });
// Logout Functionality
document.getElementById('logout-button')?.addEventListener('click', async () => {
  await auth.signOut();
  localStorage.clear()
  alert('Logged out successfully!');
  window.location.href = '../module/Login.html';
});
// Admin Panel Elements

const teacherList = document.getElementById('teacherList');
const studentList = document.getElementById('studentList');

// Event Listener for Adding a Teacher
document.getElementById("add-teacher")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const teacherNameInput = document.getElementById('teacherName').value
  const departmentInput = document.getElementById('department').value
  const subjectInput = document.getElementById('subject').value
  const teacherEmail=document.getElementById('email').value
  const teacherPassword=document.getElementById('password').value
  if(userData.userRole !=='admin'){
    alert("logged in as a admin to add teacher")
    return
  }
  try{
    const teacherRef=doc(collection(db,'teachers'))
  await setDoc(teacherRef, {
    name: teacherNameInput,
    email:teacherEmail,
    password:teacherPassword,
    department:departmentInput,
    subject:subjectInput,
  });
  alert("Teacher added successfully!");
  fetchTeachers()
} catch (error) {
  console.error("Error adding teacher: ", error);
  alert(`Error: ${error.message}`);}
});


// Fetch Teachers
export const fetchTeachers = async () => {
    teacherList.innerHTML = '';
    const snapshot = await getDocs(collection(db, 'teachers'));
   
    if(snapshot.empty){
      const h4=document.createElement('h4');
      h4.textContent="No teacher have added"
      teacherList.appendChild(h4)
      return 
    }
    snapshot.forEach(doc => {
        const div = document.createElement('div');

        const UpdateButton=document.createElement('button');
        UpdateButton.className="update-btn"
        UpdateButton.textContent="Update"
        UpdateButton.setAttribute('data-id',doc.id)

        const DeleteButton=document.createElement('button');
        DeleteButton.className="delete-btn"
        DeleteButton.textContent="Delete"
        DeleteButton.setAttribute('data-id',doc.id)

        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `${data.name} (${data.department} - ${data.subject} )`;
    
        div.appendChild(li);
        li.appendChild(UpdateButton);
        li.appendChild(DeleteButton);
        teacherList.appendChild(div);
    });
   
};
teacherList.addEventListener('click', async (e) =>{
 const  name= document.getElementById('UpdateTeacherName').value
 const  department=document.getElementById('UpdateDepartment').value
 const subject=document.getElementById('UpdateSubject').value
    if(e.target &&  e.target.classList.contains('update-btn')){
      const docId = e.target.getAttribute('data-id');
      const updatedData = {};
      if (name.trim() !== "") {
        updatedData.name = name;
      }
      if (department.trim() !== "") {
        updatedData.department = department;
      }
      if (subject.trim() !== "") {
        updatedData.subject = subject;
      }
      
      // Ensure at least one field is being updated
      if (Object.keys(updatedData).length === 0) {
        alert("Please provide at least one field to update.");
        
      } 
  else{
      try {
        const teacherRef = doc(db, "teachers", docId); // Reference to the teacher document
        await updateDoc(teacherRef, updatedData); // Update the teacher's data
        alert('Teacher updated successfully!');
        fetchTeachers()
        document.getElementById('update').reset
      } catch (error) {

        console.error("Error updating teacher: ", error);
        alert('Error updating teacher.');
      }
    }};
  });
  

  // Event listener for the delete button
teacherList.addEventListener('click', async (e) =>{

if(e.target &&  e.target.classList.contains('delete-btn')){
      const docId = e.target.getAttribute('data-id'); // Get the teacher's document ID
  
      try {
        const teacherRef = doc(db, "teachers", docId); // Reference to the teacher document
        await deleteDoc(teacherRef); // Delete the teacher's document
        alert('Teacher deleted successfully!');
        fetchTeachers()
      } catch (error) {
        console.error("Error deleting teacher: ", error);
        alert('Error deleting teacher.');
      }
    ;}
  });// Load Data

  //student functions
 const fetchPendingStudents = async () => {
    teacherList.innerHTML = '';
    const studentRef=collection(db,'students')
    const querys =query(studentRef,where('status' ,'==','pending'))
    const snapshot = await getDocs(querys);
    if(snapshot.empty){
      const h4=document.createElement('h4');
      h4.textContent="No pending students to approve"
      studentList.appendChild(h4)
      return 
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
        li.textContent = `${data.email} (${data.fname} - ${data.lname} )`;
    
        div.appendChild(li);
        li.appendChild(approveButton);
        li.appendChild(rejectButton);
        studentList.appendChild(div);
    });
   
};

studentList.addEventListener('click', async (e) =>{

  if(e.target &&  e.target.classList.contains('approve-btn')){
    const docId = e.target.getAttribute('data-id');
    const updatedData = {
  status:'approved'
    };

    try {
      const studentRef = doc(db, "students", docId); // Reference to the teacher document
      await updateDoc(studentRef, updatedData); // Update the teacher's data
      alert('student approved  successfully!');
      fetchPendingStudents()
    } catch (error) {

      console.error("Error approved student: ", error);
      alert('Error approved student.');
    }
  };
});


studentList.addEventListener('click', async (e) =>{

  if(e.target &&  e.target.classList.contains('delete-btn')){
        const docId = e.target.getAttribute('data-id'); // Get the teacher's document ID
    
        try {
          const studentRef = doc(db, "students", docId);
          const userRef=doc(db,'users',docId) // Reference to the teacher document
           await Promise.all([
            deleteDoc(studentRef),
            deleteDoc(userRef),
           ])
         
          alert('student rejected successfully!');
          fetchPendingStudents()
        } catch (error) {
          console.error("Error rejecting student: ", error);
          alert('Error reject student');
        }
      ;}
    });

window.onload=() => {
  fetchTeachers(),
  fetchPendingStudents();}
