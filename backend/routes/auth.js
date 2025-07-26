const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(query, [email, hashed], (err, result) => {
    if (err) {
      console.error('Register Error:', err);
      return res.status(500).json({ message: 'User already exists or DB error' });
    }
    res.json({ message: 'User registered' });
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
