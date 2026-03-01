import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Award } from 'lucide-react';
import { getSimulationById, formatDate, getRankLabel } from '../utils/simulationStorage';
import type { SavedSimulation, Metrics } from '../context/SimulationContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function CompareSimulations() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [simulations, setSimulations] = useState<SavedSimulation[]>([]);

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    const loaded = ids.map(id => getSimulationById(id)).filter(Boolean) as SavedSimulation[];
    setSimulations(loaded);

    if (loaded.length < 2) {
      navigate('/saved');
    }
  }, [searchParams, navigate]);

  if (simulations.length < 2) {
    return null;
  }

  // Prepare data for metrics comparison chart
  const metricsData = Object.keys(simulations[0].finalMetrics).map(metricKey => {
    const dataPoint: any = {
      metric: metricKey.replace(/([A-Z])/g, ' $1').trim(),
    };
    simulations.forEach((sim, idx) => {
      dataPoint[`sim${idx}`] = sim.finalMetrics[metricKey as keyof Metrics];
    });
    return dataPoint;
  });

  // Prepare data for historical trend comparison
  const maxHistoryLength = Math.max(...simulations.map(s => s.history.length));
  const historicalData = Array.from({ length: maxHistoryLength }, (_, i) => {
    const dataPoint: any = { month: i + 1 };
    simulations.forEach((sim, idx) => {
      if (sim.history[i]) {
        const values = Object.values(sim.history[i]);
        const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
        dataPoint[`sim${idx}`] = Math.round(avg);
      }
    });
    return dataPoint;
  });

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

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
              <h1 className="text-2xl font-bold">Compare Simulations</h1>
              <p className="text-sm text-primary-foreground/70">
                Analyzing {simulations.length} simulation runs
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Simulation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim, idx) => {
            const rank = getRankLabel(sim.averageScore);
            return (
              <motion.div
                key={sim.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-lg border-2 border-border p-5"
                style={{ borderColor: colors[idx] }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: colors[idx] }}
                  />
                  <div className="text-sm font-bold text-muted-foreground">
                    Simulation {idx + 1}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-3xl font-bold">{sim.averageScore}</div>
                    <div className={`text-sm font-bold ${rank.color}`}>{rank.label}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {sim.profile.city} • {formatDate(sim.timestamp)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(sim.finalMetrics).map(([key, value]) => (
                    <div key={key} className="bg-muted/30 rounded p-2">
                      <div className="text-muted-foreground mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim().split(' ')[0]}
                      </div>
                      <div className="font-bold">{value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Over Time Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Average Score Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
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
                  label={{ value: 'Average Score', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }}
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
                {simulations.map((sim, idx) => (
                  <Line
                    key={sim.id}
                    type="monotone"
                    dataKey={`sim${idx}`}
                    name={`${sim.profile.city} (${sim.averageScore})`}
                    stroke={colors[idx]}
                    strokeWidth={3}
                    dot={{ fill: colors[idx], r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Radar Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Final Metrics Comparison</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={metricsData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
                {simulations.map((sim, idx) => (
                  <Radar
                    key={sim.id}
                    name={sim.profile.city}
                    dataKey={`sim${idx}`}
                    stroke={colors[idx]}
                    fill={colors[idx]}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metric-by-Metric Comparison */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Detailed Metrics</h2>
          <div className="space-y-4">
            {Object.keys(simulations[0].finalMetrics).map(metricKey => {
              const metricName = metricKey.replace(/([A-Z])/g, ' $1').trim();
              const values = simulations.map(s => s.finalMetrics[metricKey as keyof Metrics]);
              const max = Math.max(...values);
              const min = Math.min(...values);
              const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

              return (
                <div key={metricKey} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">{metricName}</h3>
                    <div className="text-sm text-muted-foreground">
                      Avg: {Math.round(avg)} | Range: {min}-{max}
                    </div>
                  </div>
                  <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${simulations.length}, 1fr)` }}>
                    {simulations.map((sim, idx) => {
                      const value = sim.finalMetrics[metricKey as keyof Metrics];
                      const isMax = value === max;
                      const isMin = value === min && max !== min;
                      
                      return (
                        <div
                          key={sim.id}
                          className={`p-3 rounded-lg border-2 ${
                            isMax ? 'border-emerald-500 bg-emerald-500/10' :
                            isMin ? 'border-red-500 bg-red-500/10' :
                            'border-border bg-muted/30'
                          }`}
                        >
                          <div className="text-2xl font-bold mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            {value > avg ? (
                              <>
                                <TrendingUp className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">+{Math.round(value - avg)}</span>
                              </>
                            ) : value < avg ? (
                              <>
                                <TrendingDown className="w-3 h-3 text-red-600" />
                                <span className="text-red-600">{Math.round(value - avg)}</span>
                              </>
                            ) : (
                              <>
                                <Minus className="w-3 h-3" />
                                <span>Average</span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Winner Summary */}
        <div className="bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold">Best Performance</h2>
          </div>
          {(() => {
            const bestSim = simulations.reduce((best, current) => 
              current.averageScore > best.averageScore ? current : best
            );
            const rank = getRankLabel(bestSim.averageScore);
            
            return (
              <div>
                <div className="text-lg mb-2">
                  <span className="font-semibold">{bestSim.profile.city}</span> achieved the highest score
                </div>
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-bold text-accent">{bestSim.averageScore}</div>
                  <div className={`text-xl font-bold ${rank.color}`}>{rank.label}</div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Completed on {formatDate(bestSim.timestamp)}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}