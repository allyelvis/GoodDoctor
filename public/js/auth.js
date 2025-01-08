import { auth } from './firebase-init.js';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const googleLoginButton = document.getElementById('google-login');

googleLoginButton.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        alert('Logged in successfully!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Error during login:', error.message);
    }
});
