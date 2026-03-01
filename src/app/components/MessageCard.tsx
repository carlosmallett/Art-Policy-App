import { motion } from 'motion/react';
import { Mail, ThumbsUp, MinusCircle, ThumbsDown, Heart, HeartOff } from 'lucide-react';
import { StakeholderMessage } from '../context/SimulationContext';
import { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

interface MessageCardProps {
  message: StakeholderMessage;
}

export default function MessageCard({ message }: MessageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { reactToMessage, state } = useSimulation();
  
  const reaction = state.messageReactions[message.id];
  const isCurrentMonth = message.month === state.currentMonth;
  const needsReaction = isCurrentMonth && !reaction;

  const getSentimentIcon = () => {
    if (message.sentiment === 'supportive') return ThumbsUp;
    if (message.sentiment === 'critical') return ThumbsDown;
    return MinusCircle;
  };

  const getSentimentColor = () => {
    if (message.sentiment === 'supportive') return 'text-emerald-400 bg-emerald-950';
    if (message.sentiment === 'critical') return 'text-red-400 bg-red-950';
    return 'text-amber-400 bg-amber-950';
  };

  const Icon = getSentimentIcon();

  const handleReaction = (e: React.MouseEvent, liked: boolean) => {
    e.stopPropagation();
    reactToMessage(message.id, liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card rounded-lg border transition-colors overflow-hidden ${
        needsReaction 
          ? 'border-amber-500/70 bg-amber-500/5 shadow-lg shadow-amber-500/20' 
          : reaction 
          ? 'border-emerald-500/50 bg-emerald-500/5'
          : 'border-border hover:border-accent/50'
      }`}
    >
      <div className="p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate">{message.from}</h4>
              <div className={`p-1 rounded ${getSentimentColor()}`}>
                <Icon className="w-3 h-3" />
              </div>
              {needsReaction && (
                <span className="text-[10px] px-2 py-0.5 bg-amber-500 text-white rounded-full font-bold uppercase">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{message.role}</p>
          </div>
          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </div>
        
        <p className="text-sm text-foreground/80 line-clamp-2">{message.preview}</p>
        
        {needsReaction && (
          <div className="mt-2 text-xs text-amber-600 font-medium">
            👆 Click to expand and respond
          </div>
        )}
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-4 pb-4 border-t border-border pt-3"
        >
          <p className="text-sm text-foreground/90 mb-3">{message.message}</p>
          
          {/* Reaction Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleReaction(e, true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                reaction === 'like'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-muted hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${reaction === 'like' ? 'fill-current' : ''}`} />
              Agree
            </button>
            <button
              onClick={(e) => handleReaction(e, false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                reaction === 'dislike'
                  ? 'bg-red-500 text-white'
                  : 'bg-muted hover:bg-red-500/10 text-muted-foreground hover:text-red-600'
              }`}
            >
              <HeartOff className="w-3.5 h-3.5" />
              Disagree
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}