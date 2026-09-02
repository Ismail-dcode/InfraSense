import React from 'react';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import ProductDetails from '../components/landing/ProductDetails';
import Features from '../components/landing/Features';
import CodeSnippets from '../components/landing/CodeSnippets';
import WhoIsItFor from '../components/landing/WhoIsItFor';
import CallToAction from '../components/landing/CallToAction';
import { TABS } from '../hooks/useAppTabs';

export default function LandingPage({ setActiveTab, onSelectPreset }) {
  const handleLaunchConsole = (preset) => {
    if (preset && onSelectPreset) {
      onSelectPreset(preset);
    }
    setActiveTab(TABS.CONSOLE);
  };

  const handleSelectCategory = (category) => {
    setActiveTab(TABS.CONSOLE);
  };

  return (
    <div className="min-h-screen">
      <Hero onLaunchConsole={handleLaunchConsole} />
      <HowItWorks onSelectCategory={handleSelectCategory} />
      <ProductDetails onLaunchConsole={handleLaunchConsole} />
      <Features />
      <CodeSnippets />
      <WhoIsItFor />
      <CallToAction onLaunchConsole={handleLaunchConsole} />
    </div>
  );
}
