import React, { useState } from 'react';
import BroadcastBanner from './components/BroadcastBanner';
import SiteNavbar from './components/landing/SiteNavbar';
import Footer from './components/landing/Footer';
import LandingPage from './pages/LandingPage';
import ConsolePage from './pages/ConsolePage';
import ServicesConsolePage from './pages/ServicesConsolePage';
import DocumentationPage from './pages/DocumentationPage';
import DeveloperPage from './pages/DeveloperPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AuthModal from './components/auth/AuthModal';
import AuthBarrier from './components/auth/AuthBarrier';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useAppTabs, TABS } from './hooks/useAppTabs';

function AppContent() {
  const { activeTab, setActiveTab } = useAppTabs(TABS.HOME);
  const [initialPreset, setInitialPreset] = useState(null);
  const [loadedReport, setLoadedReport] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleSelectPresetFromHome = (preset) => {
    setInitialPreset(preset);
  };

  const handleOpenConsoleFromBanner = () => {
    if (!isAuthenticated) {
      openAuthModal('login', () => setActiveTab(TABS.SERVICES));
    } else {
      setActiveTab(TABS.SERVICES);
    }
  };

  const handleLoadReportInConsole = (report) => {
    setLoadedReport(report);
    if (report.type === 'compute') {
      setInitialPreset(report.config);
      setActiveTab(TABS.CONSOLE);
    } else {
      setActiveTab(TABS.SERVICES);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {showBanner && (
        <BroadcastBanner
          onOpenConsole={handleOpenConsoleFromBanner}
          onClose={() => setShowBanner(false)}
        />
      )}
      <SiteNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1">
        {activeTab === TABS.HOME && (
          <LandingPage
            setActiveTab={setActiveTab}
            onSelectPreset={handleSelectPresetFromHome}
          />
        )}

        {activeTab === TABS.SERVICES && (
          isAuthenticated ? (
            <ServicesConsolePage
              onSwitchTab={setActiveTab}
              loadedReport={loadedReport}
            />
          ) : (
            <AuthBarrier onOpenAuth={openAuthModal} />
          )
        )}
        
        {activeTab === TABS.CONSOLE && (
          isAuthenticated ? (
            <ConsolePage
              initialPreset={initialPreset}
              onClearInitialPreset={() => setInitialPreset(null)}
              onSwitchTab={setActiveTab}
            />
          ) : (
            <AuthBarrier onOpenAuth={openAuthModal} />
          )
        )}

        {activeTab === TABS.DASHBOARD && (
          isAuthenticated ? (
            <UserDashboardPage
              onNavigate={setActiveTab}
              onLoadReport={handleLoadReportInConsole}
            />
          ) : (
            <AuthBarrier onOpenAuth={openAuthModal} />
          )
        )}

        {activeTab === TABS.DOCS && <DocumentationPage setActiveTab={setActiveTab} />}
        {activeTab === TABS.DEVELOPER && <DeveloperPage />}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Universal Auth Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
