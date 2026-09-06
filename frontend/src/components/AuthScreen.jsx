import { useState } from 'react';
import { supabase } from '../supabase';
import { IllustrationLogo } from './Illustrations';

// ---------------------------------------------------------------------------
// Friendly, user-readable error messages for common Supabase auth errors
// ---------------------------------------------------------------------------
function getAuthErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.';

  const msg = error.message?.toLowerCase() ?? '';

  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Incorrect email or password. Please check your details and try again.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please confirm your email address before signing in. Check your inbox for a confirmation link.';
  }
  if (msg.includes('user already registered') || msg.includes('already been registered')) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (msg.includes('password should be at least') || msg.includes('weak password') || msg.includes('password is too short')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (msg.includes('unable to validate email') || msg.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (msg.includes('signup is disabled') || msg.includes('signups not allowed')) {
    return 'New sign-ups are currently disabled. Please contact support.';
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('failed to fetch')) {
    return 'Network error. Please check your connection and try again.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  // Fallback — return Supabase message but strip internal jargon
  return error.message ?? 'Something went wrong. Please try again.';
}

// ---------------------------------------------------------------------------
// AuthScreen — Login & Signup forms
// ---------------------------------------------------------------------------
export default function AuthScreen() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null); // for "check your email" message
  const [loading, setLoading] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
    setInfo(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    // --- Client-side validation ---
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (mode === 'signup') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please re-enter them.');
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (authError) {
          setError(getAuthErrorMessage(authError));
        }
        // On success, onAuthStateChange fires → useAuth updates → App re-renders
      } else {
        // Signup
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (authError) {
          setError(getAuthErrorMessage(authError));
          return;
        }

        // Supabase may require email confirmation before session is active
        if (data.session) {
          // Already logged in — useAuth will catch the state change
        } else {
          // Email confirmation required
          setInfo(
            'Account created. Please check your inbox and click the confirmation link to activate your account.'
          );
          // Clear sensitive fields
          setPassword('');
          setConfirmPassword('');
        }
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade">
        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-logo-frame">
            <IllustrationLogo />
          </div>
          <span className="auth-brand-name">Habit Tracker</span>
        </div>

        {/* Heading */}
        <div className="auth-heading-group">
          <h1 className="auth-title">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="auth-subtitle">
            {mode === 'login'
              ? 'Sign in to view your habits and progress.'
              : 'Start building consistent daily habits.'}
          </p>
        </div>

        {/* Info banner (e.g. email confirmation) */}
        {info && (
          <div className="auth-info-banner" role="status">
            {info}
          </div>
        )}

        {/* Error banner */}
        {error && (
          <div className="auth-error-banner" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label className="input-label" htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              className="soft-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete={mode === 'login' ? 'email' : 'username'}
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              className="soft-input"
              placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              disabled={loading}
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="input-group">
              <label className="input-label" htmlFor="auth-confirm-password">
                Confirm password
              </label>
              <input
                id="auth-confirm-password"
                type="password"
                className="soft-input"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                required
              />
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn-accent-pill auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? mode === 'login'
                ? 'Signing in...'
                : 'Creating account...'
              : mode === 'login'
              ? 'Sign in'
              : 'Create account'}
          </button>
        </form>

        {/* Mode switcher */}
        <div className="auth-switch">
          {mode === 'login' ? (
            <>
              <span className="auth-switch-text">Don't have an account?</span>
              <button
                type="button"
                id="auth-switch-to-signup"
                className="auth-switch-btn"
                onClick={() => switchMode('signup')}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <span className="auth-switch-text">Already have an account?</span>
              <button
                type="button"
                id="auth-switch-to-login"
                className="auth-switch-btn"
                onClick={() => switchMode('login')}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
