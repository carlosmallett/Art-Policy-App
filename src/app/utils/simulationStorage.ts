import type { SavedSimulation, Metrics, PlayerProfile } from '../context/SimulationContext';

const STORAGE_KEY = 'arts_policy_simulations';

export function saveSimulation(
  profile: PlayerProfile,
  finalMetrics: Metrics,
  decisions: any[],
  history: Metrics[],
  totalBudget: number,
  allocatedBudget: Record<string, number>
): SavedSimulation {
  // Calculate average score
  const metricValues = Object.values(finalMetrics);
  const averageScore = metricValues.reduce((sum, val) => sum + val, 0) / metricValues.length;

  const savedSim: SavedSimulation = {
    id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    profile,
    finalMetrics,
    decisions,
    history,
    totalBudget,
    allocatedBudget,
    averageScore: Math.round(averageScore),
  };

  // Get existing simulations
  const existing = getSavedSimulations();
  
  // Add new simulation
  const updated = [savedSim, ...existing];
  
  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save simulation:', error);
  }

  return savedSim;
}

export function getSavedSimulations(): SavedSimulation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to load simulations:', error);
    return [];
  }
}

export function deleteSimulation(id: string): void {
  const existing = getSavedSimulations();
  const filtered = existing.filter(sim => sim.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete simulation:', error);
  }
}

export function getSimulationById(id: string): SavedSimulation | null {
  const simulations = getSavedSimulations();
  return simulations.find(sim => sim.id === id) || null;
}

export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getRankLabel(averageScore: number): { label: string; color: string } {
  if (averageScore >= 85) return { label: 'Excellent', color: 'text-emerald-600' };
  if (averageScore >= 75) return { label: 'Good', color: 'text-blue-600' };
  if (averageScore >= 65) return { label: 'Average', color: 'text-amber-600' };
  if (averageScore >= 50) return { label: 'Below Average', color: 'text-orange-600' };
  return { label: 'Poor', color: 'text-red-600' };
}
