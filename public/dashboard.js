import { auth, db } from './firebase-init.js';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

// Elements
const userName = document.getElementById('userName');
const appointmentsTable = document.getElementById('appointmentsTable');
const logoutBtn = document.getElementById('logoutBtn');

// Load User Data
async function loadUserData() {
    const user = auth.currentUser;
    if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            userName.innerText = docSnap.data().email;
        }
    } else {
        window.location.href = 'auth.html';
    }
}

// Logout
logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = 'auth.html';
});

window.onload = () => {
    loadUserData();
};
