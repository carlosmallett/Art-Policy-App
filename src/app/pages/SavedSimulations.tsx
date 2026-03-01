import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Trash2, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  GitCompare,
  Award,
  MapPin,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { getSavedSimulations, deleteSimulation, formatDate, getRankLabel } from '../utils/simulationStorage';
import type { SavedSimulation } from '../context/SimulationContext';

export default function SavedSimulations() {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState<SavedSimulation[]>([]);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadSimulations();
  }, []);

  const loadSimulations = () => {
    const saved = getSavedSimulations();
    setSimulations(saved);
  };

  const handleDelete = (id: string) => {
    deleteSimulation(id);
    loadSimulations();
    setShowDeleteConfirm(null);
    setSelectedForCompare(prev => prev.filter(simId => simId !== id));
  };

  const toggleCompareSelection = (id: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(simId => simId !== id);
      } else if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedForCompare.length >= 2) {
      navigate(`/compare?ids=${selectedForCompare.join(',')}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Saved Simulations</h1>
                <p className="text-sm text-primary-foreground/70">
                  Review and compare your policy decisions
                </p>
              </div>
            </div>
            
            {selectedForCompare.length >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleCompare}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <GitCompare className="w-4 h-4" />
                Compare {selectedForCompare.length} Simulations
              </motion.button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {simulations.length === 0 ? (
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Saved Simulations</h2>
            <p className="text-muted-foreground mb-6">
              Complete a simulation to save and review your results
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Start New Simulation
            </button>
          </div>
        ) : (
          <>
            {/* Instructions */}
            {selectedForCompare.length > 0 && (
              <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm text-accent font-medium">
                  {selectedForCompare.length === 1 
                    ? 'Select 1 more simulation to compare (max 3)'
                    : `${selectedForCompare.length} simulations selected for comparison`}
                </p>
              </div>
            )}

            {/* Simulations Grid */}
            <div className="grid gap-6">
              {simulations.map((sim) => {
                const rank = getRankLabel(sim.averageScore);
                const isSelected = selectedForCompare.includes(sim.id);
                
                return (
                  <motion.div
                    key={sim.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-card rounded-lg border-2 transition-all overflow-hidden ${
                      isSelected 
                        ? 'border-accent shadow-lg shadow-accent/20' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${rank.color} bg-current/10`}>
                              {rank.label}
                            </div>
                            <div className="text-3xl font-bold">{sim.averageScore}</div>
                            <div className="text-sm text-muted-foreground">/ 100</div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-accent" />
                              <span className="text-muted-foreground">{sim.profile.city}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="w-4 h-4 text-accent" />
                              <span className="text-muted-foreground capitalize">{sim.profile.background}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-accent" />
                              <span className="text-muted-foreground">{formatDate(sim.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleCompareSelection(sim.id)}
                            disabled={!isSelected && selectedForCompare.length >= 3}
                            className={`p-2 rounded-lg transition-all ${
                              isSelected
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted hover:bg-accent/20 text-muted-foreground disabled:opacity-30 disabled:cursor-not-allowed'
                            }`}
                          >
                            <GitCompare className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(sim.id)}
                            className="p-2 bg-muted hover:bg-destructive/20 text-muted-foreground hover:text-destructive rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-6 gap-3">
                        {Object.entries(sim.finalMetrics).map(([key, value]) => (
                          <div key={key} className="bg-muted/30 rounded-lg p-3 text-center">
                            <div className="text-xs text-muted-foreground mb-1 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className={`text-xl font-bold ${
                              value >= 75 ? 'text-emerald-600' : 
                              value >= 50 ? 'text-amber-600' : 
                              'text-red-600'
                            }`}>
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Decision Summary */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {sim.decisions.length} policy decisions made
                          </div>
                          <button
                            onClick={() => navigate(`/simulation-detail/${sim.id}`)}
                            className="text-sm text-accent hover:underline flex items-center gap-1"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl shadow-2xl max-w-md w-full border border-border p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-3">Delete Simulation?</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This action cannot be undone. The simulation data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 px-4 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1 py-2 px-4 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
