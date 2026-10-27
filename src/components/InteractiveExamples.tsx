import React, { useState } from 'react';
import { PLANNING_POKER_STORIES } from '../data/scrumKnowledge';
import { generateBurndownData } from '../utils/scrumEngine';
import { 
  Sparkles, 
  Layers, 
  TrendingDown, 
  CheckSquare, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight,
  Flame,
  AlertCircle,
  Lightbulb,
  ThumbsUp
} from 'lucide-react';
import { TabType } from '../types/scrum';

interface InteractiveExamplesProps {
  onNavigate: (tab: TabType) => void;
}

export const InteractiveExamples: React.FC<InteractiveExamplesProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'poker' | 'burndown' | 'dod' | 'daily'>('poker');

  // --- 1. Planning Poker State ---
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const fibonacciCards = [1, 2, 3, 5, 8, 13, 20];

  const currentPokerStory = PLANNING_POKER_STORIES[selectedStoryIndex];

  const handleVote = (vote: number) => {
    setUserVote(vote);
    setIsRevealed(true);
  };

  const handleNextStory = () => {
    setUserVote(null);
    setIsRevealed(false);
    setSelectedStoryIndex((prev) => (prev + 1) % PLANNING_POKER_STORIES.length);
  };

  // --- 2. Burndown Simulator State ---
  const [totalSprintPoints, setTotalSprintPoints] = useState<number>(30);
  const [currentDay, setCurrentDay] = useState<number>(5);
  const [completedPoints, setCompletedPoints] = useState<number>(14);
  const [hasScopeCreep, setHasScopeCreep] = useState<boolean>(false);

  const effectiveTotal = hasScopeCreep ? totalSprintPoints + 8 : totalSprintPoints;
  const burndownData = generateBurndownData(effectiveTotal, currentDay, completedPoints);

  // --- 3. Definition of Done State ---
  const [dodItems, setDodItems] = useState([
    { id: 1, text: 'El código fue probado y funciona sin errores', checked: true },
    { id: 2, text: 'Otro compañero del equipo revisó el código', checked: true },
    { id: 3, text: 'Cumple exactamente lo que el cliente pidió', checked: true },
    { id: 4, text: 'Se verificó que se vea bien en celular y computadora', checked: false },
    { id: 5, text: 'Fue probado con éxito en el ambiente de pruebas', checked: false }
  ]);

  const toggleDod = (id: number) => {
    setDodItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const completedDodCount = dodItems.filter(i => i.checked).length;
  const isDoDFullReady = completedDodCount === dodItems.length;

  // --- 4. Daily Scrum Impediments State ---
  const [dailyScenarioId, setDailyScenarioId] = useState<number>(1);
  const [dailyChoice, setDailyChoice] = useState<number | null>(null);

  const dailyScenarios = [
    {
      id: 1,
      title: 'El servidor de pruebas (Staging) se cayó por la noche',
      situation: 'El equipo de QA no puede probar las historias listas y 3 desarrolladores están bloqueados.',
      options: [
        {
          id: 1,
          text: 'El Scrum Master toma nota, contacta de inmediato al equipo de Infraestructura/DevOps y remueve el bloqueo.',
          isAgile: true,
          explanation: '¡Correcto! Una función esencial del Scrum Master es gestionar la eliminación de impedimentos organizacionales para que los desarrolladores mantengan el flujo de trabajo.'
        },
        {
          id: 2,
          text: 'Pausar el Sprint y enviar a todos a casa hasta que alguien arregle el servidor.',
          isAgile: false,
          explanation: 'Inadecuado. El equipo puede continuar con pruebas locales, refactorización, pareo o pruebas unitarias mientras se restaura el entorno.'
        },
        {
          id: 3,
          text: 'Esperar a la Sprint Retrospective en 10 días para mencionar el fallo.',
          isAgile: false,
          explanation: 'Esperar tanto tiempo acumula desperdicio e incapacita el cumplimiento del Sprint Goal.'
        }
      ]
    },
    {
      id: 2,
      title: 'Un Stakeholder clave pide un cambio de última hora en plena Daily',
      situation: 'Un gerente asiste como oyente a la Daily y empieza a dar órdenes técnicas a un desarrollador.',
      options: [
        {
          id: 1,
          text: 'El Scrum Master interviene con cortesía recordando que la Daily es solo para la sincronización de los Desarrolladores, y canaliza su solicitud al Product Owner.',
          isAgile: true,
          explanation: '¡Excelente! Los interesados pueden observar si el equipo lo permite, pero no participan ni alteran el foco. Los cambios de alcance se gestionan mediante el Product Owner.'
        },
        {
          id: 2,
          text: 'Aceptar el cambio de inmediato para mantener contento al gerente.',
          isAgile: false,
          explanation: 'Aceptar solicitudes no priorizadas desvía al equipo de su Sprint Goal y rompe la autogestión.'
        }
      ]
    }
  ];

  const currentScenario = dailyScenarios.find(s => s.id === dailyScenarioId) || dailyScenarios[0];

  return (
    <div className="space-y-10 py-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Laboratorio Práctico</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ejemplos & Simuladores Interactivos
        </h1>
        <p className="mt-2 text-slate-300 text-base max-w-3xl leading-relaxed">
          Experimenta las técnicas más utilizadas en Scrum: votación con <strong className="text-white">Planning Poker</strong>, monitoreo de velocidad con el <strong className="text-white">Burndown Chart</strong>, aseguramiento de calidad con la <strong className="text-white">Definition of Done</strong> y resolución de dilemas en la <strong className="text-white">Daily Scrum</strong>.
        </p>

        {/* Tab switcher */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: 'poker', label: '1. Planning Poker', icon: <Layers className="w-4 h-4" /> },
            { id: 'burndown', label: '2. Burndown Chart Simulator', icon: <TrendingDown className="w-4 h-4" /> },
            { id: 'dod', label: '3. Definition of Done (DoD)', icon: <CheckSquare className="w-4 h-4" /> },
            { id: 'daily', label: '4. Simulador Daily Scrum', icon: <HelpCircle className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. PLANNING POKER SIMULATOR */}
      {activeTab === 'poker' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Estimación de Esfuerzo en Equipo
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Planning Poker (Secuencia Fibonacci)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Técnica para estimar cuánto esfuerzo requiere una tarea comparando cartas numéricas con el equipo.
              </p>
            </div>
            <button
              onClick={handleNextStory}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Siguiente Historia</span>
            </button>
          </div>

          {/* User story to estimate */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Historia {selectedStoryIndex + 1} de {PLANNING_POKER_STORIES.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300">
                Complejidad Estimada: {currentPokerStory.complexity}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">{currentPokerStory.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{currentPokerStory.description}</p>
          </div>

          {/* Fibonacci Cards Deck */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-300 mb-3">
              ¿Cuántos Story Points estimas para esta historia? Selecciona tu carta:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
              {fibonacciCards.map((num) => {
                const isSelected = userVote === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleVote(num)}
                    className={`h-24 rounded-xl border flex flex-col items-center justify-center font-black text-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 border-amber-400 text-slate-950 scale-105 shadow-xl shadow-amber-500/30'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-amber-400 hover:bg-slate-700/80'
                    }`}
                  >
                    <span>{num}</span>
                    <span className="text-[10px] font-medium tracking-tighter opacity-70">pts</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reveal & Team Consensus */}
          {isRevealed && (
            <div className="bg-slate-800/95 border border-amber-500/40 rounded-2xl p-6 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center space-x-2 text-amber-400 text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Votos Revelados del Equipo</span>
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-center min-w-[70px]">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Tú</span>
                  <span className="text-xl font-black text-white">{userVote} pts</span>
                </div>
                {currentPokerStory.teamVotes.map((vote, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center min-w-[70px]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Dev {idx + 1}</span>
                    <span className="text-xl font-bold text-slate-200">{vote} pts</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wide">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Consenso y Razonamiento Ágil</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentPokerStory.consensusReasoning}
                </p>
                <div className="text-xs text-amber-400 font-semibold pt-1">
                  💡 Estimación Final Recomendada: {currentPokerStory.recommendedEstimate} Story Points
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 2. BURNDOWN SIMULATOR */}
      {activeTab === 'burndown' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">
              Simulador de Gráfico Burndown
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Muestra las tareas pendientes en cada día del Sprint. La meta del equipo es que la línea baje progresivamente hasta llegar a 0 al terminar los 10 días.
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Día Actual del Sprint: {currentDay} de 10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={currentDay}
                onChange={(e) => setCurrentDay(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Puntos Completados: {completedPoints} pts
              </label>
              <input
                type="range"
                min="0"
                max={effectiveTotal}
                value={completedPoints}
                onChange={(e) => setCompletedPoints(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div className="flex flex-col justify-center">
              <label className="inline-flex items-center space-x-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasScopeCreep}
                  onChange={(e) => setHasScopeCreep(e.target.checked)}
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <span>Simular Scope Creep (+8 pts añadidos)</span>
              </label>
              <span className="text-[11px] text-slate-400 mt-0.5">
                Ver qué ocurre cuando se añade trabajo no planificado.
              </span>
            </div>
          </div>

          {/* Visual Chart Bars */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-300">Puntos Restantes por Día</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-600 inline-block" />
                  <span>Línea Ideal</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span>Real (Burned)</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-11 gap-1 sm:gap-2 h-48 items-end pt-6 border-b border-slate-800">
              {burndownData.map((d) => {
                const idealPercent = (d.ideal / effectiveTotal) * 100;
                const actualPercent = d.actual !== null ? (d.actual / effectiveTotal) * 100 : 0;
                return (
                  <div key={d.dayNumber} className="flex flex-col items-center h-full justify-end group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 hidden group-hover:flex bg-slate-800 text-[10px] text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 border border-slate-700">
                      Ideal: {d.ideal} | Real: {d.actual !== null ? d.actual : '-'}
                    </div>

                    <div className="flex items-end space-x-0.5 sm:space-x-1 w-full justify-center h-full">
                      {/* Ideal Bar */}
                      <div
                        style={{ height: `${idealPercent}%` }}
                        className="w-2 sm:w-3 bg-slate-700/60 rounded-t"
                      />
                      {/* Actual Bar */}
                      {d.actual !== null && (
                        <div
                          style={{ height: `${actualPercent}%` }}
                          className={`w-2 sm:w-3 rounded-t ${
                            d.actual <= d.ideal ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                        />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 font-mono">D{d.dayNumber}</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-slate-300 flex items-center justify-between">
              <span>Sprint de 10 Días</span>
              <span className="font-bold text-amber-400">
                Puntos restantes: {effectiveTotal - completedPoints} / {effectiveTotal} pts
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 3. DEFINITION OF DONE BUILDER */}
      {activeTab === 'dod' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Compromiso de Calidad
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              Checklist de la Definición de Hecho (DoD)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Lista de verificación para comprobar que cada tarea esté terminada de verdad y con calidad antes de mostrarla al cliente.
            </p>
          </div>

          <div className="space-y-3">
            {dodItems.map(item => (
              <div
                key={item.id}
                onClick={() => toggleDod(item.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-white'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
                role="checkbox"
                aria-checked={item.checked}
                tabIndex={0}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                    item.checked ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-600 bg-slate-800'
                  }`}>
                    {item.checked && <CheckSquare className="w-4 h-4" />}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{item.text}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.checked ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                }`}>
                  {item.checked ? 'Verificado' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>

          {/* Status feedback */}
          <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
            isDoDFullReady
              ? 'bg-emerald-900/30 border-emerald-500 text-emerald-300'
              : 'bg-amber-900/20 border-amber-500/40 text-amber-300'
          }`}>
            {isDoDFullReady ? (
              <CheckSquare className="w-6 h-6 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-6 h-6 shrink-0 text-amber-400" />
            )}
            <div>
              <h4 className="text-sm font-bold">
                {isDoDFullReady
                  ? '¡Incremento Potencialmente Desplegable!'
                  : `Criterios completados: ${completedDodCount} de ${dodItems.length}`}
              </h4>
              <p className="text-xs mt-0.5 text-slate-300">
                {isDoDFullReady
                  ? 'El incremento satisface los más altos estándares de calidad y puede presentarse formalmente en la Sprint Review.'
                  : 'Faltan requerimientos de calidad. Si el Sprint terminara ahora, este trabajo no se cuenta como terminado y regresa al Backlog.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 4. DAILY SCRUM SIMULATOR */}
      {activeTab === 'daily' && (
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Gestión de Impedimentos en Vivo
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              Simulador de Dilemas en la Daily Scrum
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Pon a prueba tus reflejos como Scrum Master ante los desafíos cotidianos de un equipo de desarrollo.
            </p>
          </div>

          {/* Scenario tabs */}
          <div className="flex gap-2">
            {dailyScenarios.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setDailyScenarioId(s.id);
                  setDailyChoice(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  dailyScenarioId === s.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Escenario {s.id}
              </button>
            ))}
          </div>

          {/* Scenario Description */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-2">
            <h3 className="text-lg font-bold text-white">{currentScenario.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300">{currentScenario.situation}</p>
          </div>

          {/* Decision options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              ¿Cuál es la respuesta ágil correcta?
            </span>
            {currentScenario.options.map(opt => {
              const isSelected = dailyChoice === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setDailyChoice(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? opt.isAgile
                        ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-rose-950/30 border-rose-500 ring-1 ring-rose-500'
                      : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/80 text-slate-200'
                  }`}
                >
                  <p className="text-xs sm:text-sm font-medium">{opt.text}</p>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs">
                      <span className={`font-bold block mb-1 ${opt.isAgile ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {opt.isAgile ? '✅ Decisión Ágil Óptima' : '❌ Antipatrón Detectado'}
                      </span>
                      <p className="text-slate-300">{opt.explanation}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={() => onNavigate('how-it-works')}
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
        >
          ← Volver a ¿Cómo Funciona?
        </button>
        <button
          onClick={() => onNavigate('sprint-board')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Ir al Tablero de Sprint Real</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
