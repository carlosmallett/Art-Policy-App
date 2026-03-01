import { Metrics } from '../context/SimulationContext';

export interface MetricChangeReason {
  source: string;
  impact: number;
  explanation: string;
}

export interface DetailedMetricChange {
  metricKey: keyof Metrics;
  metricName: string;
  before: number;
  after: number;
  totalChange: number;
  reasons: MetricChangeReason[];
}

/**
 * Calculate detailed metric changes with specific reasons
 */
export function calculateDetailedMetricChanges(
  metricsBefore: Metrics,
  metricsAfter: Metrics
): DetailedMetricChange[] {
  const metrics: (keyof Metrics)[] = [
    'publicTrust',
    'artistLivelihood',
    'accessEquity',
    'culturalVitality',
    'financialSustainability',
    'politicalCapital'
  ];

  return metrics.map((metricKey) => {
    const before = metricsBefore[metricKey];
    const after = metricsAfter[metricKey];
    const totalChange = after - before;
    const reasons: MetricChangeReason[] = [];

    // Generate comprehensive explanation for the change
    if (totalChange !== 0) {
      const explanation = getMetricChangeExplanation(metricKey, totalChange, before, after);
      reasons.push({
        source: 'Month Activities',
        impact: totalChange,
        explanation
      });
    }

    return {
      metricKey,
      metricName: getMetricDisplayName(metricKey),
      before,
      after,
      totalChange,
      reasons
    };
  });
}

function getMetricDisplayName(key: keyof Metrics): string {
  const names: Record<keyof Metrics, string> = {
    publicTrust: 'Public Trust',
    artistLivelihood: 'Artist Livelihood',
    accessEquity: 'Access & Equity',
    culturalVitality: 'Cultural Vitality',
    financialSustainability: 'Financial Sustainability',
    politicalCapital: 'Political Capital'
  };
  return names[key];
}

function getMetricChangeExplanation(
  metric: keyof Metrics,
  change: number,
  before: number,
  after: number
): string {
  const direction = change > 0 ? 'increased' : 'decreased';
  const magnitude = Math.abs(change);
  const intensity = magnitude > 5 ? 'significantly' : magnitude > 2 ? 'notably' : 'slightly';
  
  const explanations: Record<keyof Metrics, (dir: string, mag: number, int: string) => string> = {
    publicTrust: (dir, mag, int) => 
      `Public confidence ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). Your policy decision and budget choices ${dir === 'increased' ? 'resonated positively with' : 'concerned'} citizens. ${getContextualInsight('publicTrust', after)}`,
      
    artistLivelihood: (dir, mag, int) => 
      `Artists' economic stability ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). Your funding decisions and policy priorities ${dir === 'increased' ? 'improved working conditions and opportunities' : 'reduced support and income sources'} for creative professionals. ${getContextualInsight('artistLivelihood', after)}`,
      
    accessEquity: (dir, mag, int) => 
      `Community access to cultural programs ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). Your resource allocation ${dir === 'increased' ? 'expanded opportunities for underserved communities' : 'limited reach to diverse audiences'}. ${getContextualInsight('accessEquity', after)}`,
      
    culturalVitality: (dir, mag, int) => 
      `Overall cultural sector health ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). The combined effect of your decisions ${dir === 'increased' ? 'strengthened programming diversity and institutional stability' : 'weakened the cultural ecosystem'}. ${getContextualInsight('culturalVitality', after)}`,
      
    financialSustainability: (dir, mag, int) => 
      `Long-term financial outlook ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). Your budgetary approach ${dir === 'increased' ? 'built reserves and improved fiscal health' : 'depleted resources and increased risk'}. ${getContextualInsight('financialSustainability', after)}`,
      
    politicalCapital: (dir, mag, int) => 
      `Your political influence ${dir} ${int} (${mag > 0 ? '+' : ''}${mag} points). Key stakeholders ${dir === 'increased' ? 'endorsed your leadership' : 'questioned your judgment'}. ${getContextualInsight('politicalCapital', after)}`
  };

  return explanations[metric](direction, magnitude, intensity);
}

function getContextualInsight(metric: keyof Metrics, currentValue: number): string {
  // Provide context based on current level
  if (currentValue >= 80) {
    return 'Performance is excellent.';
  } else if (currentValue >= 60) {
    return 'Performance is solid but has room for improvement.';
  } else if (currentValue >= 40) {
    return 'Challenges are emerging - focused attention needed.';
  } else if (currentValue >= 20) {
    return 'Situation is concerning - immediate action required.';
  } else {
    return 'Crisis level - urgent intervention needed.';
  }
}
