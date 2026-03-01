import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, Minus, Calendar, Newspaper, AlertCircle, CheckCircle } from 'lucide-react';
import { DetailedMetricChange } from '../utils/metricCalculations';
import { NewsItem } from '../context/SimulationContext';

interface MonthSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: number;
  decisionMade: {
    title: string;
    choice: string;
  } | null;
  metricChanges: DetailedMetricChange[];
  newsItems: NewsItem[];
  consequencesPenalty: {
    applied: boolean;
    reasons: string[];
  };
}

export default function MonthSummaryModal({
  isOpen,
  onClose,
  month,
  decisionMade,
  metricChanges,
  newsItems,
  consequencesPenalty,
}: MonthSummaryModalProps) {
  const getMetricIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return Minus;
  };

  const getMetricColor = (change: number) => {
    if (change > 0) return 'text-emerald-400 bg-emerald-950';
    if (change < 0) return 'text-red-400 bg-red-950';
    return 'text-amber-400 bg-amber-950';
  };

  const getMetricLabel = (key: keyof DetailedMetricChange) => {
    const labels: Record<keyof DetailedMetricChange, string> = {
      publicTrust: 'Public Trust',
      artistLivelihood: 'Artist Livelihood',
      accessEquity: 'Access & Equity',
      culturalVitality: 'Cultural Vitality',
      financialSustainability: 'Financial Sustainability',
      politicalCapital: 'Political Capital',
    };
    return labels[key];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-[70]"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  <div>
                    <h2 className="text-2xl font-bold">Month {month} Summary</h2>
                    <p className="text-sm text-primary-foreground/70">
                      Here's what happened this month
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
              {/* Decision Made */}
              {decisionMade && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-accent/10 border border-accent/30 rounded-lg p-5"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Your Decision</h3>
                      <p className="text-sm text-foreground/80 mb-2">{decisionMade.title}</p>
                      <p className="text-sm font-medium text-accent">Choice: {decisionMade.choice}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Consequences from Message Reactions */}
              {consequencesPenalty.applied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-red-950/50 border border-red-700 rounded-lg p-5"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-red-200 mb-2">Stakeholder Disappointment</h3>
                      <ul className="space-y-1 text-sm text-red-100">
                        {consequencesPenalty.reasons.map((reason, idx) => (
                          <li key={idx}>• {reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* News Items */}
              {newsItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Newspaper className="w-5 h-5" />
                    Breaking News
                  </h3>
                  {newsItems.map((news, idx) => (
                    <div
                      key={news.id}
                      className="bg-muted/50 border border-border rounded-lg p-4"
                    >
                      <h4 className="font-semibold mb-1">{news.headline}</h4>
                      <p className="text-sm text-foreground/80">{news.description}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Metric Changes */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <h3 className="font-bold text-lg">Impact on Key Metrics</h3>
                <div className="grid gap-3">
                  {metricChanges.map((metric, idx) => {
                    const Icon = getMetricIcon(metric.totalChange);
                    return (
                      <motion.div
                        key={metric.metricKey}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + idx * 0.05 }}
                        className="bg-card border border-border rounded-lg p-4"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{metric.metricName}</span>
                              <div className={`p-1 rounded ${getMetricColor(metric.totalChange)}`}>
                                <Icon className="w-3 h-3" />
                              </div>
                            </div>
                            
                            {/* Reasons breakdown */}
                            <div className="space-y-2 mb-3">
                              {metric.reasons.map((reason, reasonIdx) => (
                                <div key={reasonIdx} className="text-xs bg-muted/50 rounded p-2">
                                  <div className="font-medium text-accent mb-1">{reason.source}</div>
                                  <div className="text-foreground/70">{reason.explanation}</div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Final scores */}
                            <div className="flex items-center gap-2 text-sm pt-2 border-t border-border">
                              <span className="text-foreground/90 font-medium">{metric.before}</span>
                              <span className="text-foreground/70">→</span>
                              <span className={metric.totalChange > 0 ? 'text-emerald-400 font-bold' : metric.totalChange < 0 ? 'text-red-400 font-bold' : 'text-foreground font-bold'}>
                                {metric.after}
                              </span>
                              <span className={`text-xs font-bold ${metric.totalChange > 0 ? 'text-emerald-400' : metric.totalChange < 0 ? 'text-red-400' : 'text-foreground/70'}`}>
                                ({metric.totalChange > 0 ? '+' : ''}{metric.totalChange})
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/30">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue to Month {month + 1}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}