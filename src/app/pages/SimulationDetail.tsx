import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Briefcase, TrendingUp, Award } from 'lucide-react';
import { getSimulationById, formatDate, getRankLabel } from '../utils/simulationStorage';
import type { SavedSimulation } from '../context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SimulationDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [simulation, setSimulation] = useState<SavedSimulation | null>(null);

  useEffect(() => {
    if (id) {
      const sim = getSimulationById(id);
      if (sim) {
        setSimulation(sim);
      } else {
        navigate('/saved');
      }
    }
  }, [id, navigate]);

  if (!simulation) {
    return null;
  }

  const rank = getRankLabel(simulation.averageScore);

  // Prepare historical data for each metric
  const historicalData = simulation.history.map((metrics, index) => ({
    month: index + 1,
    'Public Trust': metrics.publicTrust,
    'Artist Livelihood': metrics.artistLivelihood,
    'Access Equity': metrics.accessEquity,
    'Cultural Vitality': metrics.culturalVitality,
    'Financial Sustainability': metrics.financialSustainability,
    'Political Capital': metrics.politicalCapital,
  }));

  // Group decisions by month
  const decisionsByMonth = simulation.decisions.reduce((acc, decision) => {
    if (!acc[decision.month]) {
      acc[decision.month] = [];
    }
    acc[decision.month].push(decision);
    return acc;
  }, {} as Record<number, typeof simulation.decisions>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/saved')}
              className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Simulation Details</h1>
              <p className="text-sm text-primary-foreground/70">
                {simulation.profile.city} • {formatDate(simulation.timestamp)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-accent" />
                <div>
                  <div className={`text-sm font-bold ${rank.color}`}>{rank.label}</div>
                  <div className="text-3xl font-bold">{simulation.averageScore} / 100</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-medium">City:</span>
                  <span className="text-muted-foreground">{simulation.profile.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-accent" />
                  <span className="font-medium">Background:</span>
                  <span className="text-muted-foreground capitalize">{simulation.profile.background}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="font-medium">Completed:</span>
                  <span className="text-muted-foreground">{formatDate(simulation.timestamp)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Final Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(simulation.finalMetrics).map(([key, value]) => (
                  <div key={key} className="bg-card rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className={`text-2xl font-bold ${
                      value >= 75 ? 'text-emerald-600' : 
                      value >= 50 ? 'text-amber-600' : 
                      'text-red-600'
                    }`}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Historical Performance Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Metrics Over Time</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d4a6d" />
                <XAxis 
                  dataKey="month" 
                  stroke="#cbd5e1"
                  label={{ value: 'Month', position: 'insideBottom', offset: -5, fill: '#cbd5e1' }}
                />
                <YAxis 
                  stroke="#cbd5e1"
                  domain={[0, 100]}
                  label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1f3a', 
                    border: '1px solid #2d4a6d',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Public Trust" stroke="#60a5fa" strokeWidth={2} />
                <Line type="monotone" dataKey="Artist Livelihood" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="Access Equity" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="Cultural Vitality" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="Financial Sustainability" stroke="#a78bfa" strokeWidth={2} />
                <Line type="monotone" dataKey="Political Capital" stroke="#ec4899" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Budget Allocation</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(simulation.allocatedBudget).map(([category, amount]) => {
              const percentage = (amount / simulation.totalBudget) * 100;
              return (
                <div key={category} className="bg-muted/30 rounded-lg p-4">
                  <div className="text-sm text-muted-foreground mb-2 capitalize">{category}</div>
                  <div className="text-xl font-bold mb-1">
                    ${(amount / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-accent">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Decision Timeline */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Decision Timeline</h2>
          <div className="space-y-6">
            {Object.entries(decisionsByMonth).map(([month, decisions]) => (
              <div key={month} className="border-l-4 border-accent pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-lg">Month {month}</h3>
                  <div className="text-sm text-muted-foreground">
                    ({decisions.length} decision{decisions.length !== 1 ? 's' : ''})
                  </div>
                </div>
                <div className="space-y-3">
                  {decisions.map((decision) => (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-muted/30 rounded-lg p-4"
                    >
                      <div className="font-semibold mb-2">{decision.title}</div>
                      <div className="text-sm text-accent mb-3">
                        Choice: {decision.choice}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(decision.effects).map(([key, value]) => {
                          if (value === 0) return null;
                          return (
                            <span
                              key={key}
                              className={`text-xs px-2 py-1 rounded font-medium ${
                                value > 0
                                  ? 'bg-emerald-500/20 text-emerald-700'
                                  : 'bg-red-500/20 text-red-700'
                              }`}
                            >
                              {key.replace(/([A-Z])/g, ' $1').trim()}: {value > 0 ? '+' : ''}{value}
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}