import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { useSimulation } from '../context/SimulationContext';
import { 
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Heart,
  Sparkles,
  Users,
  PiggyBank,
  Vote
} from 'lucide-react';

export default function DecisionHistory() {
  const { state, profile } = useSimulation();
  const navigate = useNavigate();

  const metricIcons: Record<string, any> = {
    publicTrust: Heart,
    artistLivelihood: Sparkles,
    accessEquity: Users,
    culturalVitality: TrendingUp,
    financialSustainability: PiggyBank,
    politicalCapital: Vote,
  };

  const formatMetricName = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Decision History</h1>
              <p className="text-sm text-primary-foreground/70">
                Timeline of your policy choices and their impacts
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Profile Summary */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-lg border border-border p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Cultural Policy Director</div>
                <div className="text-xl font-bold">{profile.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  City of {profile.city} • Month {state.currentMonth} of 12
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">Decisions Made</div>
                <div className="text-3xl font-bold text-accent">{state.decisions.length}</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border" />

          {state.decisions.length > 0 ? (
            <div className="space-y-8">
              {state.decisions.map((decision, index) => {
                const metricsBefore = state.history[decision.month - 1] || null;
                const metricsAfter = state.history[decision.month] || null;

                return (
                  <motion.div
                    key={decision.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-14 h-14 bg-accent rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                      <Calendar className="w-6 h-6 text-accent-foreground" />
                    </div>

                    {/* Content */}
                    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                      {/* Header */}
                      <div className="bg-primary text-primary-foreground p-5 border-b border-border">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm uppercase tracking-wider">Month {decision.month}</span>
                        </div>
                        <h3 className="text-xl font-bold">{decision.title}</h3>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        {/* Your choice */}
                        <div className="mb-5">
                          <div className="text-sm text-muted-foreground mb-2">Your Decision:</div>
                          <div className="p-4 bg-accent/10 border-l-4 border-accent rounded-r-lg">
                            <div className="font-semibold text-accent mb-1">{decision.choice}</div>
                            <div className="text-sm text-foreground/70">{decision.description}</div>
                          </div>
                        </div>

                        {/* Impact breakdown */}
                        {decision.effects && (
                          <div>
                            <div className="text-sm font-semibold text-muted-foreground mb-3">
                              Metric Changes:
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(decision.effects).map(([key, value]) => {
                                if (value === 0) return null;
                                
                                const MetricIcon = metricIcons[key] || TrendingUp;
                                const beforeValue = metricsBefore ? (metricsBefore[key as keyof typeof metricsBefore] || 0) : 0;
                                const afterValue = metricsAfter ? (metricsAfter[key as keyof typeof metricsAfter] || 0) : beforeValue + value;
                                
                                return (
                                  <div
                                    key={key}
                                    className={`p-3 rounded-lg border ${
                                      value > 0
                                        ? 'bg-emerald-950/30 border-emerald-700'
                                        : 'bg-red-950/30 border-red-700'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <MetricIcon className={`w-4 h-4 ${
                                        value > 0 ? 'text-emerald-400' : 'text-red-400'
                                      }`} />
                                      <span className="text-xs font-medium text-foreground">
                                        {formatMetricName(key)}
                                      </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        {value > 0 ? (
                                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                          <TrendingDown className="w-4 h-4 text-red-400" />
                                        )}
                                        <span className={`text-lg font-bold ${
                                          value > 0 ? 'text-emerald-400' : 'text-red-400'
                                        }`}>
                                          {value > 0 ? '+' : ''}{value}
                                        </span>
                                      </div>
                                      
                                      <div className="text-xs text-foreground/90 font-medium">
                                        {beforeValue} → {afterValue}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Overall state after decision */}
                        {metricsAfter && (
                          <div className="mt-5 pt-5 border-t border-border">
                            <div className="text-sm text-muted-foreground mb-3">
                              Overall Status After Decision:
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                              {Object.entries(metricsAfter).map(([key, value]) => {
                                const MetricIcon = metricIcons[key] || TrendingUp;
                                return (
                                  <div
                                    key={key}
                                    className="text-center p-2 bg-muted/50 rounded"
                                    title={formatMetricName(key)}
                                  >
                                    <MetricIcon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                                    <div className={`text-sm font-bold ${
                                      value >= 75 ? 'text-emerald-600' :
                                      value >= 50 ? 'text-amber-600' :
                                      'text-red-600'
                                    }`}>
                                      {value}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">
                No decisions made yet. Finalize your first month to begin your policy journey.
              </p>
            </motion.div>
          )}
        </div>

        {/* Summary Stats */}
        {state.decisions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/30 p-8"
          >
            <h3 className="text-xl font-bold mb-6">Your Policy Journey So Far</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {state.decisions.length}
                </div>
                <div className="text-sm text-muted-foreground">Major Decisions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {state.currentMonth}
                </div>
                <div className="text-sm text-muted-foreground">Months Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {Math.round(Object.values(state.metrics).reduce((sum, val) => sum + val, 0) / 6)}
                </div>
                <div className="text-sm text-muted-foreground">Average Metric Score</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}