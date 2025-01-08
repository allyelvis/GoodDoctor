import { db } from './firebase-init.js';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from './firebase-init.js';

const appointmentsList = document.getElementById('doctor-appointments-list');

async function fetchAppointments() {
    const q = query(collection(db, 'appointments'), where('doctor', '==', 'dr_smith'), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((docSnapshot) => {
        const appointment = docSnapshot.data();
        const listItem = document.createElement('li');
        listItem.textContent = ;

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        confirmButton.addEventListener('click', async () => {
            await updateDoc(doc(db, 'appointments', docSnapshot.id), { status: 'confirmed' });
            alert('Appointment confirmed!');
        });

        listItem.appendChild(confirmButton);
        appointmentsList.appendChild(listItem);
    });
}

fetchAppointments();
