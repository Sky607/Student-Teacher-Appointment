  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBzdgZPHxJmbv-545SQ0IyuDJQtLPx62qE",
    authDomain: "student-teacher-appointe-552c3.firebaseapp.com",
    projectId: "student-teacher-appointe-552c3",
    storageBucket: "student-teacher-appointe-552c3.firebasestorage.app",
    messagingSenderId: "651486454660",
    appId: "1:651486454660:web:4a4b8df7b35c4ee732f3d1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Firebase
const auth=getAuth(app);
const db=getFirestore(app)

export {auth,db}