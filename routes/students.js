const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const requireAuth = require('../middleware/auth');

router.get('/:id', requireAuth, async (req, res) => {
    try {
        const stats = await Student.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: '$age',
                    totalStudents: { $sum: 1}
                }
            },
            {
                $sort: { totalStudents: -1}
            }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find()
            .populate('user', 'name email -_id')
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4.3 POST /students (Create a New Record)`
router.post('/', async (req, res) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4.4 PUT /students/:id (Update an Existing Record)
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4.5 DELETE /students/:id (Remove a Record)
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {``
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;