import { useSimulation } from '../context/SimulationContext';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  Users, 
  TrendingUp, 
  PiggyBank, 
  Vote,
  RotateCcw,
  Award,
  AlertTriangle,
  TrendingDown,
  Home,
  Save,
  Check,
  History
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { saveSimulation } from '../utils/simulationStorage';

export default function Results() {
  const { state, profile, restartSimulation } = useSimulation();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const handleRestart = () => {
    restartSimulation();
    navigate('/dashboard');
  };

  const handleHome = () => {
    restartSimulation();
    navigate('/');
  };

  const handleSave = () => {
    if (profile) {
      saveSimulation(
        profile,
        state.metrics,
        state.decisions,
        state.history,
        state.totalBudget,
        state.allocatedBudget
      );
      setIsSaved(true);
    }
  };

  // Prepare data for line chart
  const chartData = state.history.map((metrics, index) => ({
    month: index,
    'Public Trust': metrics.publicTrust,
    'Artist Livelihood': metrics.artistLivelihood,
    'Access & Equity': metrics.accessEquity,
    'Cultural Vitality': metrics.culturalVitality,
    'Financial Sustainability': metrics.financialSustainability,
    'Political Capital': metrics.politicalCapital,
  }));

  // Prepare data for radar chart
  const radarData = [
    { metric: 'Public Trust', value: state.metrics.publicTrust },
    { metric: 'Artist Livelihood', value: state.metrics.artistLivelihood },
    { metric: 'Access & Equity', value: state.metrics.accessEquity },
    { metric: 'Cultural Vitality', value: state.metrics.culturalVitality },
    { metric: 'Financial Sustainability', value: state.metrics.financialSustainability },
    { metric: 'Political Capital', value: state.metrics.politicalCapital },
  ];

  // Calculate overall performance
  const averageScore = Object.values(state.metrics).reduce((sum, val) => sum + val, 0) / 6;
  
  // Determine leadership style
  const getLeadershipStyle = () => {
    const { publicTrust, artistLivelihood, accessEquity, culturalVitality, financialSustainability, politicalCapital } = state.metrics;
    
    if (financialSustainability > 80 && politicalCapital > 75) {
      return {
        title: 'The Pragmatic Steward',
        description: 'You prioritized financial stability and political consensus, ensuring the long-term sustainability of cultural institutions. While sometimes cautious, your approach maintained trust and institutional integrity.',
        icon: PiggyBank,
        color: 'text-blue-600',
      };
    } else if (accessEquity > 80 && artistLivelihood > 75) {
      return {
        title: 'The Equity Champion',
        description: 'You centered community needs and artist welfare, challenging traditional power structures in cultural funding. Your decisions expanded access and supported working creators, though sometimes at the expense of political capital.',
        icon: Users,
        color: 'text-emerald-600',
      };
    } else if (culturalVitality > 80 && artistLivelihood > 70) {
      return {
        title: 'The Cultural Innovator',
        description: 'You took risks to support experimental work and creative vitality. Your vision pushed boundaries and energized the arts ecosystem, creating space for new voices and bold projects.',
        icon: Sparkles,
        color: 'text-purple-600',
      };
    } else if (publicTrust > 80) {
      return {
        title: 'The Consensus Builder',
        description: 'You excelled at maintaining public support and stakeholder relationships. Your balanced approach kept multiple constituencies satisfied, though you sometimes avoided difficult tradeoffs.',
        icon: Heart,
        color: 'text-pink-600',
      };
    } else {
      return {
        title: 'The Challenged Administrator',
        description: 'You navigated competing demands with mixed results. Cultural policy leadership requires difficult tradeoffs—some of your decisions created tensions that proved challenging to resolve.',
        icon: AlertTriangle,
        color: 'text-amber-600',
      };
    }
  };

  const leadershipStyle = getLeadershipStyle();
  const LeadershipIcon = leadershipStyle.icon;

  // Identify achievements and challenges
  const achievements = [];
  const challenges = [];

  Object.entries(state.metrics).forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    if (value >= 80) {
      achievements.push({ label, value, icon: Award });
    } else if (value < 50) {
      challenges.push({ label, value, icon: TrendingDown });
    }
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold mb-2">End of Year Results</h1>
            <p className="text-primary-foreground/70">Your Cultural Policy Leadership Summary</p>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Overall Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground rounded-xl p-8 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase tracking-wider opacity-90 mb-2">Overall Performance</div>
              <div className="text-6xl font-bold">{Math.round(averageScore)}</div>
              <div className="text-sm opacity-90 mt-1">Average Score Across All Metrics</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-2">Year Completed</div>
              <div className="text-4xl font-bold">12/12</div>
              <div className="text-sm opacity-90 mt-1">Months</div>
            </div>
          </div>
        </motion.div>

        {/* Leadership Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-8 mb-8 border border-border shadow-lg"
        >
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-xl bg-muted ${leadershipStyle.color}`}>
              <LeadershipIcon className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3">{leadershipStyle.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{leadershipStyle.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements and Challenges */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold">Achievements</h3>
            </div>
            {achievements.length > 0 ? (
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.label} className="flex items-center justify-between p-3 bg-emerald-950/50 rounded-lg border border-emerald-700">
                    <span className="font-medium text-emerald-100">{achievement.label}</span>
                    <span className="text-2xl font-bold text-emerald-400">{achievement.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No metrics reached the achievement threshold (80+).</p>
            )}
          </motion.div>

          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold">Challenges</h3>
            </div>
            {challenges.length > 0 ? (
              <div className="space-y-3">
                {challenges.map((challenge) => (
                  <div key={challenge.label} className="flex items-center justify-between p-3 bg-red-950/50 rounded-lg border border-red-700">
                    <span className="font-medium text-red-100">{challenge.label}</span>
                    <span className="text-2xl font-bold text-red-400">{challenge.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">All metrics maintained acceptable levels (50+).</p>
            )}
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Metrics Over Time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <h3 className="font-bold mb-4">Metrics Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d4a6d" />
                <XAxis dataKey="month" stroke="#cbd5e1" />
                <YAxis domain={[0, 100]} stroke="#cbd5e1" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f1f3a', 
                    border: '1px solid #2d4a6d',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="Public Trust" stroke="#60a5fa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Artist Livelihood" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Access & Equity" stroke="#a78bfa" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Cultural Vitality" stroke="#fbbf24" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Financial Sustainability" stroke="#22d3ee" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Political Capital" stroke="#f87171" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar Chart - Final State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-xl p-6 border border-border"
          >
            <h3 className="font-bold mb-4">Final Metric Balance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b' }} />
                <Radar name="Your Scores" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl p-6 border border-border mb-8"
        >
          <h3 className="font-bold mb-4">Year Summary</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{state.decisions.length}</div>
              <div className="text-sm text-muted-foreground">Policy Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{state.messages.length}</div>
              <div className="text-sm text-muted-foreground">Stakeholder Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">{state.nodes.length}</div>
              <div className="text-sm text-muted-foreground">Cultural Institutions</div>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={handleRestart}
            className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Simulation
          </button>
          
          <button
            onClick={handleHome}
            className="px-8 py-4 bg-card border-2 border-border text-foreground rounded-lg font-semibold hover:border-accent transition-colors flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return to Home
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isSaved 
                ? 'bg-emerald-500 border-2 border-emerald-500 text-white cursor-default' 
                : 'bg-card border-2 border-border text-foreground hover:border-accent'
            }`}
          >
            {isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? 'Saved Successfully!' : 'Save Simulation'}
          </button>
        </motion.div>

        {isSaved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <button
              onClick={() => navigate('/saved')}
              className="text-accent hover:underline flex items-center gap-2 mx-auto"
            >
              View all saved simulations
              <History className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Reflection Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-muted-foreground text-sm max-w-2xl mx-auto"
        >
          <p>
            Cultural policy leadership requires navigating complex tradeoffs between competing values. 
            Every decision creates ripple effects across institutions, artists, communities, and political landscapes. 
            There is no single "correct" approach—only different philosophies with different consequences.
          </p>
        </motion.div>
      </div>
    </div>
  );
}