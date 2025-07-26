const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add a task
router.post('/', (req, res) => {
  const { user_id, title, description, due_date } = req.body;
  const query = 'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, title, description, due_date], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task added', id: result.insertId });
  });
});

// Update task status
router.put('/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task updated' });
  });
});

// Delete task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Task deleted' });
  });
});

module.exports = router;
