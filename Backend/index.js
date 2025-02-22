require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Get all cars
app.get('/cars', (req, res) => {
    db.query('SELECT * FROM cars', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Add a user
app.post('/users', (req, res) => {
    const { username, gmail, profile, password } = req.body;
    const sql = 'INSERT INTO users (username, gmail, profile, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, gmail, profile, password], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'User added', id: result.insertId });
    });
});

// Add a car
app.post('/cars', (req, res) => {
    const { car, image, owner, prize, contact, ownerEmail } = req.body;
    const sql = 'INSERT INTO cars (car, image, owner, prize, contact, ownerEmail) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [car, image, owner, prize, contact, ownerEmail], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Car added', id: result.insertId });
    });
});

// Start the server
const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
