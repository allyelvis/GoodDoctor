import { db } from './firebase-init.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from './firebase-init.js';

const appointmentsList = document.getElementById('appointments-list');

async function fetchAppointments() {
    const q = query(collection(db, 'appointments'), where('patientId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = ;
        appointmentsList.appendChild(listItem);
    });
}

fetchAppointments();
