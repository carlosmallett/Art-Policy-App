import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MetricCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

export default function MetricCard({ label, value, icon: Icon, trend }: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend > 0 ? 'text-emerald-600' : 'text-red-600';
  };

  const getValueColor = () => {
    if (value >= 75) return 'text-emerald-600';
    if (value >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-4 rounded-lg border border-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-accent/10 rounded">
            <Icon className="w-4 h-4 text-accent" />
          </div>
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        {trend !== undefined && trend !== 0 && (
          <span className={`text-xs ${getTrendColor()}`}>
            {trend > 0 ? '+' : ''}{trend}
          </span>
        )}
      </div>
      
      <div className="flex items-end gap-2">
        <span className={`text-3xl font-semibold ${getValueColor()}`}>{value}</span>
        <span className="text-sm text-muted-foreground mb-1">/100</span>
      </div>
      
      <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${value >= 75 ? 'bg-emerald-600' : value >= 50 ? 'bg-amber-600' : 'bg-red-600'}`}
        />
      </div>
    </motion.div>
  );
}
