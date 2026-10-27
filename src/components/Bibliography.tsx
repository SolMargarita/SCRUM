import React, { useState } from 'react';
import { BIBLIOGRAPHY } from '../data/scrumKnowledge';
import { ReferenceSource, TabType } from '../types/scrum';
import { 
  BookOpen, 
  ExternalLink, 
  Quote, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  Bookmark,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface BibliographyProps {
  onNavigate: (tab: TabType) => void;
}

export const Bibliography: React.FC<BibliographyProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Oficial', 'Libro Fundacional', 'Metodología & Estimación', 'Liderazgo'];

  const filteredReferences = BIBLIOGRAPHY.filter(ref => {
    if (selectedCategory === 'all') return true;
    return ref.category === selectedCategory;
  });

  return (
    <div className="space-y-10 py-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Rigor Académico & Fuentes Oficiales</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Bibliografía & Referencias
        </h1>
        <p className="mt-2 text-slate-300 text-base max-w-3xl leading-relaxed">
          Todo el contenido de esta guía interactiva está respaldado por los documentos canónicos del movimiento ágil y las obras de los pioneros de Scrum: Ken Schwaber, Jeff Sutherland, Mike Cohn y Jeff Patton.
        </p>

        {/* Categories Bar */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtrar por:</span>
          </span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Todas las Fuentes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* References Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReferences.map(source => (
          <div
            key={source.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                  {source.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">{source.year}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {source.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {source.authors} • <span className="text-slate-500">{source.publisherOrOrg}</span>
                </p>
              </div>

              <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60 text-xs text-slate-300">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                  Aporte Principal al Marco:
                </span>
                {source.contribution}
              </div>

              <div className="relative pl-4 border-l-2 border-amber-500/60 italic text-xs text-slate-300 leading-relaxed">
                <Quote className="w-3.5 h-3.5 text-amber-500/40 absolute -left-2 -top-2" />
                "{source.quote}"
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Formato APA 7ma Edición</span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Fuente Original</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Reading Pathways */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>Rutas de Aprendizaje Recomendadas</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">¿Por dónde comenzar a leer según tu rol?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-amber-400 block">Para Product Owners</span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>1. Scrum Guide (Sección Artefactos y Product Goal)</li>
              <li>2. User Story Mapping (Jeff Patton)</li>
              <li>3. Agile Estimating and Planning (Mike Cohn)</li>
            </ul>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400 block">Para Scrum Masters & Coaches</span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>1. Scrum Guide (Completa, foco en cuenta responsabilidades)</li>
              <li>2. Scrum Mastery (Geoff Watts)</li>
              <li>3. Scrum: The Art of Doing Twice the Work (Jeff Sutherland)</li>
            </ul>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-emerald-400 block">Para Desarrolladores (Devs)</span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>1. Definition of Done (Scrum Guide)</li>
              <li>2. Manifiesto Ágil (12 Principios técnicos de XP)</li>
              <li>3. Planning Poker y estimación por Fibonacci</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={() => onNavigate('what-is-scrum')}
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
        >
          ← Volver al Inicio
        </button>
        <button
          onClick={() => onNavigate('sprint-board')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Probar el Tablero de Sprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
