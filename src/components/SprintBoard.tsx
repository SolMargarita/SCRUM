import React, { useState } from 'react';
import { UserStory, TaskStatus, TaskPriority, TabType } from '../types/scrum';
import { calculateSprintMetrics, canStoryBeMarkedDone } from '../utils/scrumEngine';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  Flame, 
  X, 
  Check, 
  TrendingUp, 
  Kanban,
  FileText,
  Filter,
  CheckSquare
} from 'lucide-react';

interface SprintBoardProps {
  stories: UserStory[];
  setStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
  onSprintCompleted: () => void;
  onNavigate: (tab: TabType) => void;
}

export const SprintBoard: React.FC<SprintBoardProps> = ({
  stories,
  setStories,
  onSprintCompleted,
  onNavigate
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [isSprintReviewOpen, setIsSprintReviewOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [dodWarningStoryId, setDodWarningStoryId] = useState<string | null>(null);

  // New Story Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPersona, setNewPersona] = useState('usuario');
  const [newWant, setNewWant] = useState('');
  const [newSoThat, setNewSoThat] = useState('');
  const [newPoints, setNewPoints] = useState<number>(3);
  const [newPriority, setNewPriority] = useState<TaskPriority>('media');
  const [newTags, setNewTags] = useState('UI, Feature');

  const metrics = calculateSprintMetrics(stories);

  const columns: { id: TaskStatus; label: string; color: string; badgeColor: string }[] = [
    { id: 'backlog', label: 'Product Backlog', color: 'border-slate-700', badgeColor: 'bg-slate-800 text-slate-300' },
    { id: 'todo', label: 'Sprint Backlog (To Do)', color: 'border-blue-900/60', badgeColor: 'bg-blue-950 text-blue-300' },
    { id: 'in_progress', label: 'En Progreso', color: 'border-amber-900/60', badgeColor: 'bg-amber-950 text-amber-300' },
    { id: 'review', label: 'Code Review & QA', color: 'border-purple-900/60', badgeColor: 'bg-purple-950 text-purple-300' },
    { id: 'done', label: 'Hecho (Done)', color: 'border-emerald-900/60', badgeColor: 'bg-emerald-950 text-emerald-300' }
  ];

  const statusOrder: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'review', 'done'];

  const moveStory = (storyId: string, direction: 'forward' | 'backward') => {
    setStories(prev => prev.map(story => {
      if (story.id !== storyId) return story;
      const currentIndex = statusOrder.indexOf(story.status);
      const nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;

      if (nextIndex < 0 || nextIndex >= statusOrder.length) return story;
      const targetStatus = statusOrder[nextIndex];

      // Validate DoD if attempting to move to 'done'
      if (targetStatus === 'done') {
        const { canDone } = canStoryBeMarkedDone(story);
        if (!canDone) {
          setDodWarningStoryId(story.id);
          return story;
        }
      }

      setDodWarningStoryId(null);
      return { ...story, status: targetStatus };
    }));
  };

  const toggleChecklistItem = (storyId: string, checklistId: string) => {
    setStories(prev => prev.map(s => {
      if (s.id !== storyId) return s;
      const updatedChecklist = s.checklist.map(c => 
        c.id === checklistId ? { ...c, completed: !c.completed } : c
      );
      return { ...s, checklist: updatedChecklist };
    }));
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStory: UserStory = {
      id: `US-${String(stories.length + 1).padStart(2, '0')}`,
      title: newTitle.trim(),
      rolePersona: newPersona.trim(),
      want: newWant.trim() || 'usar la funcionalidad',
      soThat: newSoThat.trim() || 'obtener valor del producto',
      storyPoints: newPoints,
      priority: newPriority,
      status: 'todo', // Added straight to sprint todo
      assignee: {
        name: 'Tú (Scrum Team)',
        avatar: '🚀',
        role: 'Fullstack'
      },
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean),
      checklist: [
        { id: `c-new-1`, text: 'Pruebas unitarias completas', completed: false },
        { id: `c-new-2`, text: 'Code review aprobado', completed: false },
        { id: `c-new-3`, text: 'Verificación en QA', completed: false }
      ],
      acceptanceCriteria: ['Funcionalidad probada y documentada']
    };

    setStories(prev => [newStory, ...prev]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewWant('');
    setNewSoThat('');
  };

  const handleCompleteSprint = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSprintReviewOpen(true);
    onSprintCompleted();
  };

  const filteredStories = stories.filter(s => {
    if (filterPriority === 'all') return true;
    return s.priority === filterPriority;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header & Sprint Goal HUD */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Kanban className="w-4 h-4" />
              <span>Sprint 1: QuickBite MVP (En Curso)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Tablero de Sprint de Ejemplo
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              <strong className="text-amber-400">Sprint Goal:</strong> Habilitar autenticación biométrica y seguimiento en tiempo real del repartidor con flujo de pago seguro.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Historia de Usuario</span>
            </button>
            <button
              onClick={handleCompleteSprint}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Finalizar Sprint (Review)</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Velocidad / Puntos Totales</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-white">{metrics.completedPoints}</span>
              <span className="text-xs text-slate-400">/ {metrics.totalPoints} pts</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Progreso del Sprint</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-emerald-400">{metrics.completionRate}%</span>
              <span className="text-xs text-slate-400">completado</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">En Progreso / Review</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-amber-400">{metrics.inProgressPoints}</span>
              <span className="text-xs text-slate-400">pts activos</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-[11px] font-semibold text-slate-400 uppercase">Historias Terminadas</span>
            <div className="flex items-baseline space-x-1.5 mt-1">
              <span className="text-2xl font-black text-cyan-400">{metrics.completedTasks}</span>
              <span className="text-xs text-slate-400">de {metrics.totalTasks} tareas</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
            style={{ width: `${metrics.completionRate}%` }}
          />
        </div>

        {/* Filter Priority Pill Bar */}
        <div className="flex items-center space-x-2 text-xs pt-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-semibold">Filtrar por Prioridad:</span>
          {['all', 'critica', 'alta', 'media', 'baja'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                filterPriority === p
                  ? 'bg-slate-700 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p === 'all' ? 'Todas' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {columns.map(col => {
          const colStories = filteredStories.filter(s => s.status === col.id);
          const colPoints = colStories.reduce((acc, s) => acc + s.storyPoints, 0);

          return (
            <div
              key={col.id}
              className={`bg-slate-900/70 border ${col.color} rounded-2xl p-4 flex flex-col min-h-[520px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white tracking-wide truncate">{col.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${col.badgeColor}`}>
                  {colPoints} pts ({colStories.length})
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colStories.length === 0 ? (
                  <div className="h-32 flex items-center justify-center border border-dashed border-slate-800 rounded-xl text-slate-600 text-xs">
                    Sin historias
                  </div>
                ) : (
                  colStories.map(story => {
                    const isWarning = dodWarningStoryId === story.id;
                    const dodStatus = canStoryBeMarkedDone(story);

                    return (
                      <div
                        key={story.id}
                        className={`bg-slate-800/90 border rounded-xl p-3.5 space-y-3 transition-all hover:border-slate-600 shadow-sm ${
                          isWarning ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-700'
                        }`}
                      >
                        {/* Top Meta */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            {story.id}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {story.storyPoints} pts
                          </span>
                        </div>

                        {/* Story Title */}
                        <h4
                          onClick={() => setSelectedStory(story)}
                          className="text-xs font-bold text-white hover:text-amber-400 cursor-pointer transition-colors leading-snug"
                        >
                          {story.title}
                        </h4>

                        {/* Assignee & Tags */}
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-xs" title={story.assignee.name}>
                            {story.assignee.avatar} <span className="text-[11px] text-slate-300">{story.assignee.name.split(' ')[0]}</span>
                          </span>
                          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            story.priority === 'critica' ? 'bg-rose-950 text-rose-300' :
                            story.priority === 'alta' ? 'bg-orange-950 text-orange-300' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {story.priority}
                          </span>
                        </div>

                        {/* DoD Checklist preview */}
                        {story.checklist.length > 0 && (
                          <div className="pt-2 border-t border-slate-700/60 space-y-1">
                            <span className="text-[9px] font-bold uppercase text-slate-400 block">
                              DoD: {story.checklist.filter(c => c.completed).length}/{story.checklist.length}
                            </span>
                            {story.checklist.map(ci => (
                              <label
                                key={ci.id}
                                className="flex items-center space-x-1.5 text-[10px] text-slate-300 cursor-pointer hover:text-white"
                              >
                                <input
                                  type="checkbox"
                                  checked={ci.completed}
                                  onChange={() => toggleChecklistItem(story.id, ci.id)}
                                  className="w-3 h-3 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-0 cursor-pointer"
                                />
                                <span className={ci.completed ? 'line-through text-slate-500' : ''}>
                                  {ci.text}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}

                        {/* DoD Warning alert */}
                        {isWarning && (
                          <div className="bg-rose-950/40 border border-rose-500 text-rose-300 p-2 rounded text-[10px] flex items-start space-x-1.5">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>
                              ¡No cumple la Definition of Done! Completa todos los items del checklist antes de marcar como Done.
                            </span>
                          </div>
                        )}

                        {/* Navigation / Move buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/40">
                          <button
                            onClick={() => moveStory(story.id, 'backward')}
                            disabled={col.id === 'backlog'}
                            className="p-1.5 rounded-lg bg-slate-750 hover:bg-slate-700 text-slate-300 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Mover a columna anterior"
                            aria-label={`Mover ${story.id} a columna anterior`}
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setSelectedStory(story)}
                            className="text-[10px] text-amber-400 hover:underline font-semibold cursor-pointer"
                          >
                            Detalles
                          </button>

                          <button
                            onClick={() => moveStory(story.id, 'forward')}
                            disabled={col.id === 'done'}
                            className="p-1.5 rounded-lg bg-slate-750 hover:bg-slate-700 text-slate-300 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Avanzar a columna siguiente"
                            aria-label={`Avanzar ${story.id} a columna siguiente`}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Details Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedStory.id}</span>
                <h3 className="text-lg font-bold text-white">{selectedStory.title}</h3>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Formato de Historia de Usuario:</span>
              <p className="text-xs sm:text-sm text-slate-200">
                <strong>Como</strong> {selectedStory.rolePersona},<br />
                <strong>Quiero</strong> {selectedStory.want},<br />
                <strong>Para</strong> {selectedStory.soThat}.
              </p>
            </div>

            {/* Acceptance criteria */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1">Criterios de Aceptación:</span>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                {selectedStory.acceptanceCriteria.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedStory(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Story Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateStory}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Crear Nueva Historia de Usuario</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Título de la Historia</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Ej. Notificaciones push de entrega"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Como (Persona)</label>
                <input
                  type="text"
                  value={newPersona}
                  onChange={e => setNewPersona(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Story Points (Fibonacci)</label>
                <select
                  value={newPoints}
                  onChange={e => setNewPoints(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {[1, 2, 3, 5, 8, 13, 20].map(pt => (
                    <option key={pt} value={pt}>{pt} Puntos</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Quiero (Funcionalidad)</label>
              <input
                type="text"
                value={newWant}
                onChange={e => setNewWant(e.target.value)}
                placeholder="Ej. Recibir avisos cuando el repartidor esté a 2 cuadras"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Para (Beneficio de Negocio)</label>
              <input
                type="text"
                value={newSoThat}
                onChange={e => setNewSoThat(e.target.value)}
                placeholder="Ej. Salir a recibir el pedido a tiempo"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Prioridad</label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as TaskPriority)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white capitalize"
                >
                  {['baja', 'media', 'alta', 'critica'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Etiquetas (separadas por coma)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={e => setNewTags(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer"
              >
                Agregar al Sprint
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sprint Review Summary Modal */}
      {isSprintReviewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">Sprint Review & Retrospectiva</h3>
              </div>
              <button
                onClick={() => setIsSprintReviewOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-4 space-y-2">
              <h4 className="text-sm font-bold text-emerald-400">
                🎉 ¡Sprint 1 Finalizado Exitosamente!
              </h4>
              <p className="text-xs text-slate-200">
                El equipo completó <strong className="text-white">{metrics.completedPoints} Story Points</strong> cumpliendo con la Definición de Hecho (DoD).
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Velocidad</span>
                <span className="text-lg font-black text-amber-400">{metrics.completedPoints} pts</span>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">% Logrado</span>
                <span className="text-lg font-black text-emerald-400">{metrics.completionRate}%</span>
              </div>
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                <span className="text-[10px] text-slate-400 uppercase block">Al Backlog</span>
                <span className="text-lg font-black text-rose-400">{metrics.remainingPoints} pts</span>
              </div>
            </div>

            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-white block">Acciones de Mejora para la Retrospectiva:</span>
              <p>• Automatizar pruebas de integración para no demorar la columna de Code Review.</p>
              <p>• Mantener las reuniones Daily Scrum bajo los 15 minutos exactos.</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsSprintReviewOpen(false);
                  onNavigate('agile-tools');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Exportar a Jira / GitHub
              </button>
              <button
                onClick={() => {
                  setIsSprintReviewOpen(false);
                  onNavigate('mini-game');
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer shadow-md shadow-amber-500/20"
              >
                Jugar el Mini-Juego Scrum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
