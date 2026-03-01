import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, Users, TrendingDown, Briefcase } from 'lucide-react';

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

const backgrounds: Record<string, { title: string; description: string }> = {
  museum: {
    title: 'Museum Professional',
    description: 'You spent years managing large cultural institutions. You understand institutional needs but may face questions about accessibility.',
  },
  artist: {
    title: 'Working Artist',
    description: 'You\'ve lived the artist\'s struggle. You deeply understand creative needs but may need to build political relationships.',
  },
  community: {
    title: 'Community Organizer',
    description: 'You\'ve fought for equitable access to culture. You have grassroots support but may face resistance from traditional institutions.',
  },
};

interface ContextReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  city: string;
  playerName: string;
  background: string;
}

export default function ContextReviewModal({ isOpen, onClose, city, playerName, background }: ContextReviewModalProps) {
  const context = cityContexts[city];
  const bgInfo = backgrounds[background];

  if (!context || !bgInfo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-[60]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-card rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Context Review</h2>
                <p className="text-sm text-primary-foreground/70">Your role and city background</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="space-y-6">
                {/* Player Info */}
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold">Your Profile</h3>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="ml-2 font-semibold">{playerName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">City:</span>
                      <span className="ml-2 font-semibold">{city}</span>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Background:</span>
                      <span className="ml-2 font-semibold">{bgInfo.title}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mt-2 italic">{bgInfo.description}</p>
                  </div>
                </div>

                {/* City Situation */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold">City Situation</h3>
                  </div>
                  <div className="bg-muted/50 border-l-4 border-accent p-5 rounded-r-lg">
                    <p className="text-foreground/80 leading-relaxed">{context.situation}</p>
                  </div>
                </div>

                {/* Current Challenges */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingDown className="w-6 h-6 text-amber-600" />
                    <h3 className="text-xl font-bold">Current Challenges</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {context.challenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-600 flex-shrink-0 mt-2" />
                        <span className="text-sm">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Stakeholders */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold">Key Stakeholders</h3>
                  </div>
                  <div className="space-y-4">
                    {context.stakeholders.map((stakeholder, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-card border border-border rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{stakeholder.name}</h4>
                            <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                          </div>
                        </div>
                        <div className="text-sm text-foreground/80 bg-muted/50 p-3 rounded border-l-2 border-accent">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                            Primary Concern
                          </span>
                          {stakeholder.concern}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/30">
              <button
                onClick={onClose}
                className="w-full py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Close Review
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
