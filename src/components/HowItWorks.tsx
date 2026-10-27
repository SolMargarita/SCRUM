import React, { useState } from 'react';
import { SCRUM_ROLES, SCRUM_EVENTS, SCRUM_ARTIFACTS } from '../data/scrumKnowledge';
import { 
  Crown, 
  ShieldCheck, 
  Code2, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  Layers, 
  Workflow, 
  Target,
  Sparkles,
  Users
} from 'lucide-react';
import { TabType } from '../types/scrum';

interface HowItWorksProps {
  onNavigate: (tab: TabType) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const [selectedSubTab, setSelectedSubTab] = useState<'roles' | 'eventos' | 'artefactos' | 'ciclo'>('ciclo');
  const [sprintDurationWeeks, setSprintDurationWeeks] = useState<number>(2);
  const [activeCycleStep, setActiveCycleStep] = useState<number>(1);
  const [activeRoleTab, setActiveRoleTab] = useState<string>('scrum-master');

  const getRoleIcon = (icon: string) => {
    switch (icon) {
      case 'Crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-emerald-400" />;
      default: return <Users className="w-5 h-5 text-indigo-400" />;
    }
  };

  // Dynamic timebox calculation based on Sprint duration in weeks
  const getTimeboxDetails = (eventId: string, weeks: number) => {
    switch (eventId) {
      case 'sprint':
        return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} de duración fija`;
      case 'sprint-planning':
        return `Máximo ${weeks * 2} horas (para un sprint de ${weeks} sem)`;
      case 'daily-scrum':
        return '15 minutos exactos (diario)';
      case 'sprint-review':
        return `Máximo ${weeks * 1} horas`;
      case 'sprint-retrospective':
        return `Máximo ${Math.round(weeks * 0.75 * 10) / 10} horas`;
      default:
        return 'Timebox oficial';
    }
  };

  const cycleSteps = [
    {
      step: 1,
      title: '1. Refinamiento del Backlog',
      description: 'El Product Owner y el equipo descomponen y estiman historias del Product Backlog para dejarlas listas (Definition of Ready).',
      attendees: 'Todo el Equipo Scrum',
      output: 'Historias preparadas y estimadas con criterios de aceptación claros.'
    },
    {
      step: 2,
      title: '2. Sprint Planning',
      description: 'Se define el Sprint Goal (Por qué), se seleccionan las historias del Backlog (Qué) y se desglosan en tareas técnicas (Cómo).',
      attendees: 'Equipo Scrum completo',
      output: 'Sprint Goal formal + Sprint Backlog acordado.'
    },
    {
      step: 3,
      title: '3. Desarrollo & Daily Scrum',
      description: 'Los desarrolladores construyen el software. Cada 24h realizan la Daily Scrum de 15 minutos para inspeccionar y sincronizarse hacia la meta.',
      attendees: 'Desarrolladores (PO y SM asisten si apoyan)',
      output: 'Progreso diario y eliminación temprana de impedimentos.'
    },
    {
      step: 4,
      title: '4. Sprint Review',
      description: 'Se demuestra el Incremento utilizable terminado a los clientes y stakeholders. Se recopila feedback real del mercado.',
      attendees: 'Equipo Scrum + Stakeholders & Clientes',
      output: 'Product Backlog actualizado con nuevos aprendizajes.'
    },
    {
      step: 5,
      title: '5. Sprint Retrospective',
      description: 'El equipo inspecciona cómo trabajaron juntos (procesos, relaciones, herramientas) y elige 1-2 mejoras para el próximo Sprint.',
      attendees: 'Exclusivamente el Equipo Scrum',
      output: 'Acciones de mejora concretas añadidas al siguiente Backlog.'
    }
  ];

  return (
    <div className="space-y-10 py-6">
      {/* Title Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Workflow className="w-4 h-4" />
          <span>Mecanismos & Estructura</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          ¿Cómo Funciona <span className="text-amber-400">Scrum</span>?
        </h1>
        <p className="mt-2 text-slate-300 text-base max-w-3xl leading-relaxed">
          Scrum se compone de <strong className="text-white">3 Roles</strong> con responsabilidades claras, <strong className="text-white">5 Eventos</strong> con timeboxes definidos y <strong className="text-white">3 Artefactos</strong> con compromisos formales para maximizar la transparencia.
        </p>

        {/* Sub-navigation tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            { id: 'ciclo', label: 'Ciclo del Sprint (Flujo)', icon: <Workflow className="w-4 h-4" /> },
            { id: 'roles', label: 'Los 3 Roles', icon: <Users className="w-4 h-4" /> },
            { id: 'eventos', label: 'Los 5 Eventos', icon: <Clock className="w-4 h-4" /> },
            { id: 'artefactos', label: 'Los 3 Artefactos', icon: <Layers className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all cursor-pointer ${
                selectedSubTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Subtab 1: CICLO VISUAL DEL SPRINT */}
      {selectedSubTab === 'ciclo' && (
        <section className="space-y-8">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>El Ciclo de Vida del Sprint Interactivo</span>
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Haz clic en cada paso del flujo para inspeccionar las actividades clave, los participantes y el resultado esperado.
            </p>

            {/* Stepper buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {cycleSteps.map(step => {
                const isCurrent = activeCycleStep === step.step;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveCycleStep(step.step)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/40'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-400 mb-1">Paso {step.step}</div>
                    <div className="text-xs sm:text-sm font-semibold truncate">{step.title.split('. ')[1]}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Step Details */}
            {(() => {
              const current = cycleSteps.find(s => s.step === activeCycleStep) || cycleSteps[0];
              return (
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                    <h3 className="text-xl font-bold text-white text-amber-300">{current.title}</h3>
                    <span className="text-xs font-semibold bg-slate-700 px-3 py-1 rounded-full text-slate-300">
                      Asisten: {current.attendees}
                    </span>
                  </div>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {current.description}
                  </p>
                  <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex items-start space-x-3">
                    <Target className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                        Entregable / Resultado Clave:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1">{current.output}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Subtab 2: LOS 3 ROLES */}
      {selectedSubTab === 'roles' && (
        <section className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {SCRUM_ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => setActiveRoleTab(role.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                  activeRoleTab === role.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {getRoleIcon(role.icon)}
                <span>{role.title}</span>
              </button>
            ))}
          </div>

          {/* Active Role Detailed Card */}
          {(() => {
            const role = SCRUM_ROLES.find(r => r.id === activeRoleTab) || SCRUM_ROLES[0];
            return (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
                  <div className={`p-4 rounded-2xl border ${role.color}`}>
                    {getRoleIcon(role.icon)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{role.title}</h2>
                    <p className="text-sm text-amber-400 font-medium">{role.subtitle}</p>
                  </div>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Pregunta Central que responde este rol:
                  </span>
                  <p className="text-sm font-semibold text-white italic">"{role.keyQuestion}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Accountabilities */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                      <Check className="w-4 h-4" />
                      <span>Responsabilidades Clave</span>
                    </h3>
                    <ul className="space-y-2">
                      {role.accountabilities.map((acc, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Anti-patterns */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Antipatrones a Evitar</span>
                    </h3>
                    <ul className="space-y-2">
                      {role.antiPatterns.map((anti, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                          <span className="text-rose-400 mt-0.5">✕</span>
                          <span>{anti}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* Subtab 3: LOS 5 EVENTOS */}
      {selectedSubTab === 'eventos' && (
        <section className="space-y-8">
          {/* Interactive Sprint Duration Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Simulador de Timebox Oficial
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Selecciona la duración de tu Sprint:
              </h3>
              <p className="text-xs text-slate-400">
                Observa cómo se recalculan automáticamente los límites de tiempo de cada evento según la Guía Scrum.
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              {[1, 2, 3, 4].map(w => (
                <button
                  key={w}
                  onClick={() => setSprintDurationWeeks(w)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sprintDurationWeeks === w
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {w} {w === 1 ? 'Semana' : 'Semanas'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {SCRUM_EVENTS.map(event => (
              <div
                key={event.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Asistentes: {event.participants}</p>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-semibold self-start sm:self-auto">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getTimeboxDetails(event.id, sprintDurationWeeks)}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {event.purpose}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                    <span className="font-bold text-amber-400 block mb-1">Entradas necesarias:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {event.inputs.map((inp, idx) => <li key={idx}>{inp}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
                    <span className="font-bold text-emerald-400 block mb-1">Salidas generadas:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {event.outputs.map((out, idx) => <li key={idx}>{out}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subtab 4: LOS 3 ARTEFACTOS Y SUS COMPROMISOS */}
      {selectedSubTab === 'artefactos' && (
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCRUM_ARTIFACTS.map(art => (
              <div
                key={art.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {art.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {art.description}
                  </p>

                  {/* Formal Commitment Box */}
                  <div className="bg-slate-800/90 border border-amber-500/40 rounded-xl p-3.5 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                      Compromiso Oficial Asociado:
                    </span>
                    <h4 className="text-sm font-bold text-white">{art.commitment}</h4>
                    <p className="text-xs text-slate-300">{art.commitmentDescription}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase text-slate-400 block">
                      Características Clave:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {art.characteristics.map((c, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-amber-400">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={() => onNavigate('what-is-scrum')}
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
        >
          ← Volver a ¿Qué es Scrum?
        </button>
        <button
          onClick={() => onNavigate('interactive-examples')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Ir a Ejemplos Interactivos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
