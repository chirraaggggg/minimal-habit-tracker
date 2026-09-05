const API_BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Habits
export async function fetchHabits() {
  return request('/habits');
}

export async function createHabit(name, emoji) {
  return request('/habits', {
    method: 'POST',
    body: JSON.stringify({ name, emoji }),
  });
}

export async function updateHabit(id, name, emoji) {
  return request(`/habits/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name, emoji }),
  });
}

export async function deleteHabit(id) {
  return request(`/habits/${id}`, { method: 'DELETE' });
}

// Completions
export async function fetchCompletions(habitId) {
  return request(`/habits/${habitId}/completions`);
}

export async function addCompletion(habitId, date) {
  return request(`/habits/${habitId}/completions`, {
    method: 'POST',
    body: JSON.stringify({ date }),
  });
}

export async function removeCompletion(habitId, date) {
  return request(`/habits/${habitId}/completions/${date}`, {
    method: 'DELETE',
  });
}
