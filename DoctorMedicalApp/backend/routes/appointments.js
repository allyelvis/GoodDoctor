const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Private (Patient)
router.post('/', auth, async (req, res) => {
    const { doctorId, date, time, notes } = req.body;

    try {
        if (req.user.role !== 'patient') {
            return res.status(403).json({ msg: 'Access denied: Only patients can book appointments' });
        }

        const newAppointment = new Appointment({
            doctor: doctorId,
            patient: req.user.id,
            date,
            time,
            notes,
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/appointments
// @desc    Get all appointments for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ : [{ doctor: req.user.id }, { patient: req.user.id }] })
            .populate('doctor', 'name')
            .populate('patient', 'name')
            .sort({ date: -1 });

        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment status
// @access  Private (Doctor)
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;

    try {
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ msg: 'Access denied: Only doctors can update appointments' });
        }

        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }

        if (appointment.doctor.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Access denied: This appointment does not belong to you' });
        }

        appointment.status = status;
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
