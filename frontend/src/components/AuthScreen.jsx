import { useState } from 'react';
import { supabase } from '../supabase';
import { CalendarLogo } from './Illustrations';

// ---------------------------------------------------------------------------
// Google Logo Icon
// ---------------------------------------------------------------------------
function IconGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

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
  const [googleLoading, setGoogleLoading] = useState(false);

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
    setInfo(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setGoogleLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setInfo(null);
    setGoogleLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (authError) {
        setError(getAuthErrorMessage(authError));
        setGoogleLoading(false);
      }
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setGoogleLoading(false);
    }
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

  const isAnyLoading = loading || googleLoading;

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade">
        {/* Brand */}
        <div className="auth-brand">
          <CalendarLogo size={42} />
          <span className="auth-brand-name">Habito</span>
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

        {/* Google OAuth Button */}
        <button
          type="button"
          id="auth-google-btn"
          className="auth-google-btn"
          onClick={handleGoogleSignIn}
          disabled={isAnyLoading}
        >
          <IconGoogle />
          <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>

        {/* Divider */}
        <div className="auth-divider" aria-hidden="true">
          <span>OR</span>
        </div>

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
              disabled={isAnyLoading}
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
              disabled={isAnyLoading}
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
                disabled={isAnyLoading}
                required
              />
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="btn-accent-pill auth-submit-btn"
            disabled={isAnyLoading}
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
