import React from 'react';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import ProductDetails from '../components/landing/ProductDetails';
import Features from '../components/landing/Features';
import CodeSnippets from '../components/landing/CodeSnippets';
import WhoIsItFor from '../components/landing/WhoIsItFor';
import CallToAction from '../components/landing/CallToAction';
import { TABS } from '../hooks/useAppTabs';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage({ setActiveTab, onSelectPreset }) {
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleLaunchServices = (preset) => {
    if (!isAuthenticated) {
      openAuthModal('login', () => {
        if (preset && onSelectPreset) {
          onSelectPreset(preset);
        }
        setActiveTab(TABS.SERVICES);
      });
      return;
    }

    if (preset && onSelectPreset) {
      onSelectPreset(preset);
    }
    setActiveTab(TABS.SERVICES);
  };

  const handleLaunchCompute = (preset) => {
    if (!isAuthenticated) {
      openAuthModal('login', () => {
        if (preset && onSelectPreset) {
          onSelectPreset(preset);
        }
        setActiveTab(TABS.CONSOLE);
      });
      return;
    }

    if (preset && onSelectPreset) {
      onSelectPreset(preset);
    }
    setActiveTab(TABS.CONSOLE);
  };

  const handleSelectCategory = (category) => {
    if (!isAuthenticated) {
      openAuthModal('login', () => {
        setActiveTab(TABS.CONSOLE);
      });
      return;
    }
    setActiveTab(TABS.CONSOLE);
  };

  const handleNavigateTab = (tab) => {
    if ((tab === TABS.SERVICES || tab === TABS.CONSOLE || tab === TABS.DASHBOARD) && !isAuthenticated) {
      openAuthModal('login', () => {
        setActiveTab(tab);
      });
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen">
      <Hero
        onLaunchServices={handleLaunchServices}
        onLaunchConsole={handleLaunchCompute}
        onNavigateTab={handleNavigateTab}
      />
      <HowItWorks onSelectCategory={handleSelectCategory} />
      <ProductDetails onLaunchConsole={handleLaunchServices} />
      <Features />
      <CodeSnippets />
      <WhoIsItFor />
      <CallToAction onLaunchConsole={handleLaunchServices} />
    </div>
  );
}
