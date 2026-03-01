import { motion } from 'motion/react';
import { Newspaper, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';

interface NewsCardProps {
  headline: string;
  description: string;
  type?: 'positive' | 'negative' | 'neutral';
  newsId: string;
  isAcknowledged: boolean;
  onAcknowledge: () => void;
}

export default function NewsCard({ headline, description, type = 'neutral', newsId, isAcknowledged, onAcknowledge }: NewsCardProps) {
  const getIcon = () => {
    if (type === 'positive') return TrendingUp;
    if (type === 'negative') return TrendingDown;
    return AlertCircle;
  };

  const getAccentColor = () => {
    if (type === 'positive') return 'text-emerald-600';
    if (type === 'negative') return 'text-red-600';
    return 'text-accent';
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-card p-4 rounded-lg border transition-all ${
        isAcknowledged ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border'
      }`}
    >
      <div className="flex gap-3">
        <div className={`p-2 rounded-lg bg-muted flex-shrink-0 h-fit`}>
          <Icon className={`w-5 h-5 ${getAccentColor()}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1 line-clamp-2">{headline}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-3">
        {isAcknowledged ? (
          <div className="flex items-center gap-2 text-emerald-600 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Acknowledged</span>
          </div>
        ) : (
          <button
            onClick={onAcknowledge}
            className="w-full py-2 px-3 bg-accent/10 hover:bg-accent/20 text-accent rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I have read this headline</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}