import { useState, useEffect, useCallback } from 'react';

export const TABS = {
  HOME: 'home',
  SERVICES: 'services',
  CONSOLE: 'console',
  DOCS: 'docs',
  DEVELOPER: 'developer',
  DASHBOARD: 'dashboard',
};

const TAB_HASH_MAP = {
  [TABS.HOME]: 'home',
  [TABS.SERVICES]: 'services',
  [TABS.CONSOLE]: 'compute-console',
  [TABS.DOCS]: 'how-it-works',
  [TABS.DEVELOPER]: 'developer',
  [TABS.DASHBOARD]: 'saved-reports',
};

const HASH_TAB_MAP = {
  ...Object.fromEntries(
    Object.entries(TAB_HASH_MAP).map(([tab, hash]) => [hash, tab])
  ),
  'console': TABS.CONSOLE,
  'services-console': TABS.SERVICES,
  'dashboard': TABS.DASHBOARD,
  'reports': TABS.DASHBOARD,
};

export function useAppTabs(defaultTab = TABS.HOME) {
  const getTabFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    return HASH_TAB_MAP[hash] || defaultTab;
  }, [defaultTab]);

  const [activeTab, setActiveTabState] = useState(getTabFromHash);

  const setActiveTab = useCallback((tab, pushHistory = true) => {
    setActiveTabState(tab);
    const targetHash = TAB_HASH_MAP[tab] || 'home';
    const currentHash = window.location.hash.replace('#', '');

    if (currentHash !== targetHash) {
      if (pushHistory) {
        // Push a new history entry so browser Back goes to previous page/tab
        window.history.pushState({ tab }, '', `#${targetHash}`);
      } else {
        window.history.replaceState({ tab }, '', `#${targetHash}`);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle browser Back / Forward buttons (popstate & hashchange)
  useEffect(() => {
    const handleNavigationChange = () => {
      const tabFromUrl = getTabFromHash();
      setActiveTabState(tabFromUrl);
    };

    window.addEventListener('popstate', handleNavigationChange);
    window.addEventListener('hashchange', handleNavigationChange);

    return () => {
      window.removeEventListener('popstate', handleNavigationChange);
      window.removeEventListener('hashchange', handleNavigationChange);
    };
  }, [getTabFromHash]);

  // Initial load hash normalization
  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState({ tab: defaultTab }, '', `#${TAB_HASH_MAP[defaultTab]}`);
    }
  }, [defaultTab]);

  return { activeTab, setActiveTab };
}
