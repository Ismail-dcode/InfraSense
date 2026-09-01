import { useState, useEffect, useCallback } from 'react';

export const TABS = {
  CONSOLE: 'console',
  DOCS: 'docs',
  DEVELOPER: 'developer',
};

const TAB_HASH_MAP = {
  [TABS.CONSOLE]: 'console',
  [TABS.DOCS]: 'how-it-works',
  [TABS.DEVELOPER]: 'developer',
};

const HASH_TAB_MAP = Object.fromEntries(
  Object.entries(TAB_HASH_MAP).map(([tab, hash]) => [hash, tab])
);

export function useAppTabs(defaultTab = TABS.CONSOLE) {
  const getTabFromHash = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    return HASH_TAB_MAP[hash] || defaultTab;
  }, [defaultTab]);

  const [activeTab, setActiveTabState] = useState(getTabFromHash);

  const setActiveTab = useCallback((tab) => {
    setActiveTabState(tab);
    const hash = TAB_HASH_MAP[tab];
    if (hash) {
      window.history.replaceState(null, '', `#${hash}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveTabState(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [getTabFromHash]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', `#${TAB_HASH_MAP[defaultTab]}`);
    }
  }, [defaultTab]);

  return { activeTab, setActiveTab };
}
