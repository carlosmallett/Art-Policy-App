import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Metrics {
  publicTrust: number;
  artistLivelihood: number;
  accessEquity: number;
  culturalVitality: number;
  financialSustainability: number;
  politicalCapital: number;
}

export interface PlayerProfile {
  name: string;
  city: string;
  background: string;
}

export interface SavedSimulation {
  id: string;
  timestamp: number;
  profile: PlayerProfile;
  finalMetrics: Metrics;
  decisions: {
    id: string;
    title: string;
    description: string;
    choice: string;
    effects: Partial<Metrics>;
    month: number;
  }[];
  history: Metrics[];
  totalBudget: number;
  allocatedBudget: Record<string, number>;
  averageScore: number;
}

export interface StakeholderMessage {
  id: string;
  from: string;
  role: string;
  sentiment: 'supportive' | 'neutral' | 'critical';
  preview: string;
  message: string;
  month: number;
}

export interface NewsItem {
  id: string;
  headline: string;
  description: string;
  month: number;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
  options: {
    id: string;
    label: string;
    effects: Partial<Metrics>;
  }[];
}

export interface CulturalNode {
  id: string;
  name: string;
  type: 'museum' | 'venue' | 'community' | 'institution';
  x: number;
  y: number;
  health: number;
  size: number;
}

interface SimulationState {
  currentMonth: number;
  totalBudget: number;
  allocatedBudget: {
    museums: number;
    'performing arts': number;
    'community programs': number;
    'arts education': number;
    'public art': number;
  };
  metrics: Metrics;
  history: Metrics[];
  messages: StakeholderMessage[];
  news: NewsItem[];
  decisions: {
    id: string;
    title: string;
    description: string;
    choice: string;
    effects: Partial<Metrics>;
    month: number;
  }[];
  pendingEffects: Partial<Metrics>; // NEW: accumulate effects for current month
  acknowledgedHeadlines: Set<string>; // NEW: track acknowledged headlines
  nodes: CulturalNode[];
  messageReactions: Record<string, 'like' | 'dislike'>;
  isSimulationComplete: boolean;
}

interface SimulationContextType {
  state: SimulationState;
  profile: PlayerProfile | null;
  setProfile: (profile: PlayerProfile) => void;
  nextMonth: () => void;
  makeDecision: (decisionId: string, title: string, choice: string, effects: Partial<Metrics>) => void;
  updateBudgetAllocation: (category: string, value: number) => void;
  reactToMessage: (messageId: string, liked: boolean) => void;
  acknowledgeHeadline: (newsId: string) => void;
  restartSimulation: () => void;
}

