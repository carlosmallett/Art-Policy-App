import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  ChevronRight, 
  Briefcase, 
  Building2, 
  Users, 
  DollarSign,
  TrendingDown,
  FileText,
  ArrowRight
} from 'lucide-react';

const backgrounds = [
  {
    id: 'museum',
    title: 'Museum Professional',
    icon: Building2,
    description: 'You spent years managing large cultural institutions. You understand institutional needs but may face questions about accessibility.',
    bonus: 'Start with higher Financial Sustainability (+5)',
  },
  {
    id: 'artist',
    title: 'Working Artist',
    icon: Briefcase,
    description: 'You\'ve lived the artist\'s struggle. You deeply understand creative needs but may need to build political relationships.',
    bonus: 'Start with higher Artist Livelihood (+5)',
  },
  {
    id: 'community',
    title: 'Community Organizer',
    icon: Users,
    description: 'You\'ve fought for equitable access to culture. You have grassroots support but may face resistance from traditional institutions.',
    bonus: 'Start with higher Access & Equity (+5)',
  },
];

const cityContexts: Record<string, {
  situation: string;
  challenges: string[];
  stakeholders: { name: string; role: string; concern: string }[];
}> = {
  Portland: {
    situation: 'Portland\'s DIY arts scene is at a crossroads. Rising housing costs are displacing artists, while established institutions seek more support. The city council is questioning the ROI of cultural spending.',
    challenges: [
      'Gentrification threatening artist communities',
      'Tension between grassroots and institutional arts',
      'Budget scrutiny from fiscal conservatives',
      'Calls for more diverse programming',
    ],
    stakeholders: [
      { name: 'Mayor Thompson', role: 'City Leadership', concern: 'Wants measurable economic impact from arts spending' },
      { name: 'Rosa Martinez', role: 'Community Arts Alliance', concern: 'Fighting for equitable access in marginalized neighborhoods' },
      { name: 'James Park', role: 'Portland Museum of Art', concern: 'Seeking stable funding for exhibitions and operations' },
    ],
  },
  Detroit: {
    situation: 'Detroit is experiencing an arts-driven revival, but the benefits aren\'t reaching all communities. Long-time residents worry about being priced out as new cultural institutions attract investment.',
    challenges: [
      'Ensuring arts revival benefits existing residents',
      'Balancing historic preservation with innovation',
      'Limited budget after bankruptcy recovery',
      'Neighborhood-level cultural infrastructure gaps',
    ],
    stakeholders: [
      { name: 'Mayor Williams', role: 'City Leadership', concern: 'Wants equitable recovery, not just downtown development' },
      { name: 'Keisha Brown', role: 'Eastside Cultural Center', concern: 'Demanding resources for neighborhoods beyond downtown' },
      { name: 'David Chen', role: 'Detroit Institute of Arts', concern: 'Recovering from financial crisis, seeking stability' },
    ],
  },
  Austin: {
    situation: 'Austin\'s identity as a cultural hub is under pressure from rapid tech growth. Artists can\'t afford to live here anymore, and local music venues are closing. The city must decide what cultural values to protect.',
    challenges: [
      'Skyrocketing costs displacing creative class',
      'Venue closures threatening live music scene',
      'Corporate culture vs. Keep Austin Weird',
      'Balancing growth with cultural preservation',
    ],
    stakeholders: [
      { name: 'Mayor Rodriguez', role: 'City Leadership', concern: 'Under pressure from both tech sector and arts community' },
      { name: 'Sarah Mitchell', role: 'Austin Music Coalition', concern: 'Desperate to save live music venues and support musicians' },
      { name: 'Tom Baker', role: 'Blanton Museum', concern: 'Competing for philanthropic dollars with tech causes' },
    ],
  },
  Providence: {
    situation: 'Providence has world-class arts institutions but limited municipal resources. The question is whether to concentrate funding on major anchors or distribute it across smaller organizations.',
    challenges: [
      'Small city budget, big institutional expectations',
      'Town-gown tensions with major universities',
      'Competing needs of anchor institutions vs. emerging artists',
      'Population decline affecting tax base',
    ],
    stakeholders: [
      { name: 'Mayor Santos', role: 'City Leadership', concern: 'Limited resources, wants strategic investments with clear impact' },
      { name: 'Michael Lee', role: 'AS220 Arts Space', concern: 'Advocating for artist-run spaces and experimental work' },
      { name: 'Patricia Hayes', role: 'RISD Museum', concern: 'Seeking municipal support to match institutional scale' },
    ],
  },
  Minneapolis: {
    situation: 'Minneapolis has strong civic arts funding, but post-2020 reckonings have exposed deep inequities. Communities of color are demanding their share of cultural resources and decision-making power.',
    challenges: [
      'Addressing racial equity in cultural funding',
      'Reckoning with institutional power structures',
      'Balancing established orgs with BIPOC-led initiatives',
      'Cold climate limiting outdoor programming',
    ],
    stakeholders: [
      { name: 'Mayor Johnson', role: 'City Leadership', concern: 'Committed to equity but facing political pressure from all sides' },
      { name: 'Amara Washington', role: 'Black Arts Coalition', concern: 'Demanding proportional funding and board representation' },
      { name: 'John Anderson', role: 'Walker Art Center', concern: 'Working to rebuild trust after community conflicts' },
    ],
  },
  'New Orleans': {
    situation: 'New Orleans\' cultural traditions are its identity and economic engine. But culture workers—musicians, artists, craftspeople—struggle to survive. The city must support tradition without turning culture into tourism product.',
    challenges: [
      'Supporting culture bearers and tradition keepers',
      'Avoiding cultural exploitation and appropriation',
      'Hurricane recovery and climate resilience',
      'Balancing tourism economy with authentic culture',
    ],
    stakeholders: [
      { name: 'Mayor Dupree', role: 'City Leadership', concern: 'Protecting cultural authenticity while supporting economy' },
      { name: 'Jerome Johnson', role: 'Musicians Cooperative', concern: 'Musicians can\'t afford to live in the city they made famous' },
      { name: 'Marie Thibodeaux', role: 'Jazz & Heritage Foundation', concern: 'Preserving traditions while ensuring fair compensation' },
    ],
  },
};

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setProfile } = useSimulation();
  const city = location.state?.city || 'Portland';
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('');

  const context = cityContexts[city];
  const totalSteps = 4;

  const handleStart = () => {
    if (name && selectedBackground) {
      setProfile({
        name,
        city,
        background: selectedBackground,
      });
      navigate('/dashboard');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome to {city}</h2>
                <p className="text-sm text-muted-foreground">January 2026</p>
              </div>
            </div>

            <div className="bg-accent/5 border-l-4 border-accent p-6 rounded-r-lg">
              <h3 className="font-semibold mb-3">The Situation</h3>
              <p className="text-foreground/80 leading-relaxed">{context.situation}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Current Challenges</h3>
              <div className="grid grid-cols-1 gap-3">
                {context.challenges.map((challenge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg"
                  >
                    <TrendingDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{challenge}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Key Stakeholders</h2>
                <p className="text-sm text-muted-foreground">People you'll be working with</p>
              </div>
            </div>

            <div className="space-y-4">
              {context.stakeholders.map((stakeholder, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="p-5 bg-card border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{stakeholder.name}</h4>
                      <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                    </div>
                  </div>
                  <div className="text-sm text-foreground/80 bg-muted/50 p-3 rounded border-l-2 border-accent">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Primary Concern</span>
                    {stakeholder.concern}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-amber-900">
                <strong>Note:</strong> Each stakeholder has different priorities. Your decisions will affect your relationships with these groups.
              </p>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Background</h2>
                <p className="text-sm text-muted-foreground">Choose your professional experience</p>
              </div>
            </div>

            <div className="space-y-4">
              {backgrounds.map((bg) => {
                const Icon = bg.icon;
                return (
                  <motion.button
                    key={bg.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedBackground(bg.id)}
                    className={`w-full p-5 rounded-lg border-2 text-left transition-all ${
                      selectedBackground === bg.id
                        ? 'border-accent bg-accent/10 shadow-lg'
                        : 'border-border bg-card hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedBackground === bg.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{bg.title}</h4>
                        <p className="text-sm text-foreground/70 mb-3">{bg.description}</p>
                        <div className="text-xs font-medium text-accent">{bg.bonus}</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your First Day</h2>
                <p className="text-sm text-muted-foreground">Before we begin...</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">What's your name?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="bg-primary text-primary-foreground p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Your Annual Budget</h3>
                <div className="text-4xl font-bold mb-2">$10,000,000</div>
                <p className="text-sm text-primary-foreground/80">
                  This budget must cover museums, performing arts venues, community programs, and arts education 
                  for the entire year. Every dollar you allocate is a dollar that can't go somewhere else.
                </p>
              </div>

              <div className="bg-accent/5 border border-accent/30 p-5 rounded-lg space-y-3">
                <h4 className="font-semibold">Your Mission</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Navigate 12 months of policy decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Balance competing stakeholder interests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Maintain six key metrics of cultural health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>Respond to crises and opportunities as they emerge</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-sm text-amber-900">
                  <strong>Remember:</strong> There are no perfect solutions. Every decision creates tradeoffs. 
                  The goal is to understand systems thinking, not to find a single "right answer."
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    if (step === 3) return selectedBackground !== '';
    if (step === 4) return name.trim() !== '';
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-border shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Arts Policy Lab</h1>
              <p className="text-sm text-primary-foreground/70">{city} Cultural Policy Director</p>
            </div>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-10 h-1.5 rounded-full transition-colors ${
                    idx < step ? 'bg-accent' : 'bg-primary-foreground/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-between"
        >
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Back
            </button>
          )}
          
          <div className="ml-auto">
            {step < totalSteps ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleStart}
                disabled={!canProceed()}
                className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
              >
                Begin Simulation
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
