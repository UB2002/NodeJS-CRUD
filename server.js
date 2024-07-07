require('dotenv').config(); // Add this line at the top

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./EmployeModel');

const app = express();
const uri = 'mongodb+srv://udaybhaskarmathangi:mX0W7b1UMwwUP6Ph@ub2002.carusdb.mongodb.net/Node-API?retryWrites=true&w=majority';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS for the frontend domain
app.use(cors({
  origin: 'https://mern-crud-1gszcwfcm-ub2002s-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin');
});

app.get('/get', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/post', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).json({ message: `Cannot find any employee with ID ${id}` });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

mongoose.set("strictQuery", false);
mongoose.connect(uri)
.then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
