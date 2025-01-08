import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// DOM Elements
const authForm = document.getElementById('authForm');
const signInBtn = document.getElementById('signInBtn');
const registerBtn = document.getElementById('registerBtn');
const errorMsg = document.getElementById('error-msg');

// Sign In Handler
signInBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'dashboard.html';
    } catch (error) {
        errorMsg.innerText = error.message;
    }
});

// Register Handler
registerBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = authForm.email.value;
    const password = authForm.password.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store User Data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'patient',
            registeredAt: new Date()
        });

        window.location.href = 'dashboard.html';
    } catch (error) {
        errorMsg.innerText = error.message;
    }
});
