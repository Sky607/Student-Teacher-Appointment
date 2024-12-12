import {db,auth} from './firebase_config.js'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { 
  doc, setDoc, getDoc ,updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
async function registerStudent(studentData) {
  try {
    await setDoc(doc(db, "students",studentData.userId), {
      ...studentData,
      status: "pending", // Set initial status to "pending"
      registrationTime: new Date(),
    });
   
    alert('Registration successful! Your account is awaiting approval.');
  } catch (error) {
    console.error("Error registering student: ", error);
  }
}

// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Save user details in Firestore
    let ref = doc(db, "users", userId);
    await setDoc(ref, {
      fname,
      lname,
      email,
      role,
    });
    
    // If the role is "student", register them in the students collection
    if (role === "student") {

     await registerStudent({ fname, lname, email, role, userId });
    
    }

    alert('Registration successful!');
  window.location.href = '../module/Login.html';
  } catch (error) {
    console.error("Registration Error:", error);
    alert(`Registration Error: ${error.message}`);
  }
});

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId =userCredential.user.uid
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      const userRole = userDoc.data().role;
      if(userRole ==='student'){
    await loginStudent(email,password)
      }
      localStorage.setItem('user',JSON.stringify({userRole,userId}));
      // Redirect based on role
      switch (userRole) {
        case 'admin':
          window.location.href = '../module/admin.html';
          break;
        case 'student':
          window.location.href = '../module/student.html';
          break;
        case 'teacher':
          window.location.href = '../module/teacher.html';
          break;
        default:
          alert('Unknown role');
      }
    } else {
      alert('User role not found!');
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert(`login Error: ${error.message}`);
  }
});

async function loginStudent(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Check if student is approved
    const studentRef = doc(db, "students", userId);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists() && studentSnap.data().status === "approved") {
      // Allow login if the student is approved
      alert('Login successful!');
      // Redirect or allow access to the student dashboard
    } else {
      // Deny login if student is not approved
      alert('Your account is awaiting approval. Please contact the admin.');
      await auth.signOut();
      localStorage.clear() // Optional: Automatically sign out the user
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    alert('Error logging in. Please try again.');
  }
}