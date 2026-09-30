/**
 * InfraSense User-Scoped Report Storage
 * Stores and manages saved infrastructure reports per authenticated user.
 */

const getStorageKey = (userId) => {
  const cleanId = userId || 'anonymous_user';
  return `infrasense_reports_${cleanId}`;
};

export function getUserReports(userId) {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to load user reports:', err);
    return [];
  }
}

export function saveUserReport(userId, reportData) {
  try {
    const key = getStorageKey(userId);
    const existing = getUserReports(userId);

    const newReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      dateFormatted: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      ...reportData,
    };

    const updated = [newReport, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
    return newReport;
  } catch (err) {
    console.error('Failed to save user report:', err);
    throw err;
  }
}

export function deleteUserReport(userId, reportId) {
  try {
    const key = getStorageKey(userId);
    const existing = getUserReports(userId);
    const updated = existing.filter((r) => r.id !== reportId);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete user report:', err);
    throw err;
  }
}

export function clearAllUserReports(userId) {
  try {
    const key = getStorageKey(userId);
    localStorage.removeItem(key);
    return [];
  } catch (err) {
    console.error('Failed to clear user reports:', err);
    throw err;
  }
}
