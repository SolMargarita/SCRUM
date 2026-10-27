import React, { useState } from 'react';
import { SCRUM_PILLARS, SCRUM_VALUES, WATERFALL_VS_SCRUM } from '../data/scrumKnowledge';
import { 
  Eye, 
  SearchCheck, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Users, 
  Sparkles,
  Zap,
  Repeat,
  Scale
} from 'lucide-react';
import { TabType } from '../types/scrum';

interface WhatIsScrumProps {
  onNavigate: (tab: TabType) => void;
}

export const WhatIsScrum: React.FC<WhatIsScrumProps> = ({ onNavigate }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('transparency');
  const [valueViewMode, setValueViewMode] = useState<'practica' | 'definicion'>('practica');
  const [comparisonFilter, setComparisonFilter] = useState<number | null>(null);

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'Eye': return <Eye className="w-6 h-6 text-amber-400" />;
      case 'SearchCheck': return <SearchCheck className="w-6 h-6 text-cyan-400" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6 text-emerald-400" />;
      default: return <Sparkles className="w-6 h-6 text-indigo-400" />;
    }
  };

  const activePillar = SCRUM_PILLARS.find(p => p.id === selectedPillarId) || SCRUM_PILLARS[0];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/60 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Fundamentos de Agilidad</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            ¿Qué es <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Scrum</span>?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Scrum es un <strong className="text-white">marco de trabajo adaptativo y liviano</strong> que ayuda a las personas, equipos y organizaciones a generar valor de manera colaborativa a través de soluciones incrementales para <strong className="text-amber-300">problemas complejos</strong>.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <span className="text-amber-400 font-bold">1995:</span>
              <span>Creado por Ken Schwaber y Jeff Sutherland</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <span className="text-rose-400 font-bold">🏉 Metáfora:</span>
              <span>Proviene del Rugby (melé/scrum)</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
              <span className="text-emerald-400 font-bold">🌱 Empirismo:</span>
              <span>Conocimiento basado en la experiencia real</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('how-it-works')}
              className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <span>Ver Cómo Funciona</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('sprint-board')}
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Repeat className="w-4 h-4 text-indigo-400" />
              <span>Simular un Sprint Real</span>
            </button>
          </div>
        </div>
      </section>

      {/* Los 3 Pilares Empíricos */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-amber-400 text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Columna Vertebral de Scrum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Los 3 Pilares del Empirismo
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Scrum se basa en el empirismo y en el pensamiento Lean (eliminar desperdicio). El empirismo afirma que el conocimiento proviene de la experiencia y de tomar decisiones basadas en lo que se observa.
          </p>
        </div>

        {/* Interactive Pillar Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {SCRUM_PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`text-left p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  {isSelected && (
                    <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full font-semibold">
                      Seleccionado
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white">{pillar.name}</h3>
                <p className="text-xs text-amber-400 font-medium mt-1">{pillar.tagline}</p>
                <p className="text-xs text-slate-400 mt-3 line-clamp-2">{pillar.description}</p>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Box */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
              {getPillarIcon(activePillar.iconName)}
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Profundizando en el Pilar</span>
              <h4 className="text-xl sm:text-2xl font-bold text-white">{activePillar.name}</h4>
            </div>
          </div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {activePillar.description}
          </p>
          <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Ejemplo real en el equipo:</span>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">{activePillar.example}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Los 5 Valores de Scrum */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 text-sm font-semibold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              <span>Cultura & Mentalidad</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Los 5 Valores de Scrum
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Cuando el equipo Scrum encarna estos valores, los pilares de transparencia, inspección y adaptación cobran vida y generan confianza.
            </p>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setValueViewMode('practica')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                valueViewMode === 'practica'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              En la Práctica
            </button>
            <button
              onClick={() => setValueViewMode('definicion')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                valueViewMode === 'definicion'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Definición Oficial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {SCRUM_VALUES.map((val) => (
            <div
              key={val.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${val.color} mb-4`} />
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {val.name}
                </h3>
                <div className="mt-3 text-xs text-slate-300 leading-relaxed min-h-[90px]">
                  {valueViewMode === 'practica' ? (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400/90 block mb-1">
                        🎯 Comportamiento Real:
                      </span>
                      {val.inPractice}
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        📖 Guía Scrum:
                      </span>
                      {val.description}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Valor Clave</span>
                <span className="text-emerald-400 font-semibold">Esencial</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Waterfall vs Scrum Comparativa Interactiva */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Cambio de Paradigma</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Cascada (Waterfall) vs Scrum
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Comprende por qué el desarrollo secuencial tradicional falla en proyectos de software modernos y cómo el ciclo ágil mitiga la incertidumbre.
          </p>
        </div>

        <div className="space-y-3">
          {WATERFALL_VS_SCRUM.map((item, index) => {
            const isHighlighted = comparisonFilter === index;
            return (
              <div
                key={index}
                onClick={() => setComparisonFilter(isHighlighted ? null : index)}
                className={`rounded-2xl border transition-all cursor-pointer p-5 ${
                  isHighlighted
                    ? 'bg-slate-800/90 border-amber-500 ring-1 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
                role="button"
                tabIndex={0}
                aria-expanded={isHighlighted}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Aspecto {index + 1}: {item.aspect}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isHighlighted ? 'Haz clic para contraer' : 'Haz clic para resaltar'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Waterfall side */}
                  <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-3.5">
                    <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold mb-1">
                      <span>❌ Modelo Tradicional (Cascada)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">{item.waterfall}</p>
                  </div>

                  {/* Scrum side */}
                  <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-3.5">
                    <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
                      <span>✅ Modelo Ágil (Scrum)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300">{item.scrum}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Next Steps */}
      <section className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-white">¿Listo para conocer los engranajes de Scrum?</h3>
          <p className="text-sm text-slate-400">
            Descubre los 3 Roles, los 5 Eventos con sus timeboxes y los 3 Artefactos oficiales.
          </p>
        </div>
        <button
          onClick={() => onNavigate('how-it-works')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
        >
          <span>Ir a ¿Cómo Funciona?</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};
