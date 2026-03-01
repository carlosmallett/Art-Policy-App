import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Play, Users, MapPin, History } from 'lucide-react';
import { useState } from 'react';

const cities = [
  { name: 'Portland', state: 'Oregon', description: 'Known for DIY art scene and indie culture' },
  { name: 'Detroit', state: 'Michigan', description: 'Post-industrial city with vibrant grassroots arts revival' },
  { name: 'Austin', state: 'Texas', description: 'Rapid growth challenging cultural identity' },
  { name: 'Providence', state: 'Rhode Island', description: 'Small city with major arts institutions' },
  { name: 'Minneapolis', state: 'Minnesota', description: 'Strong civic arts support facing equity questions' },
  { name: 'New Orleans', state: 'Louisiana', description: 'Deep cultural traditions meeting modern challenges' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('Portland');

  const handleStart = () => {
    navigate('/onboarding', { state: { city: selectedCity } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute w-full h-full opacity-10">
            <defs>
              <pattern id="landing-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#landing-grid)" />
          </svg>
        </div>

        <div className="relative bg-card/95 backdrop-blur rounded-2xl shadow-2xl border border-border/50 overflow-hidden">
          {/* Header section */}
          <div className="p-12 text-center border-b border-border/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Arts Policy Lab
              </h1>
              <p className="text-xl text-muted-foreground">The Cultural Budget Year</p>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                Choose Your City
              </h2>
              
              <div className="max-w-3xl mx-auto mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {cities.map((city) => (
                    <motion.button
                      key={city.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCity(city.name)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedCity === city.name
                          ? 'border-accent bg-accent/10 shadow-lg'
                          : 'border-border bg-card hover:border-accent/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${
                          selectedCity === city.name ? 'text-accent' : 'text-muted-foreground'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold mb-1">{city.name}, {city.state}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{city.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 text-foreground/80 text-center">
                <p>
                  You've just been appointed as the Cultural Policy Director for the City of <span className="font-semibold text-accent">{selectedCity}</span>.
                </p>
                <p>
                  Over the next twelve months, you will navigate budget pressures, stakeholder demands, 
                  and community needs while shaping the future of arts and culture in your city.
                </p>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={handleStart}
                className="group relative px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Begin Your Year
                <motion.div
                  className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                />
              </button>

              <button
                onClick={() => navigate('/saved')}
                className="px-8 py-4 bg-card border-2 border-border text-foreground rounded-lg font-semibold text-lg hover:border-accent transition-colors flex items-center gap-2"
              >
                <History className="w-5 h-5" />
                View Saved Simulations
              </button>
            </motion.div>

            {/* Optional feature note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm text-muted-foreground text-center mt-6"
            >
              Save and compare your policy decisions across multiple simulations
            </motion.p>
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-white/60 text-sm"
        >
          <p>An educational simulation for arts policy and cultural management students</p>
        </motion.div>
      </motion.div>
    </div>
  );
}