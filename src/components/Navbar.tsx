import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Search,
  Sparkles,
  RotateCcw,
  Check,
  Compass,
  Menu,
  X,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  BrainCircuit,
} from 'lucide-react';

interface NavbarProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const {
    student,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    navigateTo,
    resetDemoData,
    setIsDemoGuideOpen,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Quick search results
  const searchSuggestions = [
    { title: 'Boolean Algebra (Critical Topic)', tab: 'practice', filter: 'Boolean Algebra' },
    { title: 'Relations & Functions (High Priority)', tab: 'practice', filter: 'Relations & Functions' },
    { title: 'Logic Gates Practice', tab: 'practice', filter: 'Logic Gates & Circuits' },
    { title: '7-Day Study Schedule', tab: 'study-plan' },
    { title: 'Analyze New Exam Paper', tab: 'analyze' },
    { title: 'Mistake Patterns Breakdown', tab: 'progress' },
  ].filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile menu & Brand badge */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            id="nav-brand-logo"
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">ExamLens AI</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100/80">
                  Hackathon MVP
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 font-normal">
                Your exam performance, understood.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Quick Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search topics, chapters, formula guides..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
          </div>

          {/* Search dropdown */}
          {isSearchOpen && searchQuery.trim().length > 0 && (
            <div
              id="search-dropdown-results"
              className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Quick Links</div>
              {searchSuggestions.length > 0 ? (
                searchSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    id={`search-item-${idx}`}
                    onClick={() => {
                      navigateTo(item.tab as any, item.filter);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-lg flex items-center justify-between transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] text-slate-400">Go &rarr;</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-3 text-xs text-slate-400 text-center">No matching topic found</div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Guide Button */}
          <button
            id="open-demo-guide-btn"
            onClick={() => setIsDemoGuideOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/80 rounded-lg transition-all"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3-Min Demo Tour</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            id="reset-demo-data-btn"
            onClick={resetDemoData}
            title="Reset to default demo student data"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Reset demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              id="notifications-menu-btn"
              onClick={() => setIsNotifOpen((prev) => !prev)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Open notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifsCount > 0 && (
                <span
                  id="unread-notifications-badge"
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse"
                />
              )}
            </button>

            {/* Notifications Popover */}
            {isNotifOpen && (
              <div
                id="notifications-popover"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                    {unreadNotifsCount > 0 && (
                      <span className="text-[11px] font-bold px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                        {unreadNotifsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      id="mark-all-notifications-read-btn"
                      onClick={markAllNotificationsRead}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      id={`notif-card-${notif.id}`}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        notif.read
                          ? 'bg-white border-slate-100 opacity-75'
                          : 'bg-indigo-50/40 border-indigo-100/80 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 shrink-0">
                          {notif.type === 'improvement' && (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                          )}
                          {notif.type === 'alert' && <AlertCircle className="w-4 h-4 text-amber-600" />}
                          {notif.type === 'recommendation' && (
                            <Sparkles className="w-4 h-4 text-indigo-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Student Profile Pill */}
          <div
            id="nav-profile-pill"
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2.5 pl-2 pr-2.5 py-1 bg-slate-100/70 hover:bg-slate-100 border border-slate-200/60 rounded-full cursor-pointer transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-xs">
              {student.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-none">{student.name}</p>
              <p className="text-[10px] text-slate-500 leading-none mt-1">
                {student.course} • Sem {student.semester}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
