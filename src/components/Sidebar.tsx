import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import {
  LayoutDashboard,
  ScanText,
  Dumbbell,
  TrendingUp,
  CalendarCheck2,
  UserCircle2,
  Sparkles,
  Layers,
  ChevronRight,
  ExternalLink,
  Flame,
  Award,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onMobileClose }) => {
  const { currentTab, navigateTo, student, setIsDemoGuideOpen } = useApp();

  const navItems: { tab: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { tab: 'analyze', label: 'Analyze Exam', icon: ScanText, badge: 'AI' },
    { tab: 'practice', label: 'Practice', icon: Dumbbell },
    { tab: 'progress', label: 'My Progress', icon: TrendingUp },
    { tab: 'study-plan', label: 'Study Plan', icon: CalendarCheck2, badge: 'Adaptive' },
    { tab: 'profile', label: 'Profile', icon: UserCircle2 },
  ];

  const handleNavClick = (tab: NavTab) => {
    navigateTo(tab);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          id="sidebar-mobile-backdrop"
          onClick={onMobileClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        id="app-sidebar"
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Student Status Card */}
          <div className="bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-slate-50 border border-indigo-100/70 rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-indigo-500/30">
                {student.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{student.name}</p>
                <p className="text-[11px] text-slate-500 truncate">
                  {student.course} • Sem {student.semester}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-100/50 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{student.streakDays} Day Streak</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 justify-end">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>{student.topicsMastered} Mastered</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2">
              Menu
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick AI Tip Callout */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl" />
            <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold tracking-wide uppercase">Core Mission</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "Stop studying everything. Study what matters."
            </p>
            <button
              id="sidebar-landing-tour-btn"
              onClick={() => handleNavClick('landing')}
              className="mt-3 w-full py-1.5 px-2.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Landing Page</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            id="sidebar-judge-demo-btn"
            onClick={() => setIsDemoGuideOpen(true)}
            className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/50 font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Hackathon Judge Mode
            </span>
            <ExternalLink className="w-3 h-3 text-indigo-500" />
          </button>
        </div>
      </aside>
    </>
  );
};
