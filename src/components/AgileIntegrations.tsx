import React, { useState } from 'react';
import { UserStory, TabType } from '../types/scrum';
import { TOOL_INTEGRATIONS } from '../data/scrumKnowledge';
import { exportToJiraCSV, exportToTrelloJSON, exportToGitHubMarkdown } from '../utils/scrumEngine';
import { 
  Wrench, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  ArrowRight, 
  ExternalLink, 
  Share2, 
  Code,
  Terminal,
  Zap
} from 'lucide-react';

interface AgileIntegrationsProps {
  stories: UserStory[];
  onExportPerformed: () => void;
  onNavigate: (tab: TabType) => void;
}

export const AgileIntegrations: React.FC<AgileIntegrationsProps> = ({
  stories,
  onExportPerformed,
  onNavigate
}) => {
  const [selectedToolId, setSelectedToolId] = useState<string>('jira');
  const [exportFormat, setExportFormat] = useState<'jira' | 'trello' | 'github'>('jira');
  const [copiedState, setCopiedState] = useState(false);

  const activeTool = TOOL_INTEGRATIONS.find(t => t.id === selectedToolId) || TOOL_INTEGRATIONS[0];

  const getExportContent = () => {
    switch (exportFormat) {
      case 'jira':
        return exportToJiraCSV(stories);
      case 'trello':
        return exportToTrelloJSON(stories, 'Sprint 1 QuickBite');
      case 'github':
        return exportToGitHubMarkdown(stories);
      default:
        return '';
    }
  };

  const handleCopy = () => {
    const text = getExportContent();
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    onExportPerformed();
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extensions = { jira: 'csv', trello: 'json', github: 'md' };
    const mimes = { jira: 'text/csv', trello: 'application/json', github: 'text/markdown' };

    const blob = new Blob([content], { type: mimes[exportFormat] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sprint-export-${exportFormat}.${extensions[exportFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onExportPerformed();
  };

  return (
    <div className="space-y-10 py-6">
      {/* Title */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Wrench className="w-4 h-4" />
          <span>Ecosistema de Software Ágil</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Integración con Herramientas de Gestión
        </h1>
        <p className="mt-2 text-slate-300 text-base max-w-3xl leading-relaxed">
          En el mundo real, los equipos Scrum sincronizan su trabajo a través de plataformas como <strong className="text-white">Jira</strong>, <strong className="text-white">Trello</strong>, <strong className="text-white">GitHub Projects</strong>, <strong className="text-white">Linear</strong> y <strong className="text-white">Azure DevOps</strong>. Aquí puedes exportar tu Sprint actual directamente o aprender a configurar flujos automatizados.
        </p>
      </div>

      {/* Tools Showcase Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {TOOL_INTEGRATIONS.map(tool => {
          const isSelected = tool.id === selectedToolId;
          return (
            <button
              key={tool.id}
              onClick={() => setSelectedToolId(tool.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800 border-amber-500 shadow-md ring-1 ring-amber-500/40 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-amber-400 mb-1">{tool.category.split(' ')[0]}</div>
              <h3 className="text-sm font-extrabold truncate text-white">{tool.name.split(' (')[0]}</h3>
            </button>
          );
        })}
      </div>

      {/* Active Tool Deep Dive */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{activeTool.name}</h2>
            <p className="text-xs text-amber-400 font-medium">{activeTool.category}</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full self-start sm:self-auto">
            Formato: {activeTool.exportFormat}
          </span>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed">
          {activeTool.description}
        </p>

        <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Alineación con el Marco Scrum:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeTool.scrumAlignment}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Funcionalidades Clave para Equipos Ágiles:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {activeTool.keyFeatures.map((feat, i) => (
              <div key={i} className="flex items-start space-x-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/60">
                <span className="text-amber-400">⚡</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Sprint Exporter Hub */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Share2 className="w-4 h-4" />
              <span>Exportador en Vivo del Sprint</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Exportar Tareas del Tablero ({stories.length} Historias)
            </h2>
          </div>

          {/* Formats */}
          <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: 'jira', label: 'Jira (CSV)' },
              { id: 'trello', label: 'Trello (JSON)' },
              { id: 'github', label: 'GitHub (Markdown)' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setExportFormat(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  exportFormat === f.id
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code / Text Preview */}
        <div className="relative">
          <div className="flex items-center justify-between bg-slate-950 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl text-xs text-slate-400 font-mono">
            <span>Vista Previa del Archivo ({exportFormat.toUpperCase()})</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
              >
                {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedState ? '¡Copiado!' : 'Copiar'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-1 text-slate-950 hover:bg-amber-400 bg-amber-500 px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={getExportContent()}
            rows={10}
            className="w-full bg-slate-950/90 text-slate-300 font-mono text-xs p-4 rounded-b-xl border border-slate-800 focus:outline-none resize-none"
          />
        </div>
      </section>

      {/* JQL Cheat Sheet & Automation Tips */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4" />
          <span>Automatizaciones & Consultas JQL</span>
        </div>
        <h3 className="text-xl font-bold text-white">Comandos y Filtros Frecuentes en Equipos Scrum</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 block">JQL: Historias del Sprint Activo no terminadas</span>
            <code className="text-xs font-mono text-slate-300 block bg-slate-900 p-2 rounded border border-slate-800">
              project = "QUICK" AND sprint in openSprints() AND status != "Done"
            </code>
            <p className="text-[11px] text-slate-400">
              Muestra todas las tareas pendientes en el tablero actual para la Daily Scrum.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 block">GitHub PR: Cierre automático al hacer Merge</span>
            <code className="text-xs font-mono text-slate-300 block bg-slate-900 p-2 rounded border border-slate-800">
              git commit -m "feat(auth): add FaceID support. Closes #101"
            </code>
            <p className="text-[11px] text-slate-400">
              Al fusionar la rama a `main`, GitHub moverá la historia a la columna "Done" automáticamente.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          onClick={() => onNavigate('sprint-board')}
          className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
        >
          ← Volver al Tablero de Sprint
        </button>
        <button
          onClick={() => onNavigate('mini-game')}
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
        >
          <span>Ir al Mini Juego de Aprendizaje</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
