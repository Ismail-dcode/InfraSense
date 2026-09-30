import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  Layers,
  Terminal,
  BookOpen,
  User as UserIcon,
  Sparkles,
  ArrowRight,
  Home,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Shield,
  Server,
  Bookmark,
} from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';
import { useAuth } from '../../hooks/useAuth';

const NAV_TABS = [
  { id: TABS.HOME, label: 'Home', icon: Home },
  { id: TABS.SERVICES, label: 'Infra Services', icon: Sparkles, requiresAuth: true, badge: 'NEW' },
  { id: TABS.CONSOLE, label: 'VM Sizer', icon: Server, requiresAuth: true },
  { id: TABS.DOCS, label: 'How It Works', icon: BookOpen },
  { id: TABS.DEVELOPER, label: 'Developer', icon: UserIcon },
];

export default function SiteNavbar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTab = (tab, requiresAuth = false) => {
    if (requiresAuth && !isAuthenticated) {
      openAuthModal('login', () => setActiveTab(tab));
      setMobileOpen(false);
      return;
    }
    setActiveTab(tab);
    setMobileOpen(false);
  };

  const handleConsoleLaunch = () => {
    if (!isAuthenticated) {
      openAuthModal('login', () => setActiveTab(TABS.SERVICES));
    } else {
      setActiveTab(TABS.SERVICES);
    }
    setMobileOpen(false);
  };

  // Get user display initial
  const userInitial = (user?.name || user?.username || 'U').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-sm rounded-2xl px-4 sm:px-6 h-16 flex items-center justify-between transition-all">
          
          {/* Brand */}
          <button
            onClick={() => handleTab(TABS.HOME)}
            className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
            aria-label="InfraSense home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-shadow">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                <Layers className="w-4.5 h-4.5 text-blue-600 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight">
                  Infra<span className="gradient-text-blue">Sense</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-blue-600 border border-blue-100">
                  v2.0
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60" aria-label="Main navigation">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id, tab.requiresAuth)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-700">
                      {tab.badge}
                    </span>
                  )}
                  {tab.requiresAuth && !isAuthenticated && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Sign-in required" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Auth Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {isAuthenticated ? (
              // Logged in User Menu
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {userInitial}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[110px]">
                      {user?.name || user?.username}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono leading-tight mt-0.5">
                      @{user?.username}
                    </p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {user?.name || user?.username}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate font-mono">
                        {user?.email}
                      </p>
                      {user?.isOfflineDemo && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Demo Mode Active
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab(TABS.SERVICES);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors text-left cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span>Infra Services Architect</span>
                        <span className="ml-auto text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">NEW</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab(TABS.CONSOLE);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors text-left cursor-pointer"
                      >
                        <Server className="w-4 h-4 text-slate-500" />
                        <span>VM & Sizing Calculator</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab(TABS.DASHBOARD);
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-colors text-left cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <span>Recently Saved Reports</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Unauthenticated Buttons
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => openAuthModal('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 transition-all shadow-sm cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            {/* Launch Console Button */}
            <button
              onClick={handleConsoleLaunch}
              className="relative group inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Architect</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-[36rem] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-3 space-y-1">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id, tab.requiresAuth)}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-blue-100 text-blue-700">
                      {tab.badge}
                    </span>
                  )}
                  {tab.requiresAuth && !isAuthenticated && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                      Sign in
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          {isAuthenticated && (
            <button
              onClick={() => {
                setActiveTab(TABS.DASHBOARD);
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-50"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Saved Reports Dashboard</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    {userInitial}
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {user?.name || user?.username}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register');
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            <button
              onClick={handleConsoleLaunch}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Services Architect</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
