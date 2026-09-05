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
  const result = await db.query('SELECT * FROM habits;');
  res.json(result.rows);
});


// Create a habit
app.post('/api/habits', async (req, res) => {
  const result = await db.query(
    'INSERT INTO habits (name, emoji) VALUES ($1, $2) RETURNING *;',
    [req.body.name, req.body.emoji]
  );

  res.json(result.rows);
});


// Update a habit
app.patch('/api/habits/:id', async (req, res) => {
  const result = await db.query(
    'UPDATE habits SET name = $1, emoji = $2 WHERE id = $3 RETURNING *',
    [req.body.name, req.body.emoji, req.params.id]
  );

  res.json(result.rows);
});


// Delete a habit
app.delete('/api/habits/:id', async (req, res) => {
  const result = await db.query(
    'DELETE FROM habits WHERE id = $1 RETURNING *',
    [req.params.id]
  );

  res.json(result.rows);
});


// Mark a habit as completed
app.post('/api/habits/:id/completions', async (req, res) => {
  const result = await db.query(
    `INSERT INTO habit_completions
     (habit_id, completed_date)
     VALUES ($1, $2)
     RETURNING *`,
    [req.params.id, req.body.date]
  );

  res.json(result.rows);
});


// Get all completion dates for a habit
app.get('/api/habits/:id/completions', async (req, res) => {
  const result = await db.query(
    `SELECT completed_date
     FROM habit_completions
     WHERE habit_id = $1
     ORDER BY completed_date`,
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
     RETURNING *`,
    [req.params.id, req.params.date]
  );

  res.json(result.rows);
});


// Get habit statistics
app.get('/api/habits/:id/stats', async (req, res) => {
  const result = await db.query(
    `SELECT completed_date
     FROM habit_completions
     WHERE habit_id = $1
     ORDER BY completed_date`,
    [req.params.id]
  );

  // Convert PostgreSQL dates to YYYY-MM-DD strings
  const dates = result.rows.map(row => {
    return row.completed_date.toISOString().split('T')[0];
  });

  let bestStreak = 0;
  let currentStreak = 0;

  // Helper function to convert YYYY-MM-DD
  // into a UTC timestamp without timezone issues
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

  res.json({
    totalCompleted: dates.length,
    currentStreak,
    bestStreak
  });
});


// Start server
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});