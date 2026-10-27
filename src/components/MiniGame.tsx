import React, { useState } from 'react';
import { Badge, TabType } from '../types/scrum';
import { 
  ROLE_MATCH_QUESTIONS, 
  TRUE_FALSE_QUESTIONS, 
  SPRINT_ORDER_ITEMS 
} from '../data/scrumKnowledge';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Award, 
  Check, 
  Crown, 
  ShieldCheck, 
  Code2,
  HelpCircle,
  ListOrdered
} from 'lucide-react';

interface MiniGameProps {
  badges: Badge[];
  onStatsUpdate: (stats: { correctAnswers: number; highStreak: number }) => void;
  onNavigate: (tab: TabType) => void;
}

export const MiniGame: React.FC<MiniGameProps> = ({
  badges,
  onStatsUpdate,
  onNavigate
}) => {
  const [activeGameMode, setActiveGameMode] = useState<'roles' | 'true-false' | 'order'>('roles');

  // --- GAME 1: ROLE MATCHER STATE ---
  const [roleIndex, setRoleIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState<'po' | 'sm' | 'dev' | null>(null);
  const [roleAnswerSubmitted, setRoleAnswerSubmitted] = useState(false);
  const [roleScore, setRoleScore] = useState(0);
  const [roleStreak, setRoleStreak] = useState(0);

  const currentRoleQ = ROLE_MATCH_QUESTIONS[roleIndex];

  const handleRoleChoice = (choice: 'po' | 'sm' | 'dev') => {
    if (roleAnswerSubmitted) return;
    setSelectedRole(choice);
    setRoleAnswerSubmitted(true);

    const isCorrect = choice === currentRoleQ.correctRole;
    if (isCorrect) {
      setRoleScore(prev => prev + 20);
      const newStreak = roleStreak + 1;
      setRoleStreak(newStreak);
      onStatsUpdate({ correctAnswers: roleScore / 20 + 1, highStreak: newStreak });
    } else {
      setRoleStreak(0);
    }
  };

  const handleNextRoleQuestion = () => {
    setSelectedRole(null);
    setRoleAnswerSubmitted(false);
    if (roleIndex + 1 < ROLE_MATCH_QUESTIONS.length) {
      setRoleIndex(prev => prev + 1);
    } else {
      // Completed all role questions
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setRoleIndex(0);
    }
  };

  // --- GAME 2: TRUE / FALSE STATE ---
  const [tfIndex, setTfIndex] = useState(0);
  const [tfSelectedAnswer, setTfSelectedAnswer] = useState<boolean | null>(null);
  const [tfSubmitted, setTfSubmitted] = useState(false);
  const [tfScore, setTfScore] = useState(0);

  const currentTfQ = TRUE_FALSE_QUESTIONS[tfIndex];

  const handleTfChoice = (choice: boolean) => {
    if (tfSubmitted) return;
    setTfSelectedAnswer(choice);
    setTfSubmitted(true);

    const isCorrect = choice === currentTfQ.isTrue;
    if (isCorrect) {
      setTfScore(prev => prev + 20);
      onStatsUpdate({ correctAnswers: tfScore / 20 + 1, highStreak: 2 });
    }
  };

  const handleNextTfQuestion = () => {
    setTfSelectedAnswer(null);
    setTfSubmitted(false);
    if (tfIndex + 1 < TRUE_FALSE_QUESTIONS.length) {
      setTfIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setTfIndex(0);
    }
  };

  // --- GAME 3: SPRINT ORDER STATE ---
  const [userOrderedSteps, setUserOrderedSteps] = useState<string[]>([]);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const handleAddStepToOrder = (stepId: string) => {
    if (userOrderedSteps.includes(stepId)) return;
    const newOrder = [...userOrderedSteps, stepId];
    setUserOrderedSteps(newOrder);

    if (newOrder.length === SPRINT_ORDER_ITEMS.length) {
      // Check if correct
      const isCorrectOrder = newOrder[0] === 'planning' && 
                             newOrder[1] === 'daily' && 
                             newOrder[2] === 'review' && 
                             newOrder[3] === 'retro';
      if (isCorrectOrder) {
        setIsOrderComplete(true);
        confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
        onStatsUpdate({ correctAnswers: 5, highStreak: 3 });
      }
    }
  };

  const handleResetOrder = () => {
    setUserOrderedSteps([]);
    setIsOrderComplete(false);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span>Juegos de Aprendizaje Fácil</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Minijuegos Scrum 🎯
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Juegos rápidos, prácticos y con explicaciones directas para aprender paso a paso.
            </p>
          </div>

          {/* Badges preview */}
          <div className="flex items-center space-x-2 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">
              Insignias: {badges.filter(b => b.unlocked).length} / {badges.length}
            </span>
          </div>
        </div>

        {/* 3 Game Mode Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveGameMode('roles')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeGameMode === 'roles'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span>👑 1. ¿De Quién es el Rol?</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 text-current">
              {roleIndex + 1}/{ROLE_MATCH_QUESTIONS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveGameMode('true-false')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeGameMode === 'true-false'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span>⚡ 2. ¿Verdadero o Falso?</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/20 text-current">
              {tfIndex + 1}/{TRUE_FALSE_QUESTIONS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveGameMode('order')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeGameMode === 'order'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span>🧩 3. Ordena las 4 Etapas del Sprint</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* JUEGO 1: ¿DE QUIÉN ES EL ROL? (Super Simple Role Matcher) */}
      {/* ======================================================== */}
      {activeGameMode === 'roles' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Pregunta {roleIndex + 1} de {ROLE_MATCH_QUESTIONS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                ¿A quién le corresponde esta responsabilidad?
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Puntos Acumulados</span>
              <span className="text-lg font-black text-amber-400">{roleScore} pts</span>
            </div>
          </div>

          {/* Simple Statement Card */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 text-center space-y-2">
            <span className="text-3xl">📋</span>
            <p className="text-base sm:text-xl font-bold text-white max-w-xl mx-auto leading-relaxed">
              "{currentRoleQ.task}"
            </p>
          </div>

          {/* 3 Friendly Role Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'po' as const, name: 'Product Owner', icon: <Crown className="w-6 h-6 text-amber-400" />, color: 'hover:border-amber-500' },
              { id: 'sm' as const, name: 'Scrum Master', icon: <ShieldCheck className="w-6 h-6 text-blue-400" />, color: 'hover:border-blue-500' },
              { id: 'dev' as const, name: 'Desarrolladores', icon: <Code2 className="w-6 h-6 text-emerald-400" />, color: 'hover:border-emerald-500' }
            ].map(role => {
              const isSelected = selectedRole === role.id;
              const isCorrect = currentRoleQ.correctRole === role.id;

              let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200';
              if (roleAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/50 border-emerald-500 text-white ring-2 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/50 border-rose-500 text-white ring-2 ring-rose-500';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40';
                }
              }

              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleChoice(role.id)}
                  disabled={roleAnswerSubmitted}
                  className={`p-5 rounded-2xl border flex flex-col items-center justify-center space-y-2 font-bold text-sm sm:text-base transition-all cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="p-3 rounded-full bg-slate-900/80 border border-slate-700/60">
                    {role.icon}
                  </div>
                  <span>{role.name}</span>
                </button>
              );
            })}
          </div>

          {/* Simple Explanation Callout */}
          {roleAnswerSubmitted && (
            <div className={`p-4 rounded-xl border flex items-start space-x-3 animate-in fade-in ${
              selectedRole === currentRoleQ.correctRole
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
            }`}>
              {selectedRole === currentRoleQ.correctRole ? (
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold text-sm block">
                  {selectedRole === currentRoleQ.correctRole ? '¡Respuesta Correcta!' : '¡Casi! La respuesta correcta es:'} {currentRoleQ.roleName}
                </span>
                <p className="text-xs sm:text-sm text-slate-200">
                  {currentRoleQ.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {roleAnswerSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextRoleQuestion}
                className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>{roleIndex + 1 < ROLE_MATCH_QUESTIONS.length ? 'Siguiente Pregunta' : '¡Completar Ronda!'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* JUEGO 2: VERDADERO O FALSO (Super Simple 2-Button Choice) */}
      {/* ======================================================== */}
      {activeGameMode === 'true-false' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Afirmación {tfIndex + 1} de {TRUE_FALSE_QUESTIONS.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                ¿Es Verdadero o Falso?
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Puntaje</span>
              <span className="text-lg font-black text-amber-400">{tfScore} pts</span>
            </div>
          </div>

          {/* Statement Box */}
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 text-center space-y-3">
            <span className="text-3xl">🧐</span>
            <p className="text-base sm:text-xl font-extrabold text-white max-w-xl mx-auto leading-relaxed">
              "{currentTfQ.statement}"
            </p>
          </div>

          {/* Two Big Buttons: Verdadero / Falso */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <button
              onClick={() => handleTfChoice(true)}
              disabled={tfSubmitted}
              className={`p-5 rounded-2xl border font-black text-base sm:text-lg flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:cursor-default ${
                tfSubmitted
                  ? currentTfQ.isTrue
                    ? 'bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-400'
                    : tfSelectedAnswer === true
                    ? 'bg-rose-900 border-rose-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                  : 'bg-emerald-950/40 border-emerald-500/50 hover:bg-emerald-900/50 text-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Verdadero</span>
            </button>

            <button
              onClick={() => handleTfChoice(false)}
              disabled={tfSubmitted}
              className={`p-5 rounded-2xl border font-black text-base sm:text-lg flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:cursor-default ${
                tfSubmitted
                  ? !currentTfQ.isTrue
                    ? 'bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-400'
                    : tfSelectedAnswer === false
                    ? 'bg-rose-900 border-rose-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-600 opacity-40'
                  : 'bg-rose-950/40 border-rose-500/50 hover:bg-rose-900/50 text-rose-300'
              }`}
            >
              <XCircle className="w-5 h-5 text-rose-400" />
              <span>Falso</span>
            </button>
          </div>

          {/* Direct Explanation */}
          {tfSubmitted && (
            <div className={`p-4 rounded-xl border flex items-start space-x-3 animate-in fade-in ${
              tfSelectedAnswer === currentTfQ.isTrue
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
            }`}>
              {tfSelectedAnswer === currentTfQ.isTrue ? (
                <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 shrink-0 text-rose-400 mt-0.5" />
              )}
              <div className="space-y-1">
                <span className="font-bold text-sm block">
                  {tfSelectedAnswer === currentTfQ.isTrue ? '¡Acertaste!' : 'Explicación:'}
                </span>
                <p className="text-xs sm:text-sm text-slate-200">
                  {currentTfQ.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Next Button */}
          {tfSubmitted && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextTfQuestion}
                className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <span>{tfIndex + 1 < TRUE_FALSE_QUESTIONS.length ? 'Siguiente Afirmación' : '¡Completar Ronda!'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* JUEGO 3: ORDENA LAS 4 ETAPAS DEL SPRINT */}
      {/* ======================================================== */}
      {activeGameMode === 'order' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
              Juego de Secuencia
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              ¿En qué orden suceden las etapas de un Sprint?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Haz clic en cada tarjeta para ordenarlas de la 1ª a la 4ª etapa del ciclo Scrum.
            </p>
          </div>

          {/* Cards to choose from */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 block">Etapas disponibles (haz clic para agregar en orden):</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPRINT_ORDER_ITEMS.map((item) => {
                const isSelected = userOrderedSteps.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleAddStepToOrder(item.id)}
                    disabled={isSelected}
                    className={`p-4 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950/60 border-slate-800 opacity-40 cursor-not-allowed text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 hover:border-amber-500 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold">{item.name}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{item.simpleDescription}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User's Current Sequence */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Tu Secuencia ({userOrderedSteps.length} / 4 elegidas):
              </span>
              {userOrderedSteps.length > 0 && (
                <button
                  onClick={handleResetOrder}
                  className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar orden</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((pos) => {
                const stepId = userOrderedSteps[pos];
                const stepItem = SPRINT_ORDER_ITEMS.find(s => s.id === stepId);

                return (
                  <div
                    key={pos}
                    className={`p-3 rounded-xl border text-center flex flex-col justify-center min-h-[85px] ${
                      stepItem
                        ? 'bg-slate-800 border-amber-500/50 text-white'
                        : 'border-dashed border-slate-800 text-slate-600 text-xs'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Paso {pos + 1}
                    </span>
                    {stepItem ? (
                      <span className="text-xs font-bold text-amber-300">
                        {stepItem.icon} {stepItem.name.split('. ')[1]}
                      </span>
                    ) : (
                      <span>Pendiente...</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Completion Message */}
          {isOrderComplete && (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-emerald-300 space-y-2 animate-in zoom-in-95">
              <div className="flex items-center space-x-2 font-bold text-base text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <span>¡Excelente! Ese es el orden natural de un Sprint:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                1. <strong>Planificamos</strong> la meta $\rightarrow$ 2. Nos <strong>sincronizamos 15 min diarios</strong> $\rightarrow$ 3. <strong>Mostramos</strong> el producto terminado $\rightarrow$ 4. <strong>Mejoramos</strong> como equipo en la Retrospectiva.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Badges Earned Section */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
          <Award className="w-4 h-4" />
          <span>Tus Insignias de Aprendizaje</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map(b => (
            <div
              key={b.id}
              className={`p-3.5 rounded-xl border flex items-center space-x-3 transition-all ${
                b.unlocked
                  ? 'bg-amber-500/10 border-amber-500/40 text-white'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-60'
              }`}
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <h4 className="text-xs font-bold text-white">{b.name}</h4>
                <p className="text-[11px] text-slate-400">{b.description}</p>
                <span className={`text-[9px] font-bold uppercase ${b.unlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {b.unlocked ? '✓ Desbloqueada' : 'Bloqueada'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <button
          onClick={() => onNavigate('sprint-board')}
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
        >
          ← Ir al Tablero de Sprint
        </button>
        <button
          onClick={() => onNavigate('bibliography')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Ver Bibliografía & Fuentes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
