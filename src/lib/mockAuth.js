// Mock authentication for development/testing
export const mockUser = {
  email: "test@lab4.com",
  name: "Test User",
  sub: "auth0|123456789"
};

// Simple function to simulate being logged in
export function setMockUser() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
  }
}

// Simple function to check if user is logged in
export function isAuthenticated() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('mockUser') !== null;
  }
  return false;
}

// Simple function to get current user
export function getCurrentUser() {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('mockUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

// Simple function to logout
export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockUser');
  }
}