const initialNodes: CulturalNode[] = [
  { id: 'n1', name: 'City Museum', type: 'museum', x: 30, y: 40, health: 80, size: 20 },
  { id: 'n2', name: 'Community Arts Center', type: 'community', x: 60, y: 30, health: 65, size: 15 },
  { id: 'n3', name: 'Downtown Theater', type: 'venue', x: 50, y: 60, health: 70, size: 18 },
  { id: 'n4', name: 'Gallery District', type: 'institution', x: 70, y: 50, health: 75, size: 16 },
  { id: 'n5', name: 'Youth Arts Program', type: 'community', x: 40, y: 70, health: 60, size: 12 },
  { id: 'n6', name: 'Concert Hall', type: 'venue', x: 25, y: 25, health: 85, size: 19 },
  { id: 'n7', name: 'Heritage Center', type: 'institution', x: 80, y: 35, health: 70, size: 14 },
  { id: 'n8', name: 'Studio Collective', type: 'community', x: 45, y: 45, health: 55, size: 13 },
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [state, setState] = useState<SimulationState>({
    currentMonth: 1,
    totalBudget: 10000000,
    allocatedBudget: {
      museums: 2000000,
      'performing arts': 2000000,
      'community programs': 2000000,
      'arts education': 2000000,
      'public art': 2000000,
    },
    metrics: {
      publicTrust: 60,
      artistLivelihood: 60,
      accessEquity: 60,
      culturalVitality: 60,
      financialSustainability: 60,
      politicalCapital: 60,
    },
    history: [
      {
        publicTrust: 60,
        artistLivelihood: 60,
        accessEquity: 60,
        culturalVitality: 60,
        financialSustainability: 60,
        politicalCapital: 60,
      }
    ],
    decisions: [],
    news: [],
    messages: [],
    nodes: initialNodes,
    messageReactions: {},
    isSimulationComplete: false,
    pendingEffects: {}, // NEW: initialize pending effects
    acknowledgedHeadlines: new Set(), // NEW: initialize acknowledged headlines
  });

  const nextMonth = () => {
    setState((prev) => {
      const newMonth = prev.currentMonth + 1;

      if (newMonth > 12) {
        return { ...prev, isSimulationComplete: true };
      }

      // Check for liked messages and consequences
      const likedMessages = prev.messages.filter(
        msg => prev.messageReactions[msg.id] === 'like' && msg.month === prev.currentMonth
      );
      
      let consequenceMetrics: Partial<Metrics> = {};
      
      likedMessages.forEach(msg => {
        // If user liked a message but didn't follow the critique's suggestion
        // Check if any decisions this month align with the message sentiment
        const recentDecisions = prev.decisions.filter(d => d.month === prev.currentMonth);
        
        // If the message was critical and the user liked it, they should have made negative changes
        // If they didn't, apply consequences
        if (msg.sentiment === 'critical') {
          const hasNegativeDecisions = recentDecisions.some(d => {
            const effectValues = Object.values(d.effects);
            return effectValues.some(val => (val || 0) < 0);
          });
          
          // If no negative decisions made despite liking critical feedback, apply penalty
          if (!hasNegativeDecisions && recentDecisions.length > 0) {
            consequenceMetrics.publicTrust = (consequenceMetrics.publicTrust || 0) - 3;
            consequenceMetrics.politicalCapital = (consequenceMetrics.politicalCapital || 0) - 2;
          }
        }
        
        // If the message was supportive and the user liked it, they should have made positive changes
        if (msg.sentiment === 'supportive') {
          const hasPositiveDecisions = recentDecisions.some(d => {
            const effectValues = Object.values(d.effects);
            return effectValues.some(val => (val || 0) > 0);
          });
          
          // If no positive decisions made despite liking supportive feedback, apply small penalty
          if (!hasPositiveDecisions && recentDecisions.length > 0) {
            consequenceMetrics.publicTrust = (consequenceMetrics.publicTrust || 0) - 2;
          }
        }
      });

      // Apply consequence metrics
      const adjustedMetrics = { ...prev.metrics };
      Object.keys(consequenceMetrics).forEach((key) => {
        const metricKey = key as keyof Metrics;
        adjustedMetrics[metricKey] = Math.max(0, Math.min(100, 
          prev.metrics[metricKey] + (consequenceMetrics[metricKey] || 0)
        ));
      });

      // Apply pending effects
      const finalMetrics = { ...adjustedMetrics };
      Object.keys(prev.pendingEffects).forEach((key) => {
        const metricKey = key as keyof Metrics;
        finalMetrics[metricKey] = Math.max(0, Math.min(100, 
          adjustedMetrics[metricKey] + (prev.pendingEffects[metricKey] || 0)
        ));
      });

      // Generate new messages
      const newMessages: StakeholderMessage[] = [];
      
      if (newMonth === 2) {
        newMessages.push({
          id: `msg-${newMonth}-1`,
          from: 'Sarah Chen',
          role: 'Arts Council Chair',
          sentiment: 'neutral',
          preview: 'Budget allocation feedback needed...',
          message: 'I wanted to reach out about the initial budget decisions. The community is watching closely to see how resources are distributed. We need to ensure equity remains a priority.',
          month: newMonth,
        });
      }

      if (newMonth === 4) {
        if (prev.metrics.artistLivelihood < 50) {
          newMessages.push({
            id: `msg-${newMonth}-1`,
            from: 'Marcus Thompson',
            role: 'Local Artist Representative',
            sentiment: 'critical',
            preview: 'Artists are struggling...',
            message: 'Many artists in our community are facing financial hardship. The current policies don\'t seem to be supporting the people who create the art we celebrate.',
            month: newMonth,
          });
        }
      }

      // Generate news
      const newNews: NewsItem[] = [];
      
      if (newMonth === 2) {
        newNews.push({
          id: `news-${newMonth}-1`,
          headline: 'City Council Reviews Cultural Budget',
          description: 'Annual cultural spending comes under scrutiny as economic pressures mount.',
          month: newMonth,
        });
      }

      if (newMonth === 6) {
        newNews.push({
          id: `news-${newMonth}-1`,
          headline: 'Summer Arts Festival Approaches',
          description: 'Major cultural event will test the impact of recent policy decisions.',
          month: newMonth,
        });
      }

      // Update node health based on metrics and budget
      const updatedNodes = prev.nodes.map(node => {
        let healthChange = 0;
        
        if (node.type === 'museum') {
          healthChange = (prev.allocatedBudget.museums / 3500000 - 1) * 5;
        } else if (node.type === 'venue') {
          healthChange = (prev.allocatedBudget['performing arts'] / 3000000 - 1) * 5;
        } else if (node.type === 'community') {
          healthChange = (prev.allocatedBudget['community programs'] / 2500000 - 1) * 5;
        }
        
        // Add some randomness
        healthChange += (Math.random() - 0.5) * 3;
        
        return {
          ...node,
          health: Math.max(20, Math.min(100, node.health + healthChange)),
        };
      });

      return {
        ...prev,
        currentMonth: newMonth,
        metrics: finalMetrics,
        history: [...prev.history, finalMetrics],
        messages: [...prev.messages, ...newMessages],
        news: [...prev.news, ...newNews],
        nodes: updatedNodes,
        pendingEffects: {}, // NEW: reset pending effects
      };
    });
  };

  const makeDecision = (decisionId: string, title: string, choice: string, effects: Partial<Metrics>) => {
    setState((prev) => {
      // NEW: Don't apply effects to metrics yet, just accumulate them
      const accumulatedEffects = { ...prev.pendingEffects };
      
      Object.keys(effects).forEach((key) => {
        const metricKey = key as keyof Metrics;
        accumulatedEffects[metricKey] = (accumulatedEffects[metricKey] || 0) + (effects[metricKey] || 0);
      });

      return {
        ...prev,
        // metrics stay unchanged until finalize
        decisions: [...prev.decisions, { id: decisionId, title, description: '', choice, effects, month: prev.currentMonth }],
        pendingEffects: accumulatedEffects, // NEW: accumulate effects
      };
    });
  };

  const updateBudgetAllocation = (category: string, value: number) => {
    setState((prev) => ({
      ...prev,
      allocatedBudget: {
        ...prev.allocatedBudget,
        [category]: value,
      },
    }));
  };

  const reactToMessage = (messageId: string, liked: boolean) => {
    setState((prev) => ({
      ...prev,
      messageReactions: {
        ...prev.messageReactions,
        [messageId]: liked ? 'like' : 'dislike',
      },
    }));
  };

  const acknowledgeHeadline = (newsId: string) => {
    setState((prev) => ({
      ...prev,
      acknowledgedHeadlines: new Set([...prev.acknowledgedHeadlines, newsId]),
    }));
  };

  const restartSimulation = () => {
    setState({
      currentMonth: 1,
      totalBudget: 10000000,
      allocatedBudget: {
        museums: 2000000,
        'performing arts': 2000000,
        'community programs': 2000000,
        'arts education': 2000000,
        'public art': 2000000,
      },
      metrics: {
        publicTrust: 60,
        artistLivelihood: 60,
        accessEquity: 60,
        culturalVitality: 60,
        financialSustainability: 60,
        politicalCapital: 60,
      },
      history: [
        {
          publicTrust: 60,
          artistLivelihood: 60,
          accessEquity: 60,
          culturalVitality: 60,
          financialSustainability: 60,
          politicalCapital: 60,
        }
      ],
      decisions: [],
      news: [],
      messages: [],
      nodes: initialNodes,
      messageReactions: {},
      isSimulationComplete: false,
      pendingEffects: {},
      acknowledgedHeadlines: new Set(),
    });
  };

  return (
    <SimulationContext.Provider value={{ state, profile, setProfile, nextMonth, makeDecision, updateBudgetAllocation, reactToMessage, acknowledgeHeadline, restartSimulation }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
}