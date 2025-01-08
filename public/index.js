import { auth } from './firebase-init.js';
import { onAuthStateChanged } from 'firebase/auth';

// Initialize Firebase Authentication state listener
onAuthStateChanged(auth, (user) => {
    const authLinks = document.querySelectorAll('.auth-link');
    const dashboardLink = document.querySelector('#dashboard-link');

    if (user) {
        // If user is logged in, show dashboard link and hide sign-in/register links
        authLinks.forEach(link => link.style.display = 'none');
        if (dashboardLink) dashboardLink.style.display = 'inline-block';
    } else {
        // If no user is logged in, show sign-in/register links
        authLinks.forEach(link => link.style.display = 'inline-block');
        if (dashboardLink) dashboardLink.style.display = 'none';
    }
});

// Form submission logic (for appointment booking)
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const doctor = document.getElementById('doctor').value;

    try {
        // Placeholder for submitting the appointment details to Firestore or a backend
        await bookAppointment(name, email, date, doctor);
        alert('Appointment booked successfully!');
    } catch (error) {
        console.error('Error booking appointment:', error);
    }
});

// Dummy function to simulate booking an appointment
async function bookAppointment(name, email, date, doctor) {
    // Replace this with actual Firestore call or API to book appointment
    console.log('Booking appointment:', { name, email, date, doctor });
}
