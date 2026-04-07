const ADMIN_SESSION_KEY = 'pipe-trader-admin-session';
// Simple hardcoded password for this static showcase site
const ADMIN_PASSWORD = 'admin2024';

export function isAdminAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function loginAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } catch {
      // sessionStorage unavailable
    }
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // sessionStorage unavailable
  }
}
