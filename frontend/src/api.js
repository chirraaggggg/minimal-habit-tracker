import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getFullUrl(url) {
  const base = API_URL.replace(/\/+$/, '');
  const path = url.startsWith('/') ? url : `/${url}`;
  if (base.endsWith('/api') && path.startsWith('/api')) {
    return `${base}${path.slice(4)}`;
  }
  if (!base.endsWith('/api') && !path.startsWith('/api')) {
    return `${base}/api${path}`;
  }
  return `${base}${path}`;
}

/**
 * Reusable request helper that automatically attaches the current Supabase session's access token
 * to every Express API request via the Authorization header.
 */
async function request(url, options = {}) {
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error(`Authentication error: ${sessionError.message}`);
  }

  const session = data?.session;
  const token = session?.access_token;

  if (!token) {
    throw new Error('Authentication required. Please sign in.');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };

  const fullUrl = getFullUrl(url);

  const res = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage;
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.error || errorJson.message;
    } catch {
      errorMessage = await res.text();
    }
    throw new Error(errorMessage || `Request failed with status ${res.status}`);
  }

  return res.json();
}

// Habits API
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

// Completions API
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

// Stats API
export async function fetchHabitStats(habitId) {
  return request(`/habits/${habitId}/stats`);
}
