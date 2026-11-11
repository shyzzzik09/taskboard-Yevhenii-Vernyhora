const express = require('express');
const pool = require('../db');
const router = express.Router();

const statuses = ['todo', 'in_progress', 'done'];
const priorities = ['low', 'medium', 'high'];

// Sprawdzanie danych zadania
async function sprawdz(dane) {
  const title = typeof dane.title === 'string' ? dane.title.trim() : '';
  const status = dane.status === undefined ? 'todo' : dane.status;
  const priority = dane.priority === undefined ? 'medium' : dane.priority;
  const deadline = dane.deadline || null;
  const assigneeId = dane.assigneeId ?? null;

  if (title.length < 3 || title.length > 100) return 'Nieprawidlowy tytul';
  if (!statuses.includes(status)) return 'Nieprawidlowy status';
  if (!priorities.includes(priority)) return 'Nieprawidlowy priorytet';

  if (deadline !== null) {
    const data = new Date(deadline);
    if (typeof deadline !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
        Number.isNaN(data.getTime()) ||
        data.toISOString().slice(0, 10) !== deadline) {
      return 'Nieprawidlowa data';
    }
  }

  if (!Number.isInteger(dane.boardId) || dane.boardId < 1) {
    return 'Nieprawidlowe boardId';
  }

  const [boards] = await pool.query(
    'SELECT id FROM boards WHERE id = ? AND isDeleted = 0',
    [dane.boardId]
  );
  if (boards.length === 0) return 'Tablica nie istnieje';

  if (assigneeId !== null) {
    if (!Number.isInteger(assigneeId) || assigneeId < 1) {
      return 'Nieprawidlowe assigneeId';
    }
    const [users] = await pool.query(
      'SELECT id FROM users WHERE id = ?', [assigneeId]
    );
    if (users.length === 0) return 'Uzytkownik nie istnieje';
  }

  return null;
}

// Lista zadan tablicy
router.get('/boards/:boardId/tasks', async (req, res, next) => {
  try {
    const [boards] = await pool.query(
      'SELECT id FROM boards WHERE id = ? AND isDeleted = 0',
      [req.params.boardId]
    );
    if (boards.length === 0) return res.sendStatus(404);

    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE boardId = ? AND isDeleted = 0',
      [req.params.boardId]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

// Szczegoly zadania
router.get('/tasks/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND isDeleted = 0',
      [req.params.id]
    );
    if (rows.length === 0) return res.sendStatus(404);
    res.json(rows[0]);
  } catch (err) { next(err); }
});

// Dodawanie zadania
router.post('/tasks', async (req, res, next) => {
  try {
    const blad = await sprawdz(req.body);
    if (blad) return res.status(400).json({ error: blad });

    const d = req.body;
    const [result] = await pool.query(
      `INSERT INTO tasks
       (title, description, status, priority, deadline, boardId, assigneeId)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        d.title.trim(), d.description || null, d.status ?? 'todo',
        d.priority ?? 'medium', d.deadline || null,
        d.boardId, d.assigneeId ?? null
      ]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) { next(err); }
});

// Zmiana zadania
router.put('/tasks/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND isDeleted = 0',
      [req.params.id]
    );
    if (rows.length === 0) return res.sendStatus(404);

    const blad = await sprawdz(req.body);
    if (blad) return res.status(400).json({ error: blad });

    const d = req.body;
    await pool.query(
      `UPDATE tasks SET title = ?, description = ?, status = ?,
       priority = ?, deadline = ?, boardId = ?, assigneeId = ?
       WHERE id = ? AND isDeleted = 0`,
      [
        d.title.trim(), d.description || null, d.status ?? 'todo',
        d.priority ?? 'medium', d.deadline || null,
        d.boardId, d.assigneeId ?? null, req.params.id
      ]
    );
    res.sendStatus(200);
  } catch (err) { next(err); }
});

// Soft delete zadania
router.delete('/tasks/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query(
      `UPDATE tasks SET isDeleted = 1, deletedAt = NOW(), deletedById = 1
       WHERE id = ? AND isDeleted = 0`,
      [req.params.id]
    );
    if (result.affectedRows === 0) return res.sendStatus(404);
    res.status(204).end();
  } catch (err) { next(err); }
});

module.exports = router;