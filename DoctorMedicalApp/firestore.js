import { db, auth } from './firebase-init';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Example: Create User
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User registered:', user);
    
    // Store user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      registeredAt: new Date()
    });

    alert("User registered successfully!");
  } catch (error) {
    console.error('Error during registration:', error.message);
    alert(error.message);
  }
}

// Example: Fetch User Data
async function getUserData(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User Data:", docSnap.data());
  } else {
    console.log("No user found!");
  }
}
