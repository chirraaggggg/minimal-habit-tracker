import { useEffect, useMemo, useRef, useState } from 'react';

// Auth & theme
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

// New layout components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCards from './components/StatCards';
import HeroBanner from './components/HeroBanner';
import HabitList from './components/HabitList';
import TodayPanel from './components/TodayPanel';
import ProgressCard from './components/ProgressCard';
import BottomAnalytics from './components/BottomAnalytics';
import HabitGraph from './components/HabitGraph';

// Modals (preserved)
import HabitModal from './components/HabitModal';
import ConfirmModal from './components/ConfirmModal';
import AuthScreen from './components/AuthScreen';
import { IllustrationEmptyState } from './components/Illustrations';

// API
import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  fetchCompletions,
  addCompletion,
  removeCompletion,
  fetchHabitStats,
} from './utils/api';
import { getLastYearDates, groupByWeek, toLocalDateStr, today } from './utils/dates';

import './App.css';

export default function App() {
  // ── Auth ───────────────────────────────────────────────────────────────────
  const { session, user, authLoading, signOut } = useAuth();

  // ── Theme ──────────────────────────────────────────────────────────────────
  const { theme, toggleTheme } = useTheme();

  // ── Navigation (visual only — no routing needed) ───────────────────────────
  const [activeNav, setActiveNav] = useState('home');

  // ── Habit state ────────────────────────────────────────────────────────────
  const [habits, setHabits] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [completionsMap, setCompletionsMap] = useState({});
  const [statsMap, setStatsMap] = useState({});
  const [statsLoading, setStatsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [habitLoading, setHabitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingDates, setPendingDates] = useState(new Set());

  const habitFetchSeqRef = useRef(0);

  // ── Derived state ──────────────────────────────────────────────────────────
  const weeks = useMemo(() => groupByWeek(getLastYearDates()), []);

  const selectedHabit = habits.find((h) => h.id === selectedId) || null;
  const selectedHabitIndex = habits.findIndex((h) => h.id === selectedId);
  const selectedColorIndex = selectedHabitIndex >= 0 ? selectedHabitIndex % 6 : 0;

  const selectedCompletions = useMemo(
    () => completionsMap[selectedId] || [],
    [completionsMap, selectedId]
  );

  const counts = useMemo(() => {
    const map = {};
    for (const [id, dates] of Object.entries(completionsMap)) {
      map[id] = new Set(dates).size;
    }
    return map;
  }, [completionsMap]);

  const selectedStats = statsMap[selectedId] || null;

  const totalCompletionsAcrossAll = useMemo(
    () => Object.values(counts).reduce((acc, c) => acc + c, 0),
    [counts]
  );

  // ── Stats helpers ──────────────────────────────────────────────────────────
  const refreshStats = async (id) => {
    if (!id) return;
    setStatsLoading(true);
    try {
      const data = await fetchHabitStats(id);
      setStatsMap((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
      console.error('Failed to fetch stats:', err.message);
    } finally {
      setStatsLoading(false);
    }
  };

  // ── Initial data load ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError(null);
      try {
        const fetchedList = await fetchHabits();
        if (cancelled) return;
        let list = fetchedList;
        if (list.length === 0) {
          const defaults = [
            { name: 'Gym', emoji: 'Gym' },
            { name: 'Reading', emoji: 'Reading' },
            { name: 'Coding', emoji: 'Coding' },
            { name: 'Meditate', emoji: 'Meditate' },
            { name: 'Drink Water', emoji: 'Drink Water' },
            { name: 'No Social Media', emoji: 'No Social Media' },
          ];
          const created = [];
          for (const d of defaults) {
            try {
              const [h] = await createHabit(d.name, d.emoji);
              if (h) created.push(h);
            } catch (e) {
              console.error('Error creating default habit:', e);
            }
          }
          if (created.length > 0) list = created;
        }

        setHabits(list);

        if (list.length === 0) {
          setSelectedId(null);
          setCompletionsMap({});
          return;
        }

        const initialId = list[0].id;
        setSelectedId(initialId);

        const [completionLists, statsLists] = await Promise.all([
          Promise.all(list.map((h) => fetchCompletions(h.id).catch(() => []))),
          Promise.all(list.map((h) => fetchHabitStats(h.id).catch(() => null))),
        ]);
        if (cancelled) return;

        const cMap = {};
        const sMap = {};
        list.forEach((h, i) => {
          cMap[h.id] = (completionLists[i] || [])
            .map((row) => toLocalDateStr(row))
            .filter(Boolean);
          sMap[h.id] = statsLists[i] || { totalCompleted: 0, currentStreak: 0, bestStreak: 0, completionRate: 0 };
        });
        setCompletionsMap(cMap);
        setStatsMap(sMap);
      } catch (err) {
        if (!cancelled) setError(`Failed to load habit data: ${err.message}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [session]);

  // ── Habit selection ────────────────────────────────────────────────────────
  const handleSelectHabit = async (id) => {
    if (id === selectedId) return;
    setError(null);
    setSelectedId(id);
    refreshStats(id);

    const currentSeq = ++habitFetchSeqRef.current;
    if (!completionsMap[id]) {
      setHabitLoading(true);
      try {
        const rows = await fetchCompletions(id);
        if (currentSeq !== habitFetchSeqRef.current) return;
        const dates = rows.map((r) => toLocalDateStr(r)).filter(Boolean);
        setCompletionsMap((prev) => ({ ...prev, [id]: dates }));
      } catch (err) {
        if (currentSeq === habitFetchSeqRef.current) {
          setError(`Failed to fetch habit completions: ${err.message}`);
        }
      } finally {
        if (currentSeq === habitFetchSeqRef.current) setHabitLoading(false);
      }
    }
  };

  // ── Unified Toggle Cell Completion ───────────────────────────────────────────
  const handleToggleCell = async (habitId, dateStr, isCompleted) => {
    if (!habitId || !dateStr) return;
    const pendingKey = `${dateStr}-${habitId}`;
    if (pendingDates.has(pendingKey) || pendingDates.has(dateStr)) return;

    setPendingDates((prev) => new Set(prev).add(pendingKey));
    setError(null);

    try {
      if (isCompleted) {
        await removeCompletion(habitId, dateStr);
        setCompletionsMap((prevMap) => ({
          ...prevMap,
          [habitId]: (prevMap[habitId] || []).filter((d) => d !== dateStr),
        }));
      } else {
        await addCompletion(habitId, dateStr);
        setCompletionsMap((prevMap) => {
          const current = prevMap[habitId] || [];
          if (current.includes(dateStr)) return prevMap;
          return { ...prevMap, [habitId]: [...current, dateStr] };
        });
      }
      refreshStats(habitId);
    } catch (err) {
      console.error('Failed to toggle completion:', err);
      setError("Couldn't update this day. Please try again.");
    } finally {
      setPendingDates((prev) => {
        const next = new Set(prev);
        next.delete(pendingKey);
        next.delete(dateStr);
        return next;
      });
    }
  };

  // ── Legacy alias handlers ──────────────────────────────────────────────────
  const handleToggleDay = (dateStr, isCompleted) => {
    if (selectedId) handleToggleCell(selectedId, dateStr, isCompleted);
  };

  const handleToggleToday = (habitId, dateStr, isCompleted) => {
    handleToggleCell(habitId, dateStr, isCompleted);
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const handleCreateHabit = async (name, emoji) => {
    const [habit] = await createHabit(name, emoji);
    setHabits((prev) => [...prev, habit]);
    setCompletionsMap((prev) => ({ ...prev, [habit.id]: [] }));
    setStatsMap((prev) => ({
      ...prev,
      [habit.id]: { totalCompleted: 0, currentStreak: 0, bestStreak: 0, completionRate: 0 },
    }));
    setSelectedId(habit.id);
    setForm(null);
  };

  const handleUpdateHabit = async (id, name, emoji) => {
    const [updated] = await updateHabit(id, name, emoji);
    setHabits((prev) => prev.map((h) => (h.id === id ? updated : h)));
    setForm(null);
  };

  const handleDeleteHabit = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteHabit(deleteTarget.id);
      const remaining = habits.filter((h) => h.id !== deleteTarget.id);
      setHabits(remaining);
      setCompletionsMap((prev) => {
        const next = { ...prev };
        delete next[deleteTarget.id];
        return next;
      });
      setStatsMap((prev) => {
        const next = { ...prev };
        delete next[deleteTarget.id];
        return next;
      });
      if (selectedId === deleteTarget.id) {
        setSelectedId(remaining.length > 0 ? remaining[0].id : null);
      }
      setDeleteTarget(null);
    } catch (err) {
      setError(`Could not delete habit: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  // ── Auth gates ─────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="auth-init-loader">
        <div className="auth-init-spinner" aria-label="Loading" />
      </div>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  // ── Main app ───────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* Main content */}
      <main className="main-content" id="main-content">
        {/* Header */}
        <Header
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          onSignOut={signOut}
          onAddHabit={() => setForm({ mode: 'add' })}
        />

        {/* Error banner */}
        {error && (
          <div className="retro-error-banner" role="alert">
            <span>{error}</span>
            <button
              type="button"
              className="close-banner-btn"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="loading-state-card">
            <div className="auth-init-spinner" aria-label="Loading habits" />
            <p>Loading your habits...</p>
          </div>
        ) : (
          <>
            {/* Two-column: My Habits + Today panel */}
            <div className="habits-today-grid">
              {/* Left: habit list */}
              <HabitList
                habits={habits}
                selectedId={selectedId}
                counts={counts}
                completionsMap={completionsMap}
                statsMap={statsMap}
                onSelect={handleSelectHabit}
                onEdit={(habit) => setForm({ mode: 'edit', habit })}
                onDelete={(habit) => setDeleteTarget(habit)}
                onAdd={() => setForm({ mode: 'add' })}
                onToggleCell={handleToggleCell}
                pendingDates={pendingDates}
              />

              {/* Right: Today panel + progress card */}
              <div className="right-column">
                <TodayPanel
                  habits={habits}
                  completionsMap={completionsMap}
                  pendingDates={pendingDates}
                  onToggleToday={handleToggleToday}
                />
                <ProgressCard />
              </div>
            </div>

            {/* Bottom analytics */}
            <BottomAnalytics stats={selectedStats} loading={statsLoading} />
          </>
        )}
      </main>

      {/* Add / Edit Habit Modal */}
      {form && (
        <HabitModal
          key={form.mode === 'edit' ? form.habit.id : 'new'}
          initial={form.mode === 'edit' ? form.habit : null}
          onSubmit={
            form.mode === 'edit'
              ? (name, emoji) => handleUpdateHabit(form.habit.id, name, emoji)
              : handleCreateHabit
          }
          onCancel={() => setForm(null)}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <ConfirmModal
          habit={deleteTarget}
          busy={deleting}
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDeleteHabit}
        />
      )}
    </div>
  );
}