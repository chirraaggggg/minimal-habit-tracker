import { useEffect, useCallback, useState } from 'react';

// Auth & Theme
import { useAuth } from './hooks/useAuth';
import { useTheme } from './hooks/useTheme';

// Header & Layout Views
import Header from './components/Header';
import HabitList from './components/HabitList';
import StatsGrid from './components/StatsGrid';
import ManageView from './components/ManageView';

// Modals & Auth
import HabitModal from './components/HabitModal';
import ConfirmModal from './components/ConfirmModal';
import AuthScreen from './components/AuthScreen';

// API
import {
  fetchHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  addCompletion,
  removeCompletion,
  fetchHabitStats,
} from './utils/api';
import { today } from './utils/dates';

import './App.css';

export default function App() {
  const { session, user, authLoading, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  // Navigation Tabs: 'calendar' | 'statistics' | 'manage'
  const [activeTab, setActiveTab] = useState('calendar');

  // Full View Heatmap Toggle (true = 52 weeks, false = 18 weeks)
  const [isFullView, setIsFullView] = useState(true);


  // Habit State
  const [habits, setHabits] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [completionsMap, setCompletionsMap] = useState({});
  const [statsMap, setStatsMap] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingDates, setPendingDates] = useState(new Set());

  // ── Stats Refresh ──────────────────────────────────────────────────────────
  const refreshStats = useCallback(async (id) => {
    if (!id) return;
    try {
      const data = await fetchHabitStats(id);
      setStatsMap((prev) => ({ ...prev, [id]: data }));
    } catch (err) {
      console.warn('Stats fetch warning:', err.message);
    }
  }, []);

  const loadAllStats = useCallback(async (habitList) => {
    if (!habitList || habitList.length === 0) return;
    const entries = await Promise.all(
      habitList.map(async (h) => {
        const s = await fetchHabitStats(h.id).catch(() => ({
          totalCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
          completionRate: 0,
        }));
        return [h.id, s];
      })
    );
    setStatsMap(Object.fromEntries(entries));
  }, []);

  // ── Toggle Completion ──────────────────────────────────────────────────────
  const handleToggleCell = useCallback(async (habitId, dateStr, currentlyDone) => {
    const key = `${dateStr}-${habitId}`;
    if (pendingDates.has(key)) return;

    setPendingDates((prev) => new Set(prev).add(key));

    setCompletionsMap((prev) => {
      const current = prev[habitId] || [];
      const updated = currentlyDone
        ? current.filter((d) => d !== dateStr)
        : [...current, dateStr];
      return { ...prev, [habitId]: updated };
    });

    try {
      if (currentlyDone) {
        await removeCompletion(habitId, dateStr);
      } else {
        await addCompletion(habitId, dateStr);
      }
      refreshStats(habitId);
    } catch (err) {
      console.warn('Toggle save fallback:', err.message);
    } finally {
      setPendingDates((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  }, [pendingDates, refreshStats]);

  const handleToggleToday = useCallback((habitId, dateStr, isCompleted) => {
    handleToggleCell(habitId, dateStr, isCompleted);
  }, [handleToggleCell]);

  // ── Keyboard Shortcuts (N = New Habit, 1-5 = Toggle Habit) ─────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (form || deleteTarget) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setForm({ mode: 'add' });
      }

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (habits[idx]) {
          e.preventDefault();
          const targetHabit = habits[idx];
          const todayStr = today();
          const list = completionsMap[targetHabit.id] || [];
          const isDone = list.includes(todayStr);
          handleToggleToday(targetHabit.id, todayStr, isDone);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [habits, completionsMap, form, deleteTarget, handleToggleToday]);

  // ── Load Habits ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setDataLoading(true);
      setError(null);
      try {
        const list = await fetchHabits();
        if (cancelled) return;
        setHabits(list);

        if (list.length > 0) {
          setSelectedId((prev) => (prev && list.some((h) => h.id === prev) ? prev : list[0].id));
          loadAllStats(list);
        } else {
          setSelectedId(null);
          setCompletionsMap({});
          setStatsMap({});
        }
      } catch (err) {
        if (!cancelled) console.warn('Load fallback:', err.message);
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, [loadAllStats]);

  // ── Habit CRUD ─────────────────────────────────────────────────────────────
  const handleCreateHabit = async (name, emoji) => {
    try {
      const createdList = await createHabit(name, emoji);
      const created = createdList[0];
      setHabits((prev) => [created, ...prev]);
      setCompletionsMap((prev) => ({ ...prev, [created.id]: [] }));
      setSelectedId(created.id);
      refreshStats(created.id);
      setForm(null);
    } catch (err) {
      console.error('Create error:', err.message);
    }
  };

  const handleUpdateHabit = async (id, name, emoji) => {
    try {
      const updatedList = await updateHabit(id, name, emoji);
      const updated = updatedList[0];
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updated } : h)));
      setForm(null);
    } catch (err) {
      console.error('Update error:', err.message);
    }
  };

  const handleDeleteHabit = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
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
      console.error('Delete error:', err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleExport = () => {
    const data = {
      habits,
      completionsMap,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `streak-engine-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);
        if (json.habits && Array.isArray(json.habits)) {
          setHabits(json.habits);
          if (json.completionsMap) setCompletionsMap(json.completionsMap);
          alert('Habits imported successfully!');
        }
      } catch (err) {
        alert(`Failed to import file: ${err.message}`);
      }
    };
    input.click();
  };

  // ── Auth Gates ─────────────────────────────────────────────────────────────
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

  return (
    <div className="app-shell">
      {/* Top Navigation Bar (No Sidebar) */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddHabit={() => setForm({ mode: 'add' })}
        onExport={handleExport}
        onImport={handleImport}
        theme={theme}
        onToggleTheme={toggleTheme}
        user={user}
        onSignOut={signOut}
      />

      {/* Main Content Dashboard */}
      <main className="main-content-developer">
        {error && (
          <div className="retro-error-banner" role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Sub-Header Controls Row: Right-Aligned Full View Toggle */}
        {activeTab === 'calendar' && (
          <div className="sub-header-controls-row">
            <div className="full-view-toggle-wrap">
              <span>Full View</span>
              <button
                type="button"
                className={`toggle-switch-violet ${isFullView ? 'on' : ''}`}
                onClick={() => setIsFullView((prev) => !prev)}
                aria-label="Toggle full 52-week view"
                aria-pressed={isFullView}
              >
                <span className="toggle-switch-knob" />
              </button>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {dataLoading ? (
          <div className="loading-state-card">
            <div className="auth-init-spinner" aria-label="Loading habits" />
            <p>Loading habit data...</p>
          </div>
        ) : (
          <>
            {/* View Switcher: Calendar | Statistics | Manage */}
            {activeTab === 'calendar' && (
              <HabitList
                habits={habits}
                selectedId={selectedId}
                completionsMap={completionsMap}
                statsMap={statsMap}
                onSelect={setSelectedId}
                onEdit={(habit) => setForm({ mode: 'edit', habit })}
                onDelete={(habit) => setDeleteTarget(habit)}
                onAdd={(presetName, presetEmoji) =>
                  setForm(
                    presetName
                      ? { mode: 'add', habit: { name: presetName, emoji: presetEmoji } }
                      : { mode: 'add' }
                  )
                }
                onToggleCell={handleToggleCell}
                pendingDates={pendingDates}
                isFullView={isFullView}
                onToggleToday={handleToggleToday}
              />
            )}

            {activeTab === 'statistics' && (
              <StatsGrid
                habits={habits}
                statsMap={statsMap}
                completionsMap={completionsMap}
              />
            )}

            {activeTab === 'manage' && (
              <ManageView
                habits={habits}
                onAdd={() => setForm({ mode: 'add' })}
                onEdit={(habit) => setForm({ mode: 'edit', habit })}
                onDelete={(habit) => setDeleteTarget(habit)}
                onReorder={setHabits}
              />
            )}
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