import React from 'react';
import { TabType, Badge } from '../types/scrum';
import { 
  Compass, 
  Layers, 
  SlidersHorizontal, 
  Kanban, 
  Wrench, 
  Gamepad2, 
  BookOpen, 
  Trophy,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  badges: Badge[];
  sprintCompletionRate: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  badges,
  sprintCompletionRate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const unlockedBadgesCount = badges.filter(b => b.unlocked).length;

  const tabs: { id: TabType; label: string; icon: React.ReactNode; badgeText?: string }[] = [
    { id: 'what-is-scrum', label: '¿Qué es?', icon: <Compass className="w-4 h-4" /> },
    { id: 'how-it-works', label: '¿Cómo funciona?', icon: <Layers className="w-4 h-4" /> },
    { id: 'interactive-examples', label: 'Ejemplos Interactivos', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { 
      id: 'sprint-board', 
      label: 'Tablero de Sprint', 
      icon: <Kanban className="w-4 h-4" />,
      badgeText: `${sprintCompletionRate}%`
    },
    { id: 'agile-tools', label: 'Herramientas Ágiles', icon: <Wrench className="w-4 h-4" /> },
    { 
      id: 'mini-game', 
      label: 'Mini Juego', 
      icon: <Gamepad2 className="w-4 h-4" />,
      badgeText: `${unlockedBadgesCount}/${badges.length}`
    },
    { id: 'bibliography', label: 'Bibliografía', icon: <BookOpen className="w-4 h-4" /> }
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleTabClick('what-is-scrum')}
            role="button"
            tabIndex={0}
            aria-label="Ir a inicio de la guía Scrum"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-white text-lg tracking-wider">SM</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">ScrumMastery</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Guía Interactiva
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Aprende, simula y domina el marco ágil Scrum</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Navegación principal">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badgeText && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400 border border-slate-700'
                    }`}>
                      {tab.badgeText}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick HUD Score */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleTabClick('mini-game')}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-all text-xs text-slate-200 cursor-pointer"
              title="Insignias desbloqueadas"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline font-medium">Insignias:</span>
              <span className="font-bold text-amber-400">{unlockedBadgesCount}/{badges.length}</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {tab.badgeText && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-amber-400 border border-slate-700'
                  }`}>
                    {tab.badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
