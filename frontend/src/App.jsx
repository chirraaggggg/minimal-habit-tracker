import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HabitList from './components/HabitList';
import HabitHero from './components/HabitHero';
import HabitGraph from './components/HabitGraph';
import StatsGrid from './components/StatsGrid';
import HabitModal from './components/HabitModal';
import ConfirmModal from './components/ConfirmModal';
import { IllustrationEmptyState } from './components/Illustrations';

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
import { getLastYearDates, groupByWeek, toLocalDateStr } from './utils/dates';

import './App.css';

export default function App() {
  const [habits, setHabits] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [completionsMap, setCompletionsMap] = useState({}); // habitId -> [YYYY-MM-DD]
  const [statsMap, setStatsMap] = useState({}); // habitId -> { totalCompleted, currentStreak, bestStreak, completionRate }
  const [statsLoading, setStatsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [habitLoading, setHabitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(null); // null | { mode: 'add' } | { mode: 'edit', habit }
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingDates, setPendingDates] = useState(new Set()); // Set of YYYY-MM-DD date strings currently updating

  const habitFetchSeqRef = useRef(0);

  // Group last ~365 days into Sunday-aligned week columns
  const weeks = useMemo(() => groupByWeek(getLastYearDates()), []);

  const selectedHabit = habits.find((h) => h.id === selectedId) || null;
  const selectedCompletions = useMemo(
    () => completionsMap[selectedId] || [],
    [completionsMap, selectedId]
  );

  // Unique completed days count per habit
  const counts = useMemo(() => {
    const map = {};
    for (const [id, dates] of Object.entries(completionsMap)) {
      map[id] = new Set(dates).size;
    }
    return map;
  }, [completionsMap]);

  // Stats for the selected habit (from API)
  const selectedStats = statsMap[selectedId] || null;

  // Fetch and cache stats for a given habit id
  const refreshStats = async (id) => {
    if (!id) return;
    setStatsLoading(true);
    try {
      const data = await fetchHabitStats(id);
      setStatsMap((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
      // Non-fatal: stats will just be stale; don't overwrite the main error banner
      console.error('Failed to fetch stats:', err.message);
    } finally {
      setStatsLoading(false);
    }
  };

  // Total completions across all habits
  const totalCompletionsAcrossAll = useMemo(() => {
    return Object.values(counts).reduce((acc, c) => acc + c, 0);
  }, [counts]);

  // Initial load: fetch habits & completions
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const habitList = await fetchHabits();
        if (cancelled) return;
        setHabits(habitList);

        if (habitList.length === 0) {
          setSelectedId(null);
          setCompletionsMap({});
          return;
        }

        const initialHabitId = habitList[0].id;
        setSelectedId(initialHabitId);
        refreshStats(initialHabitId);

        const completionLists = await Promise.all(
          habitList.map((h) => fetchCompletions(h.id).catch(() => []))
        );
        if (cancelled) return;

        const map = {};
        habitList.forEach((h, i) => {
          map[h.id] = completionLists[i]
            .map((row) => toLocalDateStr(row.completed_date))
            .filter(Boolean);
        });
        setCompletionsMap(map);
      } catch (err) {
        if (!cancelled) setError(`Failed to load habit data: ${err.message}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Handle habit selection
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
        const dates = rows.map((r) => toLocalDateStr(r.completed_date)).filter(Boolean);
        setCompletionsMap((prev) => ({ ...prev, [id]: dates }));
      } catch (err) {
        if (currentSeq === habitFetchSeqRef.current) {
          setError(`Failed to fetch habit completions: ${err.message}`);
        }
      } finally {
        if (currentSeq === habitFetchSeqRef.current) {
          setHabitLoading(false);
        }
      }
    }
  };

  // Toggle completion for a specific YYYY-MM-DD date
  const handleToggleDay = async (dateStr, isCompleted) => {
    if (!selectedId || !dateStr) return;
    const habitId = selectedId;

    if (pendingDates.has(dateStr)) return;

    setPendingDates((prev) => new Set(prev).add(dateStr));
    setError(null);

    try {
      if (isCompleted) {
        await removeCompletion(habitId, dateStr);
        setCompletionsMap((prevMap) => {
          const currentDates = prevMap[habitId] || [];
          return {
            ...prevMap,
            [habitId]: currentDates.filter((d) => d !== dateStr),
          };
        });
      } else {
        await addCompletion(habitId, dateStr);
        setCompletionsMap((prevMap) => {
          const currentDates = prevMap[habitId] || [];
          if (currentDates.includes(dateStr)) return prevMap;
          return {
            ...prevMap,
            [habitId]: [...currentDates, dateStr],
          };
        });
      }
    } catch (err) {
      setError(
        `Could not ${isCompleted ? 'remove' : 'add'} completion for ${dateStr}: ${err.message}`
      );
    } finally {
      setPendingDates((prev) => {
        const nextSet = new Set(prev);
        nextSet.delete(dateStr);
        return nextSet;
      });
      // Refresh stats from backend after every toggle
      refreshStats(habitId);
    }
  };

  const handleCreateHabit = async (name, emoji) => {
    const [habit] = await createHabit(name, emoji);
    setHabits((prev) => [...prev, habit]);
    setCompletionsMap((prev) => ({ ...prev, [habit.id]: [] }));
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

  return (
    <div className="app-wrapper">
      <div className="app-centered-container">
        {/* Top Navbar */}
        <Navbar onOpenAddModal={() => setForm({ mode: 'add' })} />

        {/* Error Alert Banner */}
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

        {/* Hero Section */}
        <HeroSection totalCompletions={totalCompletionsAcrossAll} />

        {/* Main Flow Content */}
        {loading ? (
          <div className="loading-state-card">
            <p>Loading your habit tracker...</p>
          </div>
        ) : habits.length === 0 ? (
          <div className="empty-state-card">
            <IllustrationEmptyState />
            <h2 className="empty-title">Start your first habit</h2>
            <p className="empty-text">
              Choose something small you'd like to do consistently each day.
            </p>
            <button
              type="button"
              className="btn-accent-pill"
              onClick={() => setForm({ mode: 'add' })}
            >
              + Add Habit
            </button>
          </div>
        ) : (
          <>
            {/* Habits Grid */}
            <HabitList
              habits={habits}
              selectedId={selectedId}
              counts={counts}
              onSelect={handleSelectHabit}
              onEdit={(habit) => setForm({ mode: 'edit', habit })}
              onDelete={(habit) => setDeleteTarget(habit)}
            />

            {/* Selected Habit Section */}
            {selectedHabit && (
              <>
                <HabitHero habit={selectedHabit} />
                <HabitGraph
                  completions={selectedCompletions}
                  weeks={weeks}
                  onToggleDay={handleToggleDay}
                  loading={habitLoading}
                  pendingDates={pendingDates}
                />
                <StatsGrid stats={selectedStats} loading={statsLoading} />
              </>
            )}
          </>
        )}
      </div>

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

      {/* Delete Confirmation Dialog */}
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