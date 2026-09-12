import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { AnalyzeExamView } from './components/AnalyzeExamView';
import { PracticeView } from './components/PracticeView';
import { ProgressView } from './components/ProgressView';
import { StudyPlanView } from './components/StudyPlanView';
import { ProfileView } from './components/ProfileView';
import { ToastContainer } from './components/ToastContainer';
import { DemoTourModal } from './components/DemoTourModal';
import { DemoFlowBar } from './components/DemoFlowBar';

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If on landing view, render full landing page experience
  if (currentTab === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <LandingPage />
        <ToastContainer />
        <DemoTourModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Fixed/Sticky Top Bar */}
      <Navbar
        onMobileMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar for Desktop + Off-canvas Drawer for Mobile */}
        <Sidebar
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main
          id="main-app-content"
          className="flex-1 lg:pl-64 flex flex-col min-w-0 transition-all"
        >
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {currentTab === 'dashboard' && <DashboardView />}
            {currentTab === 'analyze' && <AnalyzeExamView />}
            {currentTab === 'practice' && <PracticeView />}
            {currentTab === 'progress' && <ProgressView />}
            {currentTab === 'study-plan' && <StudyPlanView />}
            {currentTab === 'profile' && <ProfileView />}
          </div>
        </main>
      </div>

      {/* Global Toast Notifications, Sticky Demo Controller & Demo Tour Modal */}
      <ToastContainer />
      <DemoTourModal />
      <DemoFlowBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
