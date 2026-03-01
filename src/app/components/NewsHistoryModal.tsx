import { motion, AnimatePresence } from 'motion/react';
import { X, Newspaper, Calendar } from 'lucide-react';
import { NewsItem } from '../context/SimulationContext';

interface NewsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: NewsItem[];
}

export default function NewsHistoryModal({ isOpen, onClose, news }: NewsHistoryModalProps) {
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
            className="bg-card rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Newspaper className="w-6 h-6" />
                <div>
                  <h2 className="text-2xl font-bold">News Archive</h2>
                  <p className="text-sm text-primary-foreground/70">
                    Complete timeline of headlines and developments
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

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              {news.length > 0 ? (
                <div className="space-y-4">
                  {news.map((newsItem, index) => (
                    <motion.div
                      key={newsItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-muted/50 border border-border rounded-lg p-5 hover:border-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Month {newsItem.month}</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{newsItem.headline}</h3>
                      <p className="text-sm text-foreground/80">{newsItem.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg text-muted-foreground">
                    No news yet. Headlines will appear as the simulation progresses.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{news.length} total headlines</span>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}