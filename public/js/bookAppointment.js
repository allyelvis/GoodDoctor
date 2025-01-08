import { db } from './firebase-init.js';
import { addDoc, collection } from 'firebase/firestore';
import { auth } from './firebase-init.js';

document.getElementById('appointment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const doctor = document.getElementById('doctor').value;

    try {
        await addDoc(collection(db, 'appointments'), {
            name,
            email,
            date,
            doctor,
            status: 'pending',
            patientId: auth.currentUser.uid
        });
        alert('Appointment Booked Successfully!');
    } catch (error) {
        console.error('Error booking appointment:', error.message);
    }
});
