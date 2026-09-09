import React, { useEffect, useState } from 'react';
import BroadcastBanner from './components/BroadcastBanner';
import SiteNavbar from './components/landing/SiteNavbar';
import Footer from './components/landing/Footer';
import LandingPage from './pages/LandingPage';
import ConsolePage from './pages/ConsolePage';
import DocumentationPage from './pages/DocumentationPage';
import DeveloperPage from './pages/DeveloperPage';
import { useAppTabs, TABS } from './hooks/useAppTabs';

export default function App() {
  const { activeTab, setActiveTab } = useAppTabs(TABS.HOME);
  const [initialPreset, setInitialPreset] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('infrasense-theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('infrasense-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleSelectPresetFromHome = (preset) => {
    setInitialPreset(preset);
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {showBanner && (
        <BroadcastBanner
          onOpenConsole={() => setActiveTab(TABS.CONSOLE)}
          onClose={() => setShowBanner(false)}
        />
      )}
      <SiteNavbar activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)} />

      <main className="flex-1">
        {activeTab === TABS.HOME && (
          <LandingPage
            setActiveTab={setActiveTab}
            onSelectPreset={handleSelectPresetFromHome}
          />
        )}
        {activeTab === TABS.CONSOLE && (
          <ConsolePage
            initialPreset={initialPreset}
            onClearInitialPreset={() => setInitialPreset(null)}
          />
        )}
        {activeTab === TABS.DOCS && <DocumentationPage setActiveTab={setActiveTab} />}
        {activeTab === TABS.DEVELOPER && <DeveloperPage />}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
