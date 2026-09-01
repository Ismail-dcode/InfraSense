import React from 'react';
import SiteNavbar from './components/landing/SiteNavbar';
import Footer from './components/landing/Footer';
import ConsolePage from './pages/ConsolePage';
import DocumentationPage from './pages/DocumentationPage';
import DeveloperPage from './pages/DeveloperPage';
import { useAppTabs, TABS } from './hooks/useAppTabs';

export default function App() {
  const { activeTab, setActiveTab } = useAppTabs(TABS.CONSOLE);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <SiteNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === TABS.CONSOLE && <ConsolePage />}
        {activeTab === TABS.DOCS && <DocumentationPage />}
        {activeTab === TABS.DEVELOPER && <DeveloperPage />}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
