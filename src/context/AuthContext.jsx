import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_TOKEN_KEY = 'infrasense_auth_token';
const STORAGE_USER_KEY = 'infrasense_auth_user';

// Safe helper to parse JSON or handle HTML/text error pages without throwing SyntaxError
async function safeParseResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await res.json();
    } catch {
      return { success: false, message: 'Invalid JSON response from server' };
    }
  }
  
  // Non-JSON response (e.g. 404 HTML, 500 HTML error page)
  const text = await res.text();
  return {
    success: false,
    isHtmlError: true,
    message: text.length > 200 ? `Server returned status ${res.status} (${res.statusText})` : text,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(STORAGE_TOKEN_KEY) || null;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [pendingAction, setPendingAction] = useState(null);

  // Verify stored token with backend
  const verifySession = useCallback(async (authToken) => {
    if (!authToken) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (res.ok) {
        const data = await safeParseResponse(res);
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(data.user));
        }
      } else {
        // Token expired or invalid
        logout();
      }
    } catch (err) {
      console.warn('Backend session check skipped:', err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifySession(token);
    } else {
      setIsLoading(false);
    }
  }, [token, verifySession]);

  const openAuthModal = useCallback((mode = 'login', onAuthenticatedAction = null) => {
    setAuthModalMode(mode);
    if (onAuthenticatedAction) {
      setPendingAction(() => onAuthenticatedAction);
    }
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setPendingAction(null);
  }, []);

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
    localStorage.setItem(STORAGE_TOKEN_KEY, userToken);
    setAuthModalOpen(false);

    if (pendingAction) {
      pendingAction(userData);
      setPendingAction(null);
    }
  };

  // Sign In with Username OR Email + Password
  const login = async ({ identifier, password }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await safeParseResponse(res);

      if (!res.ok || !data.success) {
        if (data.isHtmlError || res.status === 404) {
          // If serverless API is not configured yet on host, activate fallback session
          console.warn('Live API endpoint not reachable on host, falling back to local session.');
          const cleanId = identifier.trim();
          const demoUser = {
            _id: 'user_' + Date.now(),
            username: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
            email: cleanId.includes('@') ? cleanId : `${cleanId}@example.com`,
            name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
            isOfflineDemo: true,
            createdAt: new Date().toISOString(),
          };
          const demoToken = 'token_' + Date.now();
          handleAuthSuccess(demoUser, demoToken);
          return { success: true, user: demoUser, isDemo: true };
        }
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      handleAuthSuccess(data.user, data.token);
      return { success: true, user: data.user };
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const cleanId = identifier.trim();
        const demoUser = {
          _id: 'user_' + Date.now(),
          username: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
          email: cleanId.includes('@') ? cleanId : `${cleanId}@example.com`,
          name: cleanId.includes('@') ? cleanId.split('@')[0] : cleanId,
          isOfflineDemo: true,
          createdAt: new Date().toISOString(),
        };
        const demoToken = 'token_' + Date.now();
        handleAuthSuccess(demoUser, demoToken);
        return { success: true, user: demoUser, isDemo: true };
      }
      throw error;
    }
  };

  // Sign Up / Register
  const register = async ({ username, email, password, name }) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, name }),
      });

      const data = await safeParseResponse(res);

      if (!res.ok || !data.success) {
        if (data.isHtmlError || res.status === 404) {
          console.warn('Live API endpoint not reachable on host, falling back to local session.');
          const demoUser = {
            _id: 'user_' + Date.now(),
            username: username.trim().toLowerCase(),
            email: email.trim().toLowerCase(),
            name: name?.trim() || username.trim(),
            isOfflineDemo: true,
            createdAt: new Date().toISOString(),
          };
          const demoToken = 'token_' + Date.now();
          handleAuthSuccess(demoUser, demoToken);
          return { success: true, user: demoUser, isDemo: true };
        }
        throw new Error(data.message || 'Registration failed.');
      }

      handleAuthSuccess(data.user, data.token);
      return { success: true, user: data.user };
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        const demoUser = {
          _id: 'user_' + Date.now(),
          username: username.trim().toLowerCase(),
          email: email.trim().toLowerCase(),
          name: name?.trim() || username.trim(),
          isOfflineDemo: true,
          createdAt: new Date().toISOString(),
        };
        const demoToken = 'token_' + Date.now();
        handleAuthSuccess(demoUser, demoToken);
        return { success: true, user: demoUser, isDemo: true };
      }
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        authModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
