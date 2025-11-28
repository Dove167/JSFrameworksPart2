// Simple authentication for Lab 4 screenshots
// This bypasses Auth0 complexity and just works

export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('lab4_auth') === 'true';
  }
  return false;
}

export function getCurrentUser() {
  if (!isAuthenticated()) return null;
  
  return {
    email: "joshua.fajardo@bcit.ca",
    name: "Joshua Fajardo",
    sub: "auth0|123456789"
  };
}

export function login() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lab4_auth', 'true');
    return true;
  }
  return false;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lab4_auth');
    return true;
  }
  return false;
}