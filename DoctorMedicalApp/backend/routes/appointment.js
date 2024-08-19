const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/auth');

// Create an appointment
router.post('/', authMiddleware, async (req, res) => {
    const { doctor, patient, date, time, notes } = req.body;
    try {
        const appointment = new Appointment({ doctor, patient, date, time, notes });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an appointment status
router.put('/:id', authMiddleware, async (req, res) => {
    const { status } = req.body;
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });
        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
