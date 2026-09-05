const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

app.use(express.json());


// Test database connection
app.get('/api/test-db', async (req, res) => {
  const result = await db.query('SELECT NOW()');

  res.json(result.rows);
});


// Get all habits
app.get('/api/habits', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM habits ORDER BY id;'
  );

  res.json(result.rows);
});


// Create a habit
app.post('/api/habits', async (req, res) => {
  const { name, emoji } = req.body;

  // Validate name
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      error: 'Habit name is required'
    });
  }

  // Validate emoji
  if (!emoji || typeof emoji !== 'string' || !emoji.trim()) {
    return res.status(400).json({
      error: 'Emoji is required'
    });
  }

  const result = await db.query(
    `INSERT INTO habits (name, emoji)
     VALUES ($1, $2)
     RETURNING *;`,
    [name.trim(), emoji.trim()]
  );

  res.status(201).json(result.rows);
});


// Update a habit
app.patch('/api/habits/:id', async (req, res) => {
  const { name, emoji } = req.body;

  // Validate name
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      error: 'Habit name is required'
    });
  }

  // Validate emoji
  if (!emoji || typeof emoji !== 'string' || !emoji.trim()) {
    return res.status(400).json({
      error: 'Emoji is required'
    });
  }

  const result = await db.query(
    `UPDATE habits
     SET name = $1, emoji = $2
     WHERE id = $3
     RETURNING *;`,
    [name.trim(), emoji.trim(), req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  res.json(result.rows);
});


// Delete a habit
app.delete('/api/habits/:id', async (req, res) => {
  const result = await db.query(
    `DELETE FROM habits
     WHERE id = $1
     RETURNING *;`,
    [req.params.id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  res.json(result.rows);
});


// Mark a habit as completed
app.post('/api/habits/:id/completions', async (req, res) => {
  const { date } = req.body;

  // Validate date exists
  if (!date) {
    return res.status(400).json({
      error: 'Completion date is required'
    });
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    return res.status(400).json({
      error: 'Date must be in YYYY-MM-DD format'
    });
  }

  // Check if habit exists
  const habit = await db.query(
    `SELECT id
     FROM habits
     WHERE id = $1;`,
    [req.params.id]
  );

  if (habit.rows.length === 0) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  try {
    const result = await db.query(
      `INSERT INTO habit_completions
       (habit_id, completed_date)
       VALUES ($1, $2)
       RETURNING *;`,
      [req.params.id, date]
    );

    res.status(201).json(result.rows);
  } catch (err) {
    // Duplicate completion
    if (err.code === '23505') {
      return res.status(409).json({
        error: 'Habit is already completed for this date'
      });
    }

    throw err;
  }
});


// Get all completion dates for a habit
app.get('/api/habits/:id/completions', async (req, res) => {
  // Check if habit exists
  const habit = await db.query(
    `SELECT id
     FROM habits
     WHERE id = $1;`,
    [req.params.id]
  );

  if (habit.rows.length === 0) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  const result = await db.query(
    `SELECT completed_date
     FROM habit_completions
     WHERE habit_id = $1
     ORDER BY completed_date;`,
    [req.params.id]
  );

  res.json(result.rows);
});


// Remove a completion
app.delete('/api/habits/:id/completions/:date', async (req, res) => {
  const result = await db.query(
    `DELETE FROM habit_completions
     WHERE habit_id = $1
     AND completed_date = $2
     RETURNING *;`,
    [req.params.id, req.params.date]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: 'Completion not found'
    });
  }

  res.json(result.rows);
});


// Get habit statistics
app.get('/api/habits/:id/stats', async (req, res) => {
  // Get habit creation date
  const habit = await db.query(
    `SELECT created_at
     FROM habits
     WHERE id = $1;`,
    [req.params.id]
  );

  if (habit.rows.length === 0) {
    return res.status(404).json({
      error: 'Habit not found'
    });
  }

  const createdAt = new Date(habit.rows[0].created_at);

  // Get completion dates
  const result = await db.query(
    `SELECT completed_date
     FROM habit_completions
     WHERE habit_id = $1
     ORDER BY completed_date;`,
    [req.params.id]
  );

  const dates = result.rows.map(row => {
    return row.completed_date.toISOString().split('T')[0];
  });

  let bestStreak = 0;
  let currentStreak = 0;


  // Convert YYYY-MM-DD into UTC timestamp
  function dateToUTC(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);

    return Date.UTC(year, month - 1, day);
  }


  // Calculate best streak
  let streak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const previous = dateToUTC(dates[i - 1]);
      const current = dateToUTC(dates[i]);

      const difference =
        (current - previous) / (1000 * 60 * 60 * 24);

      if (difference === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }

    bestStreak = Math.max(bestStreak, streak);
  }


  // Calculate current streak
  if (dates.length > 0) {
    const now = new Date();

    const todayString =
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const today = dateToUTC(todayString);
    const latestDate = dateToUTC(dates[dates.length - 1]);

    const daysFromToday =
      (today - latestDate) / (1000 * 60 * 60 * 24);

    // Current streak must include today or yesterday
    if (daysFromToday === 0 || daysFromToday === 1) {
      currentStreak = 1;

      for (let i = dates.length - 1; i > 0; i--) {
        const current = dateToUTC(dates[i]);
        const previous = dateToUTC(dates[i - 1]);

        const difference =
          (current - previous) / (1000 * 60 * 60 * 24);

        if (difference === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }


  // Calculate completion rate
  const today = new Date();

  const createdDate = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );

  const currentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const daysSinceCreation =
    Math.floor(
      (currentDate - createdDate) / (1000 * 60 * 60 * 24)
    ) + 1;

  const completionRate =
    Math.round((dates.length / daysSinceCreation) * 100);


  res.json({
    totalCompleted: dates.length,
    currentStreak,
    bestStreak,
    completionRate
  });
});


// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: 'Internal server error'
  });
});


// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});