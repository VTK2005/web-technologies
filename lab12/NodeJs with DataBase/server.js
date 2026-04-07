const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    id: Number,
    name: String
});

// Model
const Student = mongoose.model('Student', studentSchema);

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// CREATE
app.post('/add', async (req, res) => {
    const student = await Student.create(req.body);
    res.json(student);
});

// READ
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// UPDATE
app.put('/update/:id', async (req, res) => {
    await Student.updateOne(
        { id: req.params.id },
        { $set: { name: req.body.name } }
    );
    res.send('Updated Successfully');
});

// DELETE
app.delete('/delete/:id', async (req, res) => {
    await Student.deleteOne({ id: req.params.id });
    res.send('Deleted Successfully');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
