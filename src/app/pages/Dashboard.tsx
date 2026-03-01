import { getDecisionForMonth, getDecisionsForMonth } from '../data/monthlyDecisions';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSimulation, Decision } from '../context/SimulationContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Heart, 
  Users, 
  Sparkles, 
  PiggyBank, 
  Vote,
  ChevronRight,
  ArrowRight,
  Info,
  History
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import NewsCard from '../components/NewsCard';
import MessageCard from '../components/MessageCard';
import EcosystemMap from '../components/EcosystemMap';
import ContextReviewModal from '../components/ContextReviewModal';
import NewsHistoryModal from '../components/NewsHistoryModal';
import MonthSummaryModal from '../components/MonthSummaryModal';
import * as Slider from '@radix-ui/react-slider';
import { calculateDetailedMetricChanges } from '../utils/metricCalculations';
import type { Metrics } from '../context/SimulationContext';

export default function Dashboard() {
  const { state, profile, nextMonth, makeDecision, updateBudgetAllocation, acknowledgeHeadline } = useSimulation();
  const navigate = useNavigate();
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [showContextReview, setShowContextReview] = useState(false);
  const [showNewsHistory, setShowNewsHistory] = useState(false);
  const [showMonthSummary, setShowMonthSummary] = useState(false);
  const [decisionsThisMonth, setDecisionsThisMonth] = useState<Decision[]>([]);
  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [completedDecisionIds, setCompletedDecisionIds] = useState<Set<string>>(new Set());
  const [lastDecisionEffects, setLastDecisionEffects] = useState<Partial<Metrics> | null>(null);
  const [budgetAtMonthStart, setBudgetAtMonthStart] = useState<Record<string, number>>({});
  const [summaryData, setSummaryData] = useState<{
    month: number;
    decisionMade: { title: string; choice: string } | null;
    metricsBefore: Metrics;
    newsItems: any[];
  } | null>(null);

  useEffect(() => {
    // Redirect to landing if no profile
    if (!profile) {
      navigate('/');
      return;
    }
    
    if (state.isSimulationComplete) {
      navigate('/results');
    }
  }, [state.isSimulationComplete, profile, navigate]);

  // Load current month's decision
  useEffect(() => {
    const decisions = getDecisionsForMonth(state.currentMonth);
    setDecisionsThisMonth(decisions);
    setCurrentDecisionIndex(0);
    setCurrentDecision(decisions[0] || null);
    setCompletedDecisionIds(new Set()); // Reset completed decisions for new month
  }, [state.currentMonth]);

  const handleDecision = (optionId: string) => {
    if (currentDecision) {
      const option = currentDecision.options.find(opt => opt.id === optionId);
      if (option) {
        makeDecision(
          currentDecision.id,
          currentDecision.title,
          option.label,
          option.effects
        );
        setShowDecisionModal(false);
        setCurrentDecision(null);
        setCompletedDecisionIds(prev => new Set([...prev, currentDecision.id]));
        setLastDecisionEffects(option.effects);
        setSummaryData({
          month: state.currentMonth,
          decisionMade: { title: currentDecision.title, choice: option.label },
          metricsBefore: state.metrics,
          newsItems: state.news
        });
      }
    }
  };

  const handleNextMonth = () => {
    // Capture metrics before nextMonth is called
    const metricsBefore = { ...state.metrics };
    const monthBefore = state.currentMonth;
    const recentDecision = state.decisions.find(d => d.month === state.currentMonth);
    const newsBeforeNextMonth = [...state.news];
    
    // Advance to next month
    nextMonth();
    
    // Show summary with data from this month
    setSummaryData({
      month: monthBefore,
      decisionMade: recentDecision ? {
        title: recentDecision.title,
        choice: recentDecision.choice
      } : null,
      metricsBefore,
      newsItems: newsBeforeNextMonth.filter(n => n.month === monthBefore)
    });
    setShowMonthSummary(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalAllocated = Object.values(state.allocatedBudget).reduce((sum, val) => sum + val, 0);
  const remainingBudget = state.totalBudget - totalAllocated;

  // Check if all current month headlines are acknowledged
  const currentMonthHeadlines = state.news.filter(n => n.month === state.currentMonth);
  const allHeadlinesAcknowledged = currentMonthHeadlines.every(news => 
    state.acknowledgedHeadlines.has(news.id)
  );

  // Check if all current month messages have been reacted to
  const currentMonthMessages = state.messages.filter(m => m.month === state.currentMonth);
  const allMessagesReacted = currentMonthMessages.every(msg => 
    state.messageReactions[msg.id] !== undefined
  );

  // Can make decisions if all headlines acknowledged AND all messages reacted
  const canMakeDecisions = allHeadlinesAcknowledged && allMessagesReacted;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Arts Policy Lab</h1>
            <p className="text-sm text-primary-foreground/70">Cultural Policy Dashboard</p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/history')}
              className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              View History
            </button>
            <div className="text-right">
              <div className="text-sm text-primary-foreground/70">Current Month</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {state.currentMonth} / 12
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard - Three Column Layout */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT COLUMN - Signals & Budget */}
          <div className="col-span-3 space-y-6">
            {/* Budget Summary */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Budget Overview</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Total Budget</div>
                  <div className="text-xl font-bold">{formatCurrency(state.totalBudget)}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                  <div className={`text-lg font-semibold ${remainingBudget < 0 ? 'text-destructive' : 'text-accent'}`}>
                    {formatCurrency(remainingBudget)}
                  </div>
                </div>
              </div>

              {remainingBudget < 0 && (
                <div className="mt-3 p-2 bg-destructive/10 rounded text-xs text-destructive">
                  Budget exceeded! Adjust allocations.
                </div>
              )}
            </div>

            {/* Budget Allocation Sliders */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-4">Funding Allocation</h3>
              
              <div className="space-y-5">
                {Object.entries(state.allocatedBudget).map(([category, value]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm capitalize">{category}</label>
                      <span className="text-sm font-semibold">{formatCurrency(value)}</span>
                    </div>
                    <Slider.Root
                      className="relative flex items-center select-none touch-none w-full h-5"
                      value={[value]}
                      onValueChange={(values) => updateBudgetAllocation(category, values[0])}
                      max={5000000}
                      step={100000}
                    >
                      <Slider.Track className="bg-muted relative grow rounded-full h-2">
                        <Slider.Range className="absolute bg-accent rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb
                        className="block w-5 h-5 bg-accent rounded-full shadow-lg hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent"
                        aria-label={category}
                      />
                    </Slider.Root>
                  </div>
                ))}
              </div>
            </div>

            {/* News Cards */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Headlines</h3>
                <button
                  onClick={() => setShowNewsHistory(true)}
                  className="text-xs text-accent hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {state.news.length > 0 ? (
                  state.news.slice(-3).reverse().map((news) => (
                    <NewsCard
                      key={news.id}
                      newsId={news.id}
                      headline={news.headline}
                      description={news.description}
                      isAcknowledged={state.acknowledgedHeadlines.has(news.id)}
                      onAcknowledge={() => acknowledgeHeadline(news.id)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No news updates yet.</p>
                )}
              </div>
            </div>

            {/* Stakeholder Messages */}
            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-4">Stakeholder Inbox</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {state.messages.length > 0 ? (
                  state.messages.slice(-5).reverse().map((message) => (
                    <MessageCard key={message.id} message={message} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No messages yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN - Cultural Ecosystem */}
          <div className="col-span-6 space-y-6">
            {/* Decision Progress Indicator */}
            {decisionsThisMonth.length > 0 && (
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Month {state.currentMonth} Decisions</h3>
                  <span className="text-xs text-muted-foreground">
                    {completedDecisionIds.size} of {decisionsThisMonth.length} completed
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {decisionsThisMonth.map((decision, idx) => (
                    <button
                      key={decision.id}
                      onClick={() => {
                        setCurrentDecisionIndex(idx);
                        setCurrentDecision(decision);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        completedDecisionIds.has(decision.id)
                          ? 'bg-emerald-950/30 border-emerald-700'
                          : currentDecision?.id === decision.id
                          ? 'bg-accent/10 border-accent'
                          : 'bg-muted/30 border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-xs font-bold mb-1 ${
                          completedDecisionIds.has(decision.id)
                            ? 'text-emerald-600'
                            : currentDecision?.id === decision.id
                            ? 'text-accent'
                            : 'text-muted-foreground'
                        }`}>
                          #{idx + 1}
                        </div>
                        <div className="text-[10px] leading-tight line-clamp-2">
                          {decision.title}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Monthly Decision Card */}
            {currentDecision && (
              <motion.div
                key={currentDecision.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gradient-to-br from-accent/10 to-accent/5 border-2 rounded-lg p-6 ${
                  completedDecisionIds.has(currentDecision.id) ? 'border-emerald-500/50' : 'border-accent/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${completedDecisionIds.has(currentDecision.id) ? 'bg-emerald-500' : 'bg-accent animate-pulse'}`} />
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Decision {currentDecisionIndex + 1} of {decisionsThisMonth.length}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{currentDecision.title}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-3">{currentDecision.description.substring(0, 200)}...</p>
                  </div>
                </div>
                
                {completedDecisionIds.has(currentDecision.id) ? (
                  <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 p-3 rounded-lg border border-emerald-700">
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-sm font-medium">Decision completed! {completedDecisionIds.size < decisionsThisMonth.length ? 'Select next decision above.' : 'Ready to finalize month.'}</span>
                  </div>
                ) : !canMakeDecisions ? (
                  <div className="space-y-2">
                    <motion.button
                      disabled
                      className="w-full py-3 px-4 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2 opacity-50"
                    >
                      <span>Make Policy Decision</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                    <div className="text-xs text-amber-600 bg-amber-500/10 p-2 rounded">
                      {!allHeadlinesAcknowledged && !allMessagesReacted ? (
                        <span>⚠️ Please acknowledge all headlines and respond to all stakeholder messages first</span>
                      ) : !allHeadlinesAcknowledged ? (
                        <span>⚠️ Please acknowledge all headlines first</span>
                      ) : (
                        <span>⚠️ Please respond to all stakeholder messages first</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setShowDecisionModal(true)}
                    className="w-full py-3 px-4 bg-accent text-accent-foreground rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <span>Make Policy Decision</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>
            )}

            <div className="bg-card rounded-lg border border-border p-5">
              <h3 className="font-semibold mb-4">Cultural Ecosystem</h3>
              <div className="h-[500px]">
                <EcosystemMap nodes={state.nodes} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span>Healthy (75%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span>At Risk (50-75%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Critical (&lt;50%)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="text-sm text-muted-foreground mb-1">Active Cultural Nodes</div>
                <div className="text-3xl font-bold">{state.nodes.length}</div>
              </div>
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="text-sm text-muted-foreground mb-1">Policy Decisions Made</div>
                <div className="text-3xl font-bold">{state.decisions.length}</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Metrics & Controls */}
          <div className="col-span-3 space-y-6">
            {/* Key Metrics */}
            <div className="space-y-3">
              <MetricCard
                label="Public Trust"
                value={state.metrics.publicTrust}
                icon={Heart}
                trend={state.history.length > 1 ? state.metrics.publicTrust - state.history[state.history.length - 2].publicTrust : 0}
              />
              <MetricCard
                label="Artist Livelihood"
                value={state.metrics.artistLivelihood}
                icon={Sparkles}
                trend={state.history.length > 1 ? state.metrics.artistLivelihood - state.history[state.history.length - 2].artistLivelihood : 0}
              />
              <MetricCard
                label="Access & Equity"
                value={state.metrics.accessEquity}
                icon={Users}
                trend={state.history.length > 1 ? state.metrics.accessEquity - state.history[state.history.length - 2].accessEquity : 0}
              />
              <MetricCard
                label="Cultural Vitality"
                value={state.metrics.culturalVitality}
                icon={TrendingUp}
                trend={state.history.length > 1 ? state.metrics.culturalVitality - state.history[state.history.length - 2].culturalVitality : 0}
              />
              <MetricCard
                label="Financial Sustainability"
                value={state.metrics.financialSustainability}
                icon={PiggyBank}
                trend={state.history.length > 1 ? state.metrics.financialSustainability - state.history[state.history.length - 2].financialSustainability : 0}
              />
              <MetricCard
                label="Political Capital"
                value={state.metrics.politicalCapital}
                icon={Vote}
                trend={state.history.length > 1 ? state.metrics.politicalCapital - state.history[state.history.length - 2].politicalCapital : 0}
              />
            </div>

            {/* Finalize Month Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextMonth}
              disabled={remainingBudget < 0 || completedDecisionIds.size < decisionsThisMonth.length || !canMakeDecisions}
              className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {completedDecisionIds.size < decisionsThisMonth.length ? (
                <>
                  <span>Complete all {decisionsThisMonth.length} decisions first</span>
                </>
              ) : remainingBudget < 0 ? (
                <>
                  <span>Fix budget first</span>
                </>
              ) : !canMakeDecisions ? (
                <>
                  <span>Acknowledge all headlines and react to all messages first</span>
                </>
              ) : (
                <>
                  Finalize Month {state.currentMonth}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decision Modal */}
      <AnimatePresence>
        {showDecisionModal && currentDecision && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => {}}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] border border-border overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-primary text-primary-foreground p-6 border-b border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm uppercase tracking-wider">Month {state.currentMonth} Decision</span>
                </div>
                <h2 className="text-2xl font-bold">{currentDecision.title}</h2>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                {/* Description with proper paragraph formatting */}
                <div className="mb-6 space-y-3">
                  {currentDecision.description.split('\n\n').map((paragraph, idx) => {
                    // Check if this is a heading (starts with **)
                    if (paragraph.trim().startsWith('**') && paragraph.includes(':**')) {
                      const heading = paragraph.match(/\*\*(.*?):\*\*/)?.[1];
                      const content = paragraph.replace(/\*\*(.*?):\*\*/, '').trim();
                      
                      // Check if content is a list
                      if (content.includes('•')) {
                        return (
                          <div key={idx} className="bg-muted/30 rounded-lg p-4 border border-border">
                            <h3 className="font-bold text-sm mb-3 text-accent">{heading}:</h3>
                            <div className="space-y-2 text-sm text-foreground/80">
                              {content.split('\n').filter(line => line.trim()).map((line, lineIdx) => (
                                <div key={lineIdx} className="flex gap-2">
                                  <span className="text-accent">•</span>
                                  <span className="flex-1">{line.replace('•', '').trim()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="bg-accent/5 rounded-lg p-4 border-l-4 border-accent">
                          <h3 className="font-bold text-sm mb-2 text-accent">{heading}:</h3>
                          <p className="text-sm text-foreground/80">{content}</p>
                        </div>
                      );
                    }
                    
                    // Check if this is stakeholder positions
                    if (paragraph.includes('Stakeholder Positions:')) {
                      const lines = paragraph.split('\n').filter(line => line.trim());
                      return (
                        <div key={idx} className="bg-muted/30 rounded-lg p-4 border border-border">
                          <h3 className="font-bold text-sm mb-3 text-accent">Stakeholder Positions:</h3>
                          <div className="space-y-3">
                            {lines.slice(1).map((line, lineIdx) => {
                              const match = line.match(/^-\s*(.*?):\s*"(.*)"/);
                              if (match) {
                                const [, stakeholder, quote] = match;
                                return (
                                  <div key={lineIdx} className="bg-card rounded p-3 border-l-2 border-accent/50">
                                    <div className="font-semibold text-xs text-accent mb-1">{stakeholder}</div>
                                    <div className="text-xs italic text-foreground/70">"{quote}"</div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      );
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={idx} className="text-sm text-foreground/80 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    );
                  })}
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg mb-3">Choose Your Approach:</h3>
                  {currentDecision.options.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleDecision(option.id)}
                      className="w-full text-left p-5 bg-muted/50 hover:bg-accent/10 rounded-lg border border-border hover:border-accent transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-semibold mb-3 group-hover:text-accent transition-colors">
                            {option.label}
                          </div>
                          
                          {/* Effects Preview */}
                          <div className="flex flex-wrap gap-2 text-xs">
                            {Object.entries(option.effects).map(([key, value]) => {
                              if (value === 0) return null;
                              return (
                                <span
                                  key={key}
                                  className={`px-2 py-1 rounded font-medium ${
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
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Modal Footer - Show review button for all decisions */}
              {profile && (
                <div className="p-6 border-t border-border bg-muted/30">
                  <button
                    onClick={() => setShowContextReview(true)}
                    className="w-full py-3 px-4 border-2 border-accent/30 text-accent rounded-lg font-medium hover:bg-accent/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Review City Context & Stakeholders
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Review Modal */}
      {profile && (
        <ContextReviewModal
          isOpen={showContextReview}
          onClose={() => setShowContextReview(false)}
          city={profile.city}
          playerName={profile.name}
          background={profile.background}
        />
      )}

      {/* News History Modal */}
      {profile && (
        <NewsHistoryModal
          isOpen={showNewsHistory}
          onClose={() => setShowNewsHistory(false)}
          news={state.news}
        />
      )}

      {/* Month Summary Modal */}
      {profile && summaryData && (
        <MonthSummaryModal
          isOpen={showMonthSummary}
          onClose={() => {
            setShowMonthSummary(false);
            setSummaryData(null);
          }}
          month={summaryData.month}
          decisionMade={summaryData.decisionMade}
          metricChanges={calculateDetailedMetricChanges(summaryData.metricsBefore, state.metrics)}
          newsItems={state.news.filter(n => n.month === summaryData.month + 1)}
          consequencesPenalty={{
            applied: false,
            reasons: []
          }}
        />
      )}
    </div>
  );
}