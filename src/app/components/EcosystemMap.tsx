import { motion } from 'motion/react';
import { CulturalNode } from '../context/SimulationContext';
import { Building, Music, Users, Landmark } from 'lucide-react';

interface EcosystemMapProps {
  nodes: CulturalNode[];
}

export default function EcosystemMap({ nodes }: EcosystemMapProps) {
  const getIcon = (type: CulturalNode['type']) => {
    switch (type) {
      case 'museum':
        return Landmark;
      case 'venue':
        return Music;
      case 'community':
        return Users;
      case 'institution':
        return Building;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 75) return 'bg-emerald-500';
    if (health >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connections between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => {
          const nextNode = nodes[(i + 1) % nodes.length];
          return (
            <motion.line
              key={`conn-${node.id}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="currentColor"
              strokeWidth="1"
              className="text-accent/20"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => {
        const Icon = getIcon(node.type);
        const size = node.size;

        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pulse effect */}
            <motion.div
              className={`absolute inset-0 rounded-full ${getHealthColor(node.health)} opacity-20`}
              style={{ width: size * 2, height: size * 2 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Node circle */}
            <div
              className={`relative ${getHealthColor(node.health)} rounded-full flex items-center justify-center shadow-lg`}
              style={{ width: size * 2, height: size * 2 }}
            >
              <Icon className="w-1/2 h-1/2 text-white" />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              <div className="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-xl">
                <div className="font-semibold">{node.name}</div>
                <div className="text-xs opacity-80">Health: {Math.round(node.health)}%</div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
