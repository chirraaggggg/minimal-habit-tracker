/**
 * Format a Date object as YYYY-MM-DD using local time (no UTC shift).
 */
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Parse a YYYY-MM-DD string into a Date object at local midnight.
 */
export function parseDate(str) {
  if (!str || typeof str !== 'string') return new Date();
  const parts = str.split('-').map(Number);
  if (parts.length < 3) return new Date();
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
}

/**
 * Normalize a completion date from the API into YYYY-MM-DD.
 * CRITICAL FIX: Extract YYYY-MM-DD string directly via regex to prevent
 * timezone shift when new Date('2026-08-29T00:00:00.000Z') is parsed in
 * timezones behind UTC.
 */
export function toLocalDateStr(value) {
  if (!value) return '';
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
  }
  if (value instanceof Date) {
    return formatDate(value);
  }
  return String(value).slice(0, 10);
}

/**
 * Get today's date as YYYY-MM-DD in local time.
 */
export function today() {
  return formatDate(new Date());
}

/**
 * Format date string (YYYY-MM-DD) into display string like "August 29, 2026"
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const date = parseDate(dateStr);
  const monthStr = date.toLocaleString('en-US', { month: 'long' });
  const dayStr = date.getDate();
  const yearStr = date.getFullYear();
  return `${monthStr} ${dayStr}, ${yearStr}`;
}

/**
 * Generate a 365-day Monday-first calendar grid.
 * Exactly 365 dates ending on TODAY (today - 364 through today).
 * Monday-first: Row 0=MON, Row 1=TUE, Row 2=WED, Row 3=THU, Row 4=FRI, Row 5=SAT, Row 6=SUN.
 */
export function get365DayCalendarGrid() {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 364);

  const dates = [];
  const curr = new Date(startDate);

  while (curr <= endDate) {
    const dateStr = formatDate(curr);
    // Monday-first weekday index (0 = Mon, 5 = Sat, 6 = Sun)
    const dayOfWeek = (curr.getDay() + 6) % 7;
    const month = curr.getMonth();
    const year = curr.getFullYear();

    dates.push({
      date: dateStr,
      dayOfWeek,
      month,
      year,
      isBlank: false,
    });

    curr.setDate(curr.getDate() + 1);
  }

  // Group into 7-row Week Columns (Monday to Sunday)
  const weeks = [];
  let currentWeek = [];

  // Pad first week with leading blank cells if start date is not Monday
  const firstDayOfWeek = dates[0].dayOfWeek;
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({ isBlank: true, dayOfWeek: i });
  }

  dates.forEach((cell) => {
    currentWeek.push(cell);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Pad last week with trailing blank cells if last week is incomplete
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ isBlank: true, dayOfWeek: currentWeek.length });
    }
    weeks.push(currentWeek);
  }

  // Extract Month Header positions (colIndex -> Month Label)
  const monthLabels = [];
  let lastMonth = -1;
  let lastColIndex = -3;

  weeks.forEach((week, colIndex) => {
    const firstRealCell = week.find((c) => !c.isBlank);
    if (firstRealCell) {
      const month = firstRealCell.month;
      if (month !== lastMonth && colIndex - lastColIndex >= 2) {
        const dateObj = parseDate(firstRealCell.date);
        const label = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
        monthLabels.push({
          colIndex,
          label,
        });
        lastMonth = month;
        lastColIndex = colIndex;
      }
    }
  });

  return { weeks, monthLabels, totalDays: dates.length };
}

/**
 * Generate an array of Date objects spanning the last ~365 days (inclusive of today).
 */
export function getLastYearDates() {
  const dates = [];
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - 364);

  const dayOfWeek = start.getDay();
  start.setDate(start.getDate() - dayOfWeek);

  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Group dates by week (each week = array of up to 7 days, Sun-Sat).
 */
export function groupByWeek(dates) {
  const weeks = [];
  let currentWeek = [];

  dates.forEach((date) => {
    currentWeek.push(date);
    if (date.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}
