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
  if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
    value = value.completed_date || value.completedDate || value.date || value;
  }
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

const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/**
 * Generate a complete calendar year grid (Jan 1 to Dec 31 of targetYear).
 * Monday-first: Row 0=MON, Row 1=TUE, Row 2=WED, Row 3=THU, Row 4=FRI, Row 5=SAT, Row 6=SUN.
 * Returns weeks (array of 7-cell arrays), monthLabels (all 12 months with colIndex), and totalDays.
 */
export function getCalendarYearGrid(targetYear = new Date().getFullYear()) {
  const startDate = new Date(targetYear, 0, 1, 12, 0, 0);
  const endDate = new Date(targetYear, 11, 31, 12, 0, 0);
  const todayStr = today();

  const dates = [];
  const curr = new Date(startDate);

  while (curr <= endDate) {
    const dateStr = formatDate(curr);
    const dayOfWeek = (curr.getDay() + 6) % 7;
    const month = curr.getMonth();
    const year = curr.getFullYear();

    dates.push({
      date: dateStr,
      dayOfWeek,
      month,
      year,
      isBlank: false,
      isFuture: dateStr > todayStr,
      isToday: dateStr === todayStr,
    });

    curr.setDate(curr.getDate() + 1);
  }

  // Group into 7-row Week Columns (Monday to Sunday)
  const weeks = [];
  let currentWeek = [];

  // Pad first week with leading blank cells if start date (Jan 1) is not Monday
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

  // Pad last week with trailing blank cells if last week (Dec 31) is incomplete
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ isBlank: true, dayOfWeek: currentWeek.length });
    }
    weeks.push(currentWeek);
  }

  // Extract Month Header positions (colIndex -> Month Label) for all 12 months
  const monthLabels = [];
  for (let m = 0; m < 12; m++) {
    const colIndex = weeks.findIndex((w) => w.some((cell) => !cell.isBlank && cell.month === m));
    if (colIndex !== -1) {
      monthLabels.push({
        colIndex,
        label: MONTH_NAMES[m],
      });
    }
  }

  return { weeks, monthLabels, totalDays: dates.length, year: targetYear };
}

/**
 * Backward compatibility wrapper. Returns the complete calendar year grid.
 */
export function get365DayCalendarGrid() {
  return getCalendarYearGrid();
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
