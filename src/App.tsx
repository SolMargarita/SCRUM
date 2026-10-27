import React, { useState, useEffect } from 'react';
import { TabType, UserStory, Badge } from './types/scrum';
import { INITIAL_USER_STORIES, INITIAL_BADGES } from './data/scrumKnowledge';
import { calculateSprintMetrics, evaluateBadges } from './utils/scrumEngine';
import { Header } from './components/Header';
import { WhatIsScrum } from './components/WhatIsScrum';
import { HowItWorks } from './components/HowItWorks';
import { InteractiveExamples } from './components/InteractiveExamples';
import { SprintBoard } from './components/SprintBoard';
import { AgileIntegrations } from './components/AgileIntegrations';
import { MiniGame } from './components/MiniGame';
import { Bibliography } from './components/Bibliography';
import { BookOpen, Sparkles, Trophy, Github } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('what-is-scrum');
  const [stories, setStories] = useState<UserStory[]>(INITIAL_USER_STORIES);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [userStats, setUserStats] = useState({
    correctAnswers: 0,
    completedSprint: false,
    highStreak: 0,
    reviewedDoD: false,
    exportedProject: false
  });

  // Query parameter support (?tab=sprint-board or ?autostart=1)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as TabType;
    if (tabParam && [
      'what-is-scrum',
      'how-it-works',
      'interactive-examples',
      'sprint-board',
      'agile-tools',
      'mini-game',
      'bibliography'
    ].includes(tabParam)) {
      setActiveTab(tabParam);
    } else if (params.get('autostart') === '1') {
      setActiveTab('sprint-board');
    }
  }, []);

  // Update badges whenever userStats change
  useEffect(() => {
    setBadges(prev => evaluateBadges(userStats, prev));
  }, [userStats]);

  const sprintMetrics = calculateSprintMetrics(stories);

  const handleSprintCompleted = () => {
    setUserStats(prev => ({ ...prev, completedSprint: true }));
  };

  const handleExportPerformed = () => {
    setUserStats(prev => ({ ...prev, exportedProject: true }));
  };

  const handleStatsUpdate = (stats: { correctAnswers: number; highStreak: number }) => {
    setUserStats(prev => ({
      ...prev,
      correctAnswers: Math.max(prev.correctAnswers, stats.correctAnswers),
      highStreak: Math.max(prev.highStreak, stats.highStreak)
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        badges={badges}
        sprintCompletionRate={sprintMetrics.completionRate}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'what-is-scrum' && (
          <WhatIsScrum onNavigate={setActiveTab} />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorks onNavigate={setActiveTab} />
        )}

        {activeTab === 'interactive-examples' && (
          <InteractiveExamples onNavigate={setActiveTab} />
        )}

        {activeTab === 'sprint-board' && (
          <SprintBoard
            stories={stories}
            setStories={setStories}
            onSprintCompleted={handleSprintCompleted}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'agile-tools' && (
          <AgileIntegrations
            stories={stories}
            onExportPerformed={handleExportPerformed}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'mini-game' && (
          <MiniGame
            badges={badges}
            onStatsUpdate={handleStatsUpdate}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'bibliography' && (
          <Bibliography onNavigate={setActiveTab} />
        )}
      </main>

      {/* App Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 mt-16 py-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-amber-400">ScrumMastery</span>
            <span>•</span>
            <span>Guía Interactiva & Simulador de Metodologías Ágiles</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('bibliography')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Fuentes Oficiales
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('mini-game')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Mini Juego
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('sprint-board')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Tablero Visual
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
