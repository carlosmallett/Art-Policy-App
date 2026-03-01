import { Decision } from '../context/SimulationContext';

export const monthlyDecisions: Record<number, Decision[]> = {
  1: [
    {
      id: 'month1-budget-priority',
      title: 'First Quarter Budget Strategy',
      description: `Your first major decision sets the tone for your tenure. The city council has questioned the efficiency of current cultural spending, citing a 15% budget increase over the past 3 years with "unclear results." Meanwhile, three neighborhood coalitions have submitted petitions requesting expanded arts programming in underserved areas.

**Key Stakeholders:**
- City Council (Budget Committee): Demanding demonstrable ROI and fiscal responsibility
- Community Coalition: 5,000+ signatures requesting expanded programming in underserved areas
- Budget Office: Warning that your choices set precedent for entire tenure

**The Question:**
What is your overarching budget philosophy?`,
      options: [
        {
          id: 'community-first',
          label: 'Equity-Driven Allocation - Prioritize underserved neighborhoods',
          effects: {
            accessEquity: 15,
            publicTrust: 8,
            politicalCapital: -6,
            financialSustainability: -5,
          },
        },
        {
          id: 'institutional-stability',
          label: 'Institutional Stability - Support established venues and museums',
          effects: {
            culturalVitality: 12,
            politicalCapital: 8,
            accessEquity: -6,
            publicTrust: -3,
          },
        },
        {
          id: 'artist-investment',
          label: 'Artist-Centered - Direct support for creative workers',
          effects: {
            artistLivelihood: 15,
            culturalVitality: 8,
            financialSustainability: -8,
          },
        },
        {
          id: 'efficiency-reform',
          label: 'Data & Efficiency - Implement accountability measures first',
          effects: {
            financialSustainability: 12,
            politicalCapital: 10,
            culturalVitality: -5,
          },
        },
      ],
    },
    {
      id: 'month1-museum-funding',
      title: 'Museum Emergency Request',
      description: `The city's flagship museum reports 22% attendance decline from pre-pandemic levels and requests $800K in emergency funding. Without it, they warn of closing two wings and laying off 30% of staff (45 people).

**Key Stakeholders:**
- Museum Board: "We're a crown jewel - our collapse would devastate the city's cultural reputation"
- Artists' Guild: "Museums get millions while working artists can barely afford rent"
- Tourism Bureau: "The museum drives $8M annually in tourism revenue"

**The Question:**
Do you rescue a struggling institution or let market forces work?`,
      options: [
        {
          id: 'full-rescue',
          label: 'Emergency Funding - Provide full $800K',
          effects: {
            culturalVitality: 12,
            publicTrust: 5,
            financialSustainability: -10,
            artistLivelihood: -5,
          },
        },
        {
          id: 'conditional',
          label: 'Conditional Support - $400K with reform requirements',
          effects: {
            culturalVitality: 5,
            politicalCapital: 5,
            financialSustainability: -5,
          },
        },
        {
          id: 'no-bailout',
          label: 'No Bailout - Market-based solution',
          effects: {
            financialSustainability: 8,
            culturalVitality: -12,
            publicTrust: -8,
          },
        },
        {
          id: 'transition',
          label: 'Managed Transition - Help downsize responsibly',
          effects: {
            financialSustainability: 3,
            culturalVitality: -5,
            publicTrust: 3,
          },
        },
      ],
    },
    {
      id: 'month1-grant-program',
      title: 'Individual Artist Grant Program',
      description: `400 artists have applied for $2.5M in available grant funding - you can only fund 80-100 artists. The selection criteria debate has become heated.

**Key Stakeholders:**
- Emerging Artists Coalition: "Stop favoring established names - we need opportunities"
- Arts Commission: "Artistic merit must be the primary criterion"
- Equity Advocates: "Past grant data shows 78% went to white artists"

**The Question:**
What should determine who gets limited grant funding?`,
      options: [
        {
          id: 'merit-based',
          label: 'Artistic Merit - Expert panel selection',
          effects: {
            culturalVitality: 10,
            artistLivelihood: 5,
            accessEquity: -8,
          },
        },
        {
          id: 'equity-focus',
          label: 'Equity Priority - Target historically excluded artists',
          effects: {
            accessEquity: 15,
            artistLivelihood: 8,
            politicalCapital: -8,
          },
        },
        {
          id: 'financial-need',
          label: 'Financial Need - Means-tested allocation',
          effects: {
            artistLivelihood: 12,
            publicTrust: 8,
            culturalVitality: -3,
          },
        },
        {
          id: 'lottery',
          label: 'Democratic Lottery - Random selection from qualified pool',
          effects: {
            publicTrust: 5,
            accessEquity: 5,
            culturalVitality: -5,
          },
        },
      ],
    },
    {
      id: 'month1-community-spaces',
      title: 'Community Arts Space Initiative',
      description: `Five low-income neighborhoods have no dedicated cultural facilities. A proposal would create small community arts spaces for $1.2M, but this means cutting funding to established arts education programs.

**Key Stakeholders:**
- Neighborhood Leaders: "Our communities are cultural deserts - we need infrastructure"
- Arts Education Alliance: "Cutting proven programs hurts the children we serve"
- Community Development: "Physical spaces enable long-term community cultural development"

**The Question:**
Invest in new community infrastructure or maintain existing programs?`,
      options: [
        {
          id: 'build-spaces',
          label: 'Build Community Spaces - Create new infrastructure',
          effects: {
            accessEquity: 18,
            culturalVitality: 8,
            financialSustainability: -10,
          },
        },
        {
          id: 'protect-programs',
          label: 'Protect Existing Programs - Maintain current services',
          effects: {
            culturalVitality: 5,
            publicTrust: 3,
            accessEquity: -8,
          },
        },
        {
          id: 'pilot-approach',
          label: 'Pilot Program - One space to test model',
          effects: {
            accessEquity: 8,
            financialSustainability: -3,
          },
        },
        {
          id: 'partnership',
          label: 'Partnership Model - Co-develop with community organizations',
          effects: {
            accessEquity: 10,
            publicTrust: 8,
            financialSustainability: -5,
          },
        },
      ],
    },
    {
      id: 'month1-staff-structure',
      title: 'Department Restructuring Proposal',
      description: `Your deputy director proposes restructuring the department to create dedicated equity and community engagement positions. This requires cutting two program manager roles, affecting staff morale.

**Key Stakeholders:**
- Current Staff: Concerned about job security and role changes
- Equity Commission: Endorsing dedicated equity positions
- Union: Demanding transparent process and no involuntary layoffs

**The Question:**
Restructure for new priorities or maintain current organizational structure?`,
      options: [
        {
          id: 'restructure',
          label: 'Full Restructure - Create new equity-focused positions',
          effects: {
            accessEquity: 10,
            politicalCapital: -5,
            publicTrust: 5,
          },
        },
        {
          id: 'add-roles',
          label: 'Expand Staff - Add positions without cuts',
          effects: {
            accessEquity: 8,
            financialSustainability: -8,
            politicalCapital: 5,
          },
        },
        {
          id: 'maintain',
          label: 'Maintain Current Structure - Focus on training instead',
          effects: {
            politicalCapital: 3,
            accessEquity: -5,
            publicTrust: -3,
          },
        },
        {
          id: 'hybrid',
          label: 'Hybrid Approach - Evolve roles gradually through attrition',
          effects: {
            accessEquity: 5,
            politicalCapital: 3,
          },
        },
      ],
    },
  ],
  2: [
    {
      id: 'month2-theater-crisis',
      title: 'Historic Theater Emergency',
      description: `The Paramount Theater (95 years old) will close in 60 days without $2.3M. A developer offers $8M to convert it to luxury condos. The venue hosts 200+ performances annually.

**Key Stakeholders:**
- Theater Board: "This is our last resort - we've exhausted all fundraising"
- Performance Companies: "Without the Paramount, we have nowhere to perform"
- Developer: "The market has spoken - this is prime real estate"

**The Question:**
Save a historic venue or allow market-driven redevelopment?`,
      options: [
        {
          id: 'full-rescue',
          label: 'Emergency Rescue - Provide full $2.3M funding',
          effects: {
            culturalVitality: 20,
            publicTrust: 12,
            financialSustainability: -18,
            politicalCapital: -8,
          },
        },
        {
          id: 'public-private',
          label: 'Public-Private Partnership - Match private funds',
          effects: {
            culturalVitality: 12,
            politicalCapital: 5,
            financialSustainability: -8,
          },
        },
        {
          id: 'adaptive-reuse',
          label: 'Mixed-Use Development - Preserve some performance space',
          effects: {
            politicalCapital: 10,
            culturalVitality: -5,
            artistLivelihood: -8,
          },
        },
        {
          id: 'let-close',
          label: 'Support Transition - Help companies find new venues',
          effects: {
            financialSustainability: 12,
            culturalVitality: -18,
            publicTrust: -10,
          },
        },
      ],
    },
    {
      id: 'month2-youth-program',
      title: 'After-School Arts Expansion',
      description: `A proposal to expand after-school arts programs to 20 additional schools would reach 3,000 more students but costs $900K annually. Parent demand is high but budget is tight.

**Key Stakeholders:**
- Parent Coalition: "Our kids need safe, enriching after-school options"
- Fiscal Office: "This creates a permanent funding obligation"
- Education Advocates: "Arts programs improve academic outcomes"

**The Question:**
Expand youth programming or maintain fiscal flexibility?`,
      options: [
        {
          id: 'full-expansion',
          label: 'Full Expansion - All 20 schools',
          effects: {
            accessEquity: 15,
            publicTrust: 12,
            financialSustainability: -12,
          },
        },
        {
          id: 'phased',
          label: 'Phased Approach - 10 schools this year',
          effects: {
            accessEquity: 8,
            publicTrust: 8,
            financialSustainability: -5,
          },
        },
        {
          id: 'partnership',
          label: 'School District Partnership - Share costs',
          effects: {
            accessEquity: 10,
            publicTrust: 5,
            politicalCapital: 5,
            financialSustainability: -3,
          },
        },
        {
          id: 'defer',
          label: 'Defer - Wait for more stable budget',
          effects: {
            financialSustainability: 8,
            publicTrust: -8,
            accessEquity: -5,
          },
        },
      ],
    },
    {
      id: 'month2-festival-sponsorship',
      title: 'Corporate Sponsorship Policy',
      description: `A major oil company offers $1.5M to sponsor the summer arts festival. Environmental groups threaten protests and boycotts. The festival needs the money.

**Key Stakeholders:**
- Festival Organizers: "We need this sponsorship to survive"
- Environmental Coalition: "This is greenwashing - arts shouldn't legitimize fossil fuels"
- Business Alliance: "Corporate support is essential for the arts"

**The Question:**
Accept controversial funding or maintain ethical standards?`,
      options: [
        {
          id: 'accept',
          label: 'Accept Sponsorship - Festival needs funding',
          effects: {
            financialSustainability: 15,
            culturalVitality: 8,
            publicTrust: -12,
            politicalCapital: -8,
          },
        },
        {
          id: 'negotiate',
          label: 'Negotiate Terms - Limited branding, sustainability commitments',
          effects: {
            financialSustainability: 8,
            publicTrust: 3,
            culturalVitality: 5,
          },
        },
        {
          id: 'reject',
          label: 'Reject Sponsorship - Uphold ethical standards',
          effects: {
            publicTrust: 12,
            politicalCapital: 8,
            financialSustainability: -10,
            culturalVitality: -5,
          },
        },
        {
          id: 'policy',
          label: 'Create Sponsorship Ethics Policy - Establish clear guidelines',
          effects: {
            politicalCapital: 5,
            publicTrust: 8,
            financialSustainability: -5,
          },
        },
      ],
    },
    {
      id: 'month2-venue-rental',
      title: 'City Venue Pricing Structure',
      description: `City-owned venues currently offer subsidized rates to nonprofit arts groups. A proposal would implement market-rate pricing to generate $500K revenue, but many groups couldn't afford it.

**Key Stakeholders:**
- Budget Office: "We need to maximize revenue from city assets"
- Small Arts Organizations: "Market rates would price us out - we'd have to close"
- Commercial Promoters: "We pay market rates - nonprofits get unfair advantage"

**The Question:**
Maintain subsidies for nonprofits or generate revenue at market rates?`,
      options: [
        {
          id: 'market-rates',
          label: 'Market-Rate Pricing - Maximize revenue',
          effects: {
            financialSustainability: 12,
            culturalVitality: -15,
            artistLivelihood: -10,
          },
        },
        {
          id: 'tiered',
          label: 'Tiered Pricing - Based on organization size/budget',
          effects: {
            financialSustainability: 5,
            culturalVitality: 3,
            politicalCapital: 5,
          },
        },
        {
          id: 'maintain-subsidy',
          label: 'Maintain Subsidies - Support nonprofit arts',
          effects: {
            culturalVitality: 10,
            artistLivelihood: 8,
            financialSustainability: -8,
          },
        },
        {
          id: 'partnership',
          label: 'Mixed Model - Reserve some subsidized slots',
          effects: {
            culturalVitality: 5,
            financialSustainability: 3,
            publicTrust: 5,
          },
        },
      ],
    },
  ],
  3: [
    {
      id: 'month3-equity-audit',
      title: 'Arts Funding Equity Report',
      description: `A report reveals 78% of funding went to institutions in affluent neighborhoods. Major funders threaten to withdraw $4M in matching grants without "meaningful equity reforms."

**Key Stakeholders:**
- Community Organizations: "We've been systematically excluded - this is about justice"
- Major Funders: "We cannot support a system that perpetuates inequality"
- Established Institutions: "Sudden cuts will destroy programs built over decades"

**The Question:**
How aggressively do you address documented inequities?`,
      options: [
        {
          id: 'immediate-reallocation',
          label: 'Immediate Reallocation - Redirect 30% to underserved communities',
          effects: {
            accessEquity: 25,
            publicTrust: 15,
            culturalVitality: -10,
            politicalCapital: -12,
          },
        },
        {
          id: 'phased-approach',
          label: 'Five-Year Plan - Gradual rebalancing',
          effects: {
            accessEquity: 12,
            publicTrust: 8,
            politicalCapital: 3,
          },
        },
        {
          id: 'expansion-model',
          label: 'Expand Total Funding - Grow pie rather than redistribute',
          effects: {
            accessEquity: 15,
            culturalVitality: 12,
            financialSustainability: -20,
          },
        },
        {
          id: 'capacity-building',
          label: 'Capacity Building - Train emerging organizations first',
          effects: {
            accessEquity: 8,
            publicTrust: -5,
            politicalCapital: 5,
          },
        },
      ],
    },
    {
      id: 'month3-cultural-plan',
      title: '10-Year Cultural Master Plan',
      description: `You can commission a comprehensive 10-year cultural plan ($350K, 18 months). Some say it's essential strategic planning; others call it expensive consultant waste.

**Key Stakeholders:**
- Planning Advocates: "You can't manage what you don't measure - we need strategy"
- Fiscal Hawks: "More consultant fees while cutting programs?"
- Arts Organizations: "Stop studying and start funding"

**The Question:**
Invest in long-term planning or direct funds to immediate needs?`,
      options: [
        {
          id: 'full-plan',
          label: 'Commission Full Plan - Comprehensive strategic planning',
          effects: {
            politicalCapital: 8,
            culturalVitality: 5,
            financialSustainability: -5,
            publicTrust: -3,
          },
        },
        {
          id: 'internal',
          label: 'Internal Planning - Use existing staff',
          effects: {
            politicalCapital: 3,
            financialSustainability: 3,
          },
        },
        {
          id: 'skip',
          label: 'Skip Formal Plan - Make decisions as issues arise',
          effects: {
            financialSustainability: 5,
            culturalVitality: -5,
            publicTrust: -3,
          },
        },
        {
          id: 'focused',
          label: 'Focused Studies - Commission specific issue research only',
          effects: {
            politicalCapital: 5,
            financialSustainability: -3,
            culturalVitality: 3,
          },
        },
      ],
    },
    {
      id: 'month3-artist-workspace',
      title: 'Artist Workspace Crisis',
      description: `Industrial arts buildings are being converted to tech offices. 120 artists face eviction. You could lease city-owned warehouse space for artist studios ($600K renovation + $200K annual operating costs).

**Key Stakeholders:**
- Artists: "We're being displaced - where are we supposed to work?"
- Real Estate Market: "This is how cities evolve - you can't stop market forces"
- Economic Development: "Tech companies create jobs and tax revenue"

**The Question:**
Intervene to preserve artist workspace or let market determine use?`,
      options: [
        {
          id: 'city-studios',
          label: 'Create City Artist Studios - Renovate warehouse',
          effects: {
            artistLivelihood: 18,
            culturalVitality: 10,
            financialSustainability: -12,
          },
        },
        {
          id: 'incentives',
          label: 'Developer Incentives - Require artist space in new buildings',
          effects: {
            artistLivelihood: 8,
            politicalCapital: 5,
            culturalVitality: 5,
          },
        },
        {
          id: 'relocation',
          label: 'Relocation Assistance - Help artists find affordable areas',
          effects: {
            artistLivelihood: 3,
            publicTrust: -5,
            financialSustainability: -3,
          },
        },
        {
          id: 'market',
          label: 'No Intervention - Market will find solutions',
          effects: {
            financialSustainability: 8,
            artistLivelihood: -15,
            culturalVitality: -10,
          },
        },
      ],
    },
    {
      id: 'month3-public-art',
      title: 'Percent-for-Art Expansion',
      description: `A proposal would require 2% of all city construction budgets for public art (generating $3M annually). Construction unions oppose delays; artists strongly support it.

**Key Stakeholders:**
- Artists Guild: "This would transform public space and create hundreds of jobs"
- Construction Industry: "More red tape and project delays"
- Urban Design Advocates: "Public art makes cities more livable"

**The Question:**
Mandate public art in city projects or keep construction streamlined?`,
      options: [
        {
          id: 'adopt-2percent',
          label: '2% Mandate - Comprehensive public art requirement',
          effects: {
            artistLivelihood: 15,
            culturalVitality: 12,
            politicalCapital: -10,
          },
        },
        {
          id: 'pilot-1percent',
          label: '1% Pilot - Start smaller and evaluate',
          effects: {
            artistLivelihood: 8,
            culturalVitality: 5,
            politicalCapital: -3,
          },
        },
        {
          id: 'voluntary',
          label: 'Voluntary Program - Encourage but don\'t mandate',
          effects: {
            politicalCapital: 5,
            artistLivelihood: 3,
            culturalVitality: 3,
          },
        },
        {
          id: 'reject',
          label: 'Reject Proposal - Keep construction streamlined',
          effects: {
            politicalCapital: 8,
            artistLivelihood: -10,
            culturalVitality: -5,
          },
        },
      ],
    },
  ],
  4: [
    {
      id: 'month4-festival-choice',
      title: 'Summer Festival Dilemma',
      description: `Summer Arts Festival faces $1.8M shortfall (serves affluent areas). Alternative: 15 smaller community festivals across underserved areas for same cost. Can't fund both.

**Key Stakeholders:**
- Tourism Bureau: "Festival generates $25M in economic impact"
- Neighborhood Coalition: "Why rescue events that exclude our communities?"
- Contracted Artists: "We've planned around these dates - we need this income"

**The Question:**
One large prestigious event or many smaller community events?`,
      options: [
        {
          id: 'save-festival',
          label: 'Save Major Festival - Protect established event',
          effects: {
            culturalVitality: 15,
            accessEquity: -12,
            financialSustainability: -15,
            publicTrust: -8,
          },
        },
        {
          id: 'community-festivals',
          label: 'Community Festivals - Distribute resources widely',
          effects: {
            accessEquity: 22,
            publicTrust: 12,
            culturalVitality: -10,
            politicalCapital: -10,
          },
        },
        {
          id: 'hybrid',
          label: 'Hybrid - Scaled-down festival + some community events',
          effects: {
            accessEquity: 10,
            culturalVitality: 5,
            financialSustainability: -12,
          },
        },
        {
          id: 'private-sector',
          label: 'No Public Funding - Push for private sector solution',
          effects: {
            financialSustainability: 10,
            culturalVitality: -12,
            publicTrust: -10,
          },
        },
      ],
    },
    {
      id: 'month4-digital-archives',
      title: 'Cultural Heritage Digitization',
      description: `A proposal to digitize the city's cultural archives (photos, recordings, documents) would cost $750K but preserve history and enable public access. Critics call it a "vanity project."

**Key Stakeholders:**
- Historians & Archivists: "We're losing irreplaceable cultural memory"
- Digital Access Advocates: "This democratizes access to history"
- Budget Hawks: "This benefits future generations, not current residents"

**The Question:**
Invest in preserving cultural heritage or focus on current programs?`,
      options: [
        {
          id: 'full-digitization',
          label: 'Full Digitization Project - Comprehensive preservation',
          effects: {
            culturalVitality: 10,
            publicTrust: 8,
            financialSustainability: -10,
          },
        },
        {
          id: 'partnership',
          label: 'University Partnership - Share costs and expertise',
          effects: {
            culturalVitality: 8,
            publicTrust: 5,
            financialSustainability: -3,
          },
        },
        {
          id: 'phased',
          label: 'Phased Approach - Prioritize most endangered materials',
          effects: {
            culturalVitality: 5,
            financialSustainability: -5,
          },
        },
        {
          id: 'defer',
          label: 'Defer Project - Focus resources on current needs',
          effects: {
            financialSustainability: 5,
            culturalVitality: -5,
          },
        },
      ],
    },
    {
      id: 'month4-accessibility',
      title: 'Accessibility Compliance',
      description: `Many cultural venues don't meet ADA standards. Mandating compliance costs organizations $2M collectively. You could provide grants or require self-funding.

**Key Stakeholders:**
- Disability Rights Groups: "Access is a right, not optional"
- Small Venues: "These costs would force us to close"
- Legal Counsel: "We have liability exposure if venues aren't accessible"

**The Question:**
How do you balance accessibility mandates with financial constraints?`,
      options: [
        {
          id: 'fund-upgrades',
          label: 'City Funding - Grant $2M for accessibility upgrades',
          effects: {
            accessEquity: 20,
            publicTrust: 12,
            financialSustainability: -15,
          },
        },
        {
          id: 'shared-cost',
          label: 'Shared Cost - 50/50 matching grants',
          effects: {
            accessEquity: 12,
            culturalVitality: -5,
            financialSustainability: -8,
          },
        },
        {
          id: 'mandate-only',
          label: 'Mandate Without Funding - Venues must comply',
          effects: {
            accessEquity: 8,
            politicalCapital: -12,
            culturalVitality: -10,
          },
        },
        {
          id: 'phased-compliance',
          label: 'Phased Compliance - 5-year timeline with support',
          effects: {
            accessEquity: 10,
            culturalVitality: 3,
            financialSustainability: -5,
          },
        },
      ],
    },
    {
      id: 'month4-tourism-marketing',
      title: 'Cultural Tourism Campaign',
      description: `Tourism board proposes $800K cultural tourism marketing campaign to attract visitors. Local artists want that money for programs serving residents instead.

**Key Stakeholders:**
- Tourism Industry: "Cultural tourism drives economic growth"
- Local Artists: "Stop marketing to tourists while ignoring local communities"
- Hotel/Restaurant Sector: "Tourism supports jobs and tax revenue"

**The Question:**
Market culture to tourists or invest in serving local communities?`,
      options: [
        {
          id: 'full-campaign',
          label: 'Fund Campaign - Invest in cultural tourism',
          effects: {
            financialSustainability: 8,
            politicalCapital: 8,
            publicTrust: -8,
            accessEquity: -5,
          },
        },
        {
          id: 'split',
          label: 'Split Funding - $400K marketing, $400K local programs',
          effects: {
            publicTrust: 5,
            accessEquity: 5,
            culturalVitality: 3,
          },
        },
        {
          id: 'local-focus',
          label: 'Local Focus - No tourism marketing',
          effects: {
            publicTrust: 10,
            accessEquity: 8,
            financialSustainability: -5,
          },
        },
        {
          id: 'tourism-partnership',
          label: 'Tourism Industry Partnership - Private sector leads',
          effects: {
            politicalCapital: 5,
            financialSustainability: 3,
            publicTrust: 3,
          },
        },
      ],
    },
  ],
  5: [
    {
      id: 'month5-artist-housing',
      title: 'Artist Affordable Housing',
      description: `62% of artists have been displaced by rising rents. Create 200 units of artist housing for $18M (with $10M state match), but this is 40% of your annual budget.

**Key Stakeholders:**
- Artists' Coalition: "We built these neighborhoods - now we're forced out"
- City Council: "Housing is not cultural affairs' responsibility"
- State Arts Council: "$10M match available but only with local commitment"

**The Question:**
Major investment in artist housing or stay within traditional scope?`,
      options: [
        {
          id: 'full-commitment',
          label: 'Full Housing Initiative - Commit $18M for 200 units',
          effects: {
            artistLivelihood: 25,
            culturalVitality: 15,
            financialSustainability: -22,
            politicalCapital: -12,
          },
        },
        {
          id: 'pilot',
          label: 'Pilot Program - 50 units to test model',
          effects: {
            artistLivelihood: 10,
            financialSustainability: -10,
            culturalVitality: 5,
          },
        },
        {
          id: 'partnership',
          label: 'Developer Partnership - Require artist units in new buildings',
          effects: {
            artistLivelihood: 8,
            politicalCapital: 8,
            culturalVitality: 3,
          },
        },
        {
          id: 'defer',
          label: 'Defer to Housing Department - Not cultural policy',
          effects: {
            financialSustainability: 15,
            politicalCapital: 10,
            artistLivelihood: -20,
            culturalVitality: -12,
          },
        },
      ],
    },
    {
      id: 'month5-music-venues',
      title: 'Live Music Venue Protection',
      description: `Five independent music venues face closure due to noise complaints from new luxury condos. You could create "entertainment districts" with noise protections or let venues relocate/close.

**Key Stakeholders:**
- Venue Owners: "We were here first - newcomers knew what they were buying"
- Condo Residents: "We have a right to peaceful enjoyment of our homes"
- Music Community: "Without venues, the live music scene dies"

**The Question:**
Protect established music venues or accommodate residential concerns?`,
      options: [
        {
          id: 'entertainment-districts',
          label: 'Entertainment Districts - Legal noise protections',
          effects: {
            culturalVitality: 15,
            artistLivelihood: 10,
            politicalCapital: -10,
          },
        },
        {
          id: 'soundproofing',
          label: 'Soundproofing Grants - Help venues meet standards',
          effects: {
            culturalVitality: 8,
            politicalCapital: 3,
            financialSustainability: -8,
          },
        },
        {
          id: 'mediation',
          label: 'Mediation Process - Negotiate solutions case-by-case',
          effects: {
            publicTrust: 5,
            politicalCapital: 3,
            culturalVitality: -3,
          },
        },
        {
          id: 'market-solution',
          label: 'Market Solution - Venues must adapt or relocate',
          effects: {
            politicalCapital: 8,
            culturalVitality: -15,
            artistLivelihood: -10,
          },
        },
      ],
    },
    {
      id: 'month5-folk-arts',
      title: 'Traditional & Folk Arts Program',
      description: `Immigrant communities request $400K for traditional arts programs (cultural festivals, language preservation, craft traditions). Some question if this is "real art."

**Key Stakeholders:**
- Immigrant Communities: "Our cultural traditions deserve support"
- Traditional Arts Advocates: "Folk arts are the foundation of culture"
- Contemporary Arts Leaders: "Limited funds should go to innovation"

**The Question:**
Support traditional/folk arts or focus on contemporary practices?`,
      options: [
        {
          id: 'full-support',
          label: 'Traditional Arts Program - Full $400K',
          effects: {
            accessEquity: 18,
            culturalVitality: 10,
            publicTrust: 10,
            financialSustainability: -8,
          },
        },
        {
          id: 'balanced',
          label: 'Balanced Portfolio - Support both traditional and contemporary',
          effects: {
            accessEquity: 8,
            culturalVitality: 5,
            publicTrust: 5,
            financialSustainability: -5,
          },
        },
        {
          id: 'limited',
          label: 'Limited Support - Small grants only',
          effects: {
            accessEquity: 5,
            publicTrust: -3,
            financialSustainability: -3,
          },
        },
        {
          id: 'contemporary-focus',
          label: 'Contemporary Focus - Prioritize innovation',
          effects: {
            culturalVitality: 5,
            accessEquity: -10,
            publicTrust: -8,
          },
        },
      ],
    },
    {
      id: 'month5-data-systems',
      title: 'Arts Sector Data Infrastructure',
      description: `You lack basic data on who arts programs serve. A data system ($300K setup, $75K annual) would enable equity tracking but diverts funds from programs.

**Key Stakeholders:**
- Equity Advocates: "You can't address disparities without data"
- Program Managers: "More reporting requirements burden small organizations"
- Funders: "We need data to justify continued investment"

**The Question:**
Invest in data infrastructure or trust qualitative assessment?`,
      options: [
        {
          id: 'full-system',
          label: 'Comprehensive System - Full data infrastructure',
          effects: {
            politicalCapital: 8,
            financialSustainability: -8,
            accessEquity: 5,
          },
        },
        {
          id: 'basic',
          label: 'Basic Tracking - Essential metrics only',
          effects: {
            politicalCapital: 5,
            financialSustainability: -3,
            accessEquity: 3,
          },
        },
        {
          id: 'voluntary',
          label: 'Voluntary Reporting - Encourage but don\'t require',
          effects: {
            politicalCapital: 3,
            publicTrust: -3,
          },
        },
        {
          id: 'no-system',
          label: 'No New System - Use existing reports',
          effects: {
            financialSustainability: 5,
            accessEquity: -5,
            politicalCapital: -3,
          },
        },
      ],
    },
  ],
  6: [
    {
      id: 'month6-censorship',
      title: 'Public Art Controversy',
      description: `A public art installation on police violence sparks intense debate. Police Union demands removal; civil liberties groups threaten lawsuits if censored. National media watching.

**Key Stakeholders:**
- Artist & Supporters: "This is censorship - you'll destroy artistic credibility"
- Police Union: "This creates a hostile work environment"
- ACLU: "Removing this would be unconstitutional viewpoint discrimination"

**The Question:**
Defend artistic freedom or respond to public safety concerns?`,
      options: [
        {
          id: 'defend',
          label: 'Defend Art - Keep with enhanced security',
          effects: {
            culturalVitality: 20,
            artistLivelihood: 15,
            publicTrust: -10,
            politicalCapital: -18,
          },
        },
        {
          id: 'dialogue',
          label: 'Community Dialogue - Pause for conversations',
          effects: {
            publicTrust: 10,
            politicalCapital: 5,
            culturalVitality: -5,
            artistLivelihood: -8,
          },
        },
        {
          id: 'relocate',
          label: 'Relocate to Gallery - Move to appropriate venue',
          effects: {
            politicalCapital: 8,
            culturalVitality: -8,
            artistLivelihood: -10,
          },
        },
        {
          id: 'remove',
          label: 'Remove - Cite public safety',
          effects: {
            politicalCapital: 12,
            culturalVitality: -22,
            artistLivelihood: -18,
            publicTrust: -12,
          },
        },
      ],
    },
    {
      id: 'month6-streaming',
      title: 'Digital Streaming Initiative',
      description: `Invest $500K to livestream performances and create digital archive? Expands access but some worry it cannibalizes ticket sales.

**Key Stakeholders:**
- Digital Access Advocates: "This reaches people who can't attend in person"
- Venue Operators: "Why pay for tickets if you can watch free online?"
- Disability Rights Groups: "Digital access is essential for homebound people"

**The Question:**
Invest in digital access or protect in-person attendance?`,
      options: [
        {
          id: 'full-streaming',
          label: 'Full Streaming Platform - Comprehensive digital access',
          effects: {
            accessEquity: 15,
            culturalVitality: 8,
            financialSustainability: -10,
          },
        },
        {
          id: 'pilot',
          label: 'Pilot Program - Test with select events',
          effects: {
            accessEquity: 8,
            culturalVitality: 3,
            financialSustainability: -5,
          },
        },
        {
          id: 'archive-only',
          label: 'Archive Only - Record but delay public access',
          effects: {
            accessEquity: 5,
            culturalVitality: 3,
            financialSustainability: -3,
          },
        },
        {
          id: 'no-streaming',
          label: 'No Streaming - Protect in-person experience',
          effects: {
            culturalVitality: 3,
            accessEquity: -10,
            publicTrust: -5,
          },
        },
      ],
    },
    {
      id: 'month6-creative-economy',
      title: 'Creative Economy Study',
      description: `Commission economic impact study of arts sector ($150K)? Data could justify funding but critics say resources should go to artists, not consultants.

**Key Stakeholders:**
- Arts Advocates: "Hard data makes the case for investment"
- Artists: "Another study? Just fund us directly"
- City Council: "We need economic justification for arts spending"

**The Question:**
Invest in economic impact study or direct funds to programs?`,
      options: [
        {
          id: 'commission-study',
          label: 'Commission Study - Professional economic impact analysis',
          effects: {
            politicalCapital: 10,
            financialSustainability: -5,
            artistLivelihood: -3,
          },
        },
        {
          id: 'simple-report',
          label: 'Simple Report - Internal staff analysis',
          effects: {
            politicalCapital: 5,
          },
        },
        {
          id: 'skip',
          label: 'Skip Study - Fund programs instead',
          effects: {
            artistLivelihood: 5,
            culturalVitality: 3,
            politicalCapital: -5,
          },
        },
        {
          id: 'university',
          label: 'University Partnership - Academic research project',
          effects: {
            politicalCapital: 8,
            culturalVitality: 3,
          },
        },
      ],
    },
    {
      id: 'month6-literary-arts',
      title: 'Literary Arts Funding',
      description: `Writers and poets argue they're underrepresented (5% of funding despite 30% of applications). Increase literary arts funding to 15% of budget?

**Key Stakeholders:**
- Writers' Community: "Literary arts are systematically underfunded"
- Visual Arts Community: "There's limited funding - this takes from us"
- Publishers & Bookstores: "Strong literary scene benefits entire sector"

**The Question:**
Rebalance toward literary arts or maintain current allocation?`,
      options: [
        {
          id: 'increase',
          label: 'Increase to 15% - Rebalance toward literary arts',
          effects: {
            accessEquity: 8,
            culturalVitality: 5,
            artistLivelihood: 3,
            politicalCapital: -8,
          },
        },
        {
          id: 'gradual',
          label: 'Gradual Increase - Move to 10% over two years',
          effects: {
            accessEquity: 5,
            culturalVitality: 3,
            politicalCapital: -3,
          },
        },
        {
          id: 'maintain',
          label: 'Maintain Current - No reallocation',
          effects: {
            politicalCapital: 3,
            accessEquity: -5,
          },
        },
        {
          id: 'competitive',
          label: 'Competitive Process - Let quality determine funding',
          effects: {
            culturalVitality: 3,
            publicTrust: 3,
          },
        },
      ],
    },
  ],
  7: [
    {
      id: 'month7-arts-education',
      title: 'School Arts Education Crisis',
      description: `School district eliminated 32 art teachers (15,000 students affected). You could fund parallel program for $3.5M annually, but this lets district escape accountability.

**Key Stakeholders:**
- Teachers' Union: "Don't let district escape responsibility"
- Parent Coalition: "Our kids need help NOW"
- School Board: "We made tough choices - step up or don't"

**The Question:**
Fill gap with cultural funding or pressure district to restore positions?`,
      options: [
        {
          id: 'parallel-program',
          label: 'Parallel Program - Full $3.5M arts education system',
          effects: {
            accessEquity: 10,
            publicTrust: 7,
            financialSustainability: -8,
            culturalVitality: 5,
          },
        },
        {
          id: 'partnership',
          label: 'Partnership - Co-fund with district and nonprofits',
          effects: {
            accessEquity: 6,
            publicTrust: 4,
            financialSustainability: -4,
            politicalCapital: 2,
          },
        },
        {
          id: 'pressure',
          label: 'Political Pressure - Rally public to force district action',
          effects: {
            politicalCapital: -4,
            publicTrust: 2,
            accessEquity: 2,
          },
        },
        {
          id: 'targeted',
          label: 'Targeted Enrichment - After-school in lowest-income schools',
          effects: {
            accessEquity: 4,
            financialSustainability: -2,
            publicTrust: 2,
          },
        },
      ],
    },
    {
      id: 'month7-cultural-districts',
      title: 'Cultural District Designation',
      description: `Three neighborhoods seek official "Cultural District" status (tax incentives, marketing, infrastructure investment). Limited resources mean you can only designate one.

**Key Stakeholders:**
- Applicant Neighborhoods: Each making case for designation
- Business Owners: "This will transform economic development"
- Equity Advocates: "Choose the most underserved neighborhood"

**The Question:**
Which criteria determine cultural district designation?`,
      options: [
        {
          id: 'merit-based',
          label: 'Strongest Application - Select based on quality and readiness',
          effects: {
            culturalVitality: 4,
            politicalCapital: -2,
            accessEquity: -2,
          },
        },
        {
          id: 'equity-based',
          label: 'Equity Priority - Choose most underserved neighborhood',
          effects: {
            accessEquity: 6,
            publicTrust: 4,
            politicalCapital: -3,
          },
        },
        {
          id: 'economic',
          label: 'Economic Impact - Choose neighborhood with highest ROI',
          effects: {
            financialSustainability: 3,
            politicalCapital: 2,
            accessEquity: -3,
          },
        },
        {
          id: 'delay',
          label: 'Delay Decision - Study impacts and reopen process',
          effects: {
            politicalCapital: -2,
            publicTrust: -1,
          },
        },
      ],
    },
    {
      id: 'month7-emergency-fund',
      title: 'Artist Emergency Relief Fund',
      description: `Create $500K emergency fund for artists facing crisis (medical, housing, etc.)? Helps individuals but some say it's "welfare, not arts funding."

**Key Stakeholders:**
- Artists in Crisis: "We need safety net - one emergency destroys careers"
- Fiscal Conservatives: "This is social services, not cultural policy"
- Arts Community: "Supporting artists enables them to create"

**The Question:**
Create artist safety net or maintain traditional program focus?`,
      options: [
        {
          id: 'create-fund',
          label: 'Emergency Relief Fund - $500K for artist crises',
          effects: {
            artistLivelihood: 6,
            publicTrust: 3,
            financialSustainability: -4,
            politicalCapital: -2,
          },
        },
        {
          id: 'small-grants',
          label: 'Small Grant Program - $150K for urgent needs',
          effects: {
            artistLivelihood: 3,
            financialSustainability: -2,
            publicTrust: 2,
          },
        },
        {
          id: 'referral',
          label: 'Referral Network - Connect artists to existing services',
          effects: {
            artistLivelihood: 1,
            publicTrust: 1,
          },
        },
        {
          id: 'no-fund',
          label: 'No Emergency Fund - Not cultural affairs role',
          effects: {
            financialSustainability: 2,
            artistLivelihood: -4,
            publicTrust: -2,
          },
        },
      ],
    },
    {
      id: 'month7-international',
      title: 'International Cultural Exchange',
      description: `Sister city proposes cultural exchange program ($250K): artist residencies, performances, exhibitions. Critics call it "tourism for artists" while local needs go unmet.

**Key Stakeholders:**
- International Relations Office: "Cultural diplomacy builds global connections"
- Selected Artists: "International exposure advances careers"
- Local Arts Community: "That money should serve local artists"

**The Question:**
Invest in international exchange or focus on domestic programs?`,
      options: [
        {
          id: 'full-exchange',
          label: 'Full Exchange Program - Comprehensive international partnership',
          effects: {
            culturalVitality: 4,
            artistLivelihood: 2,
            publicTrust: -2,
            financialSustainability: -3,
          },
        },
        {
          id: 'limited',
          label: 'Limited Exchange - Small pilot program',
          effects: {
            culturalVitality: 2,
            financialSustainability: -1,
          },
        },
        {
          id: 'reciprocal',
          label: 'Reciprocal Only - No cost exchange',
          effects: {
            culturalVitality: 1,
            politicalCapital: 1,
          },
        },
        {
          id: 'decline',
          label: 'Decline - Focus on local needs',
          effects: {
            publicTrust: 2,
            artistLivelihood: 1,
            culturalVitality: -1,
          },
        },
      ],
    },
  ],
  8: [
    {
      id: 'month8-tech-sector',
      title: 'Digital Arts & Gaming Support',
      description: `Gaming/digital media sector grew 400% in 5 years. Tech companies lobby for share of cultural funding. Traditional arts orgs say "video games aren't culture."

**Key Stakeholders:**
- Gaming Industry: "We're the creative economy now"
- Traditional Arts: "Games aren't art - this is Silicon Valley raiding arts funding"
- Young Professionals: "Cultural policy is stuck in the 20th century"

**The Question:**
Expand definition of culture to include digital media?`,
      options: [
        {
          id: 'digital-transformation',
          label: 'Digital Transformation - Invest $2M in new media',
          effects: {
            culturalVitality: 5,
            artistLivelihood: 3,
            publicTrust: -2,
            politicalCapital: -3,
          },
        },
        {
          id: 'hybrid',
          label: 'Hybrid Model - Balance traditional and digital',
          effects: {
            culturalVitality: 3,
            artistLivelihood: 1,
            publicTrust: 2,
          },
        },
        {
          id: 'traditional',
          label: 'Traditional Focus - Keep funding in established arts',
          effects: {
            culturalVitality: -3,
            publicTrust: -4,
            politicalCapital: 3,
          },
        },
        {
          id: 'separate',
          label: 'Separate Framework - Create distinct digital economy program',
          effects: {
            politicalCapital: 4,
            financialSustainability: 1,
          },
        },
      ],
    },
    {
      id: 'month8-union-labor',
      title: 'Arts Worker Unionization',
      description: `Arts workers are organizing unions, demanding better pay and benefits. Nonprofits warn this will force program cuts. Union says current wages are exploitative.

**Key Stakeholders:**
- Arts Workers Union: "We can't live on passion - we need living wages"
- Nonprofit Directors: "Higher labor costs mean fewer programs"
- Labor Movement: "All workers deserve dignity and fair compensation"

**The Question:**
Support unionization or protect organizational flexibility?`,
      options: [
        {
          id: 'support-union',
          label: 'Support Unionization - Advocate for worker rights',
          effects: {
            artistLivelihood: 5,
            publicTrust: 3,
            culturalVitality: -3,
            politicalCapital: -4,
          },
        },
        {
          id: 'neutral',
          label: 'Remain Neutral - Let organizations and workers negotiate',
          effects: {
            politicalCapital: 1,
          },
        },
        {
          id: 'wage-grants',
          label: 'Wage Support Grants - Help nonprofits raise compensation',
          effects: {
            artistLivelihood: 4,
            financialSustainability: -4,
            publicTrust: 2,
          },
        },
        {
          id: 'oppose',
          label: 'Oppose - Protect organizational flexibility',
          effects: {
            politicalCapital: 3,
            artistLivelihood: -6,
            publicTrust: -4,
          },
        },
      ],
    },
    {
      id: 'month8-climate-art',
      title: 'Climate Arts Initiative',
      description: `Climate activists propose $400K for arts addressing environmental crisis. Some say "art should be political"; others "keep politics out of art."

**Key Stakeholders:**
- Climate Groups: "Artists must address the defining crisis of our time"
- Arts Purists: "Political criteria undermine artistic freedom"
- Young Artists: "Climate is our future - this is relevant art"

**The Question:**
Fund issue-specific art or maintain content neutrality?`,
      options: [
        {
          id: 'climate-initiative',
          label: 'Climate Arts Initiative - Dedicate $400K to climate themes',
          effects: {
            culturalVitality: 3,
            publicTrust: 2,
            politicalCapital: -3,
            financialSustainability: -3,
          },
        },
        {
          id: 'open-call',
          label: 'Open Call - Include climate but don\'t mandate',
          effects: {
            culturalVitality: 2,
            financialSustainability: -1,
          },
        },
        {
          id: 'content-neutral',
          label: 'Content Neutral - No issue-specific funding',
          effects: {
            politicalCapital: 2,
            publicTrust: -2,
          },
        },
        {
          id: 'artist-choice',
          label: 'Artist Choice - Fund artists who choose own themes',
          effects: {
            artistLivelihood: 2,
            culturalVitality: 1,
          },
        },
      ],
    },
    {
      id: 'month8-performance-metrics',
      title: 'Outcome Measurement Requirements',
      description: `City council demands "measurable outcomes" from funded organizations. New reporting requirements cost organizations time/money but provide accountability data.

**Key Stakeholders:**
- City Council: "We need proof that cultural spending delivers results"
- Small Organizations: "More paperwork drains our limited capacity"
- Funders: "Outcome data enables strategic investment"

**The Question:**
Require comprehensive outcome measurement or minimize reporting burden?`,
      options: [
        {
          id: 'comprehensive',
          label: 'Comprehensive Metrics - Detailed outcome reporting required',
          effects: {
            politicalCapital: 5,
            culturalVitality: -2,
            financialSustainability: -2,
          },
        },
        {
          id: 'tiered',
          label: 'Tiered System - Requirements based on funding level',
          effects: {
            politicalCapital: 3,
            culturalVitality: -1,
          },
        },
        {
          id: 'light-touch',
          label: 'Light Touch - Basic reporting only',
          effects: {
            culturalVitality: 1,
            politicalCapital: -2,
          },
        },
        {
          id: 'resist',
          label: 'Resist Requirements - Argue art can\'t be measured',
          effects: {
            culturalVitality: 2,
            politicalCapital: -5,
            financialSustainability: -2,
          },
        },
      ],
    },
  ],
  9: [
    {
      id: 'month9-austerity',
      title: 'Mandatory Budget Cuts',
      description: `City mandates 20% cuts across all departments ($4.5M from your budget). Every cut eliminates jobs or programs. No painless options.

**Key Stakeholders:**
- Budget Office: "20% cut is non-negotiable"
- Arts Coalition: Multiple factions fighting for survival
- Labor Union: "Contracts protect workers - cut programs not people"

**The Question:**
How do you implement devastating budget cuts?`,
      options: [
        {
          id: 'spread-cuts',
          label: 'Spread Evenly - Everyone shares pain equally',
          effects: {
            culturalVitality: -15,
            artistLivelihood: -12,
            accessEquity: -10,
            politicalCapital: 5,
            financialSustainability: 20,
          },
        },
        {
          id: 'strategic',
          label: 'Strategic Cuts - Eliminate weak programs, protect strong',
          effects: {
            culturalVitality: -10,
            politicalCapital: -12,
            artistLivelihood: -15,
            financialSustainability: 20,
          },
        },
        {
          id: 'fight-cuts',
          label: 'Fight Cuts - Propose new revenue and defend budget',
          effects: {
            culturalVitality: 5,
            politicalCapital: -20,
            financialSustainability: -5,
            publicTrust: 8,
          },
        },
        {
          id: 'consolidation',
          label: 'Force Consolidation - Require organizations to merge',
          effects: {
            culturalVitality: -5,
            politicalCapital: -10,
            financialSustainability: 18,
            artistLivelihood: -8,
          },
        },
      ],
    },
    {
      id: 'month9-naming-rights',
      title: 'Corporate Naming Rights',
      description: `Sell naming rights to city cultural venues for $5M over 10 years? Money could offset cuts but "Amazon Theater" and "Facebook Museum" concern many.

**Key Stakeholders:**
- Budget Office: "This revenue solves immediate problems"
- Public: Mixed reactions to corporate branding
- Arts Community: "Commercialization compromises cultural integrity"

**The Question:**
Accept corporate naming rights or preserve non-commercial identity?`,
      options: [
        {
          id: 'accept-naming',
          label: 'Accept Naming Rights - Secure $5M revenue',
          effects: {
            financialSustainability: 7,
            publicTrust: -3,
            culturalVitality: -2,
          },
        },
        {
          id: 'limited',
          label: 'Limited Rights - Secondary spaces only, no main venues',
          effects: {
            financialSustainability: 3,
            publicTrust: -1,
          },
        },
        {
          id: 'reject',
          label: 'Reject - Preserve non-commercial cultural spaces',
          effects: {
            publicTrust: 4,
            culturalVitality: 2,
            financialSustainability: -3,
          },
        },
        {
          id: 'endowment',
          label: 'Endowment Model - Corporate gifts without naming',
          effects: {
            financialSustainability: 2,
            publicTrust: 2,
            politicalCapital: 1,
          },
        },
      ],
    },
    {
      id: 'month9-volunteer-model',
      title: 'Volunteer Program Expansion',
      description: `Expand volunteer programs to offset paid staff cuts? Could maintain services but raises labor and quality concerns.

**Key Stakeholders:**
- Labor Union: "This displaces paid jobs and exploits free labor"
- Nonprofits: "We need volunteers to survive cuts"
- Community Members: "We want to help however we can"

**The Question:**
Expand volunteer programs or protect paid positions?`,
      options: [
        {
          id: 'expand-volunteers',
          label: 'Expand Volunteers - Use volunteers to maintain services',
          effects: {
            culturalVitality: 2,
            artistLivelihood: -4,
            publicTrust: 2,
            financialSustainability: 3,
          },
        },
        {
          id: 'hybrid',
          label: 'Hybrid Model - Volunteers supplement but don\'t replace staff',
          effects: {
            culturalVitality: 1,
            artistLivelihood: -1,
            publicTrust: 1,
          },
        },
        {
          id: 'limited',
          label: 'Limited Volunteers - Only for non-core functions',
          effects: {
            artistLivelihood: 1,
            culturalVitality: -1,
          },
        },
        {
          id: 'resist',
          label: 'Resist - Protect professional paid workforce',
          effects: {
            artistLivelihood: 2,
            culturalVitality: -2,
            politicalCapital: -3,
          },
        },
      ],
    },
    {
      id: 'month9-fundraising',
      title: 'Aggressive Fundraising Campaign',
      description: `Launch major fundraising campaign to offset cuts ($500K campaign cost to raise $3M)? Risk is spending money you don't have on uncertain returns.

**Key Stakeholders:**
- Development Professionals: "You have to invest to raise major gifts"
- Fiscal Office: "Spending $500K in a crisis is irresponsible"
- Major Donors: "We might give if you show leadership"

**The Question:**
Invest in fundraising or cut spending immediately?`,
      options: [
        {
          id: 'major-campaign',
          label: 'Major Campaign - Invest $500K to raise $3M',
          effects: {
            financialSustainability: -2,
            politicalCapital: 2,
            publicTrust: 2,
          },
        },
        {
          id: 'modest',
          label: 'Modest Effort - $100K investment, lower goals',
          effects: {
            financialSustainability: -1,
            politicalCapital: 1,
          },
        },
        {
          id: 'no-cost',
          label: 'No-Cost Approach - Staff-led outreach only',
          effects: {
            publicTrust: 1,
          },
        },
        {
          id: 'skip',
          label: 'Skip Campaign - Focus on managing cuts',
          effects: {
            financialSustainability: 1,
            publicTrust: -1,
          },
        },
      ],
    },
  ],
  10: [
    {
      id: 'month10-cultural-district-deal',
      title: 'Cultural District Development',
      description: `Developer proposes $200M "Cultural District" with venues, galleries, artist studios. City contributes $15M. Would displace 80+ artists in affordable spaces now.

**Key Stakeholders:**
- Developer: "Generational investment in culture"
- Displaced Artists: "You're destroying real community to build fake 'cultural' condos"
- City Council: "City needs growth and jobs"

**The Question:**
Support large development or protect existing artist community?`,
      options: [
        {
          id: 'endorse',
          label: 'Endorse Project - Support development, secure state funding',
          effects: {
            culturalVitality: 10,
            politicalCapital: 15,
            financialSustainability: 12,
            artistLivelihood: -18,
            publicTrust: -10,
          },
        },
        {
          id: 'conditional',
          label: 'Conditional - Require artist displacement protections',
          effects: {
            culturalVitality: 5,
            politicalCapital: 5,
            artistLivelihood: -5,
          },
        },
        {
          id: 'oppose',
          label: 'Oppose - Protect existing artist community',
          effects: {
            artistLivelihood: 15,
            publicTrust: 10,
            politicalCapital: -20,
            culturalVitality: -8,
          },
        },
        {
          id: 'alternative',
          label: 'Alternative Proposal - Artist-centered development model',
          effects: {
            artistLivelihood: 10,
            publicTrust: 8,
            politicalCapital: -10,
          },
        },
      ],
    },
    {
      id: 'month10-creative-workforce',
      title: 'Creative Workforce Development',
      description: `Partner with community college on creative careers program ($300K)? Trains next generation but current artists say funds should support working artists.

**Key Stakeholders:**
- Education Sector: "Workforce development is economic development"
- Working Artists: "We need support now, not programs for future artists"
- Employers: "We need trained creative workers"

**The Question:**
Invest in future workforce or support current practitioners?`,
      options: [
        {
          id: 'full-program',
          label: 'Full Workforce Program - $300K partnership',
          effects: {
            culturalVitality: 3,
            accessEquity: 3,
            financialSustainability: -3,
            artistLivelihood: -2,
          },
        },
        {
          id: 'apprenticeships',
          label: 'Apprenticeship Model - Connect students with working artists',
          effects: {
            artistLivelihood: 2,
            culturalVitality: 2,
            financialSustainability: -2,
          },
        },
        {
          id: 'minimal',
          label: 'Minimal Support - Advise but don\'t fund',
          effects: {
            politicalCapital: 1,
          },
        },
        {
          id: 'focus-current',
          label: 'Focus on Current Artists - No workforce development',
          effects: {
            artistLivelihood: 2,
            culturalVitality: -1,
          },
        },
      ],
    },
    {
      id: 'month10-public-memorials',
      title: 'Controversial Monument Removal',
      description: `Community demands removal of controversial historical monuments. Some want them removed, others say "erasing history." Alternatives include context plaques or museum relocation.

**Key Stakeholders:**
- Removal Advocates: "These monuments celebrate oppression"
- Preservation Groups: "Remove context and you lose teaching opportunities"
- Historians: "Museums can provide proper context"

**The Question:**
Remove monuments, add context, or maintain status quo?`,
      options: [
        {
          id: 'remove',
          label: 'Remove and Relocate - Move to museum with context',
          effects: {
            publicTrust: 3,
            politicalCapital: -5,
            accessEquity: 4,
          },
        },
        {
          id: 'context',
          label: 'Add Context - Install educational plaques',
          effects: {
            publicTrust: 1,
            politicalCapital: -2,
            accessEquity: 2,
          },
        },
        {
          id: 'maintain',
          label: 'Maintain - No changes',
          effects: {
            politicalCapital: 2,
            publicTrust: -4,
            accessEquity: -4,
          },
        },
        {
          id: 'community-process',
          label: 'Community Process - Let affected communities decide',
          effects: {
            publicTrust: 4,
            politicalCapital: 1,
            accessEquity: 3,
          },
        },
      ],
    },
    {
      id: 'month10-arts-health',
      title: 'Arts in Healthcare Initiative',
      description: `Hospital system requests partnership on arts therapy programs ($400K). Evidence shows health benefits but some say this is healthcare's responsibility.

**Key Stakeholders:**
- Healthcare Providers: "Arts improve patient outcomes and healing"
- Artists: "This creates jobs for arts therapists"
- Budget Hawks: "This is healthcare funding, not cultural funding"

**The Question:**
Partner on arts in healthcare or maintain traditional cultural focus?`,
      options: [
        {
          id: 'full-partnership',
          label: 'Full Partnership - $400K for comprehensive program',
          effects: {
            publicTrust: 5,
            artistLivelihood: 3,
            accessEquity: 4,
            financialSustainability: -4,
          },
        },
        {
          id: 'pilot',
          label: 'Pilot Program - Test with one hospital',
          effects: {
            publicTrust: 3,
            artistLivelihood: 1,
            financialSustainability: -2,
          },
        },
        {
          id: 'advisory',
          label: 'Advisory Role - Support but don\'t fund',
          effects: {
            publicTrust: 1,
            politicalCapital: 1,
          },
        },
        {
          id: 'decline',
          label: 'Decline - Not cultural affairs scope',
          effects: {
            politicalCapital: 2,
            publicTrust: -2,
          },
        },
      ],
    },
  ],
  11: [
    {
      id: 'month11-legacy-project',
      title: 'Legacy Project Definition',
      description: `Define your tenure with one signature initiative ($5M). Options: Equity Endowment (permanent fund), Contemporary Art Museum (landmark building), or Universal Creative Education.

**Key Stakeholders:**
- Equity Coalition: "The endowment is permanent transformative change"
- Tourism Alliance: "A museum would put city on world stage"
- Education Advocates: "Universal education is most democratic"

**The Question:**
What legacy do you want to leave?`,
      options: [
        {
          id: 'equity-endowment',
          label: 'Equity Endowment - Permanent fund for marginalized communities',
          effects: {
            accessEquity: 25,
            publicTrust: 15,
            culturalVitality: 8,
            financialSustainability: -8,
          },
        },
        {
          id: 'museum',
          label: 'Contemporary Museum - Landmark cultural institution',
          effects: {
            culturalVitality: 22,
            publicTrust: 10,
            politicalCapital: 8,
            accessEquity: -10,
            financialSustainability: -15,
          },
        },
        {
          id: 'education',
          label: 'Universal Education - Arts for every child',
          effects: {
            accessEquity: 20,
            culturalVitality: 15,
            publicTrust: 18,
            financialSustainability: -18,
          },
        },
        {
          id: 'stabilization',
          label: 'Stabilization - Strengthen existing programs',
          effects: {
            financialSustainability: 15,
            culturalVitality: 5,
            politicalCapital: 10,
          },
        },
      ],
    },
    {
      id: 'month11-succession',
      title: 'Successor Transition',
      description: `Your tenure ends soon. How do you position your successor? Recommend continuity candidate vs. change agent? Your endorsement carries weight.

**Key Stakeholders:**
- Internal Candidate: Continuity, knows the system
- External Reformer: Fresh perspective, challenges status quo
- Council: Watching your recommendation closely

**The Question:**
What direction do you recommend for next Cultural Director?`,
      options: [
        {
          id: 'continuity',
          label: 'Endorse Continuity - Support internal candidate',
          effects: {
            politicalCapital: 3,
            culturalVitality: 2,
          },
        },
        {
          id: 'change',
          label: 'Advocate Change - Support external reformer',
          effects: {
            publicTrust: 3,
            accessEquity: 2,
            politicalCapital: -2,
          },
        },
        {
          id: 'neutral',
          label: 'Remain Neutral - Let council decide',
          effects: {
            politicalCapital: 1,
          },
        },
        {
          id: 'criteria',
          label: 'Focus on Criteria - Outline priorities without endorsing',
          effects: {
            publicTrust: 2,
            politicalCapital: 2,
          },
        },
      ],
    },
    {
      id: 'month11-documentation',
      title: 'Document Your Tenure',
      description: `Publish comprehensive report documenting decisions, outcomes, lessons? ($75K) Provides transparency and learning but some see it as self-promotion.

**Key Stakeholders:**
- Future Leaders: "We learn from documented experience"
- Critics: "Taxpayers shouldn't fund your memoir"
- Academic Community: "This creates valuable knowledge"

**The Question:**
Document your tenure formally or let outcomes speak?`,
      options: [
        {
          id: 'full-report',
          label: 'Comprehensive Report - Full documentation and analysis',
          effects: {
            publicTrust: 3,
            politicalCapital: 2,
            culturalVitality: 1,
            financialSustainability: -2,
          },
        },
        {
          id: 'brief-summary',
          label: 'Brief Summary - Simple internal transition document',
          effects: {
            politicalCapital: 1,
          },
        },
        {
          id: 'data-only',
          label: 'Data Only - Publish metrics without narrative',
          effects: {
            publicTrust: 2,
          },
        },
        {
          id: 'no-report',
          label: 'No Report - Let work speak for itself',
          effects: {
            politicalCapital: 1,
            publicTrust: -1,
          },
        },
      ],
    },
    {
      id: 'month11-relationships',
      title: 'Repair or Solidify Relationships',
      description: `Use final weeks to repair damaged relationships or solidify alliances? Different stakeholders want your attention. Who do you prioritize?

**Key Stakeholders:**
- Council Critics: Could influence your next opportunity
- Arts Community: Want to feel heard before you leave
- Staff: Need closure and direction

**The Question:**
How do you spend final political capital?`,
      options: [
        {
          id: 'repair',
          label: 'Repair Relationships - Reach out to critics',
          effects: {
            politicalCapital: 4,
            publicTrust: 2,
          },
        },
        {
          id: 'allies',
          label: 'Solidify Alliances - Strengthen supporter network',
          effects: {
            politicalCapital: 3,
            culturalVitality: 2,
          },
        },
        {
          id: 'community',
          label: 'Community Listening - Final tour of arts community',
          effects: {
            publicTrust: 4,
            artistLivelihood: 2,
          },
        },
        {
          id: 'internal',
          label: 'Internal Focus - Prepare staff for transition',
          effects: {
            culturalVitality: 2,
            politicalCapital: 1,
          },
        },
      ],
    },
  ],
  12: [
    {
      id: 'month12-final-vision',
      title: 'Final Vision Statement',
      description: `Present final vision to council. Your recommendation will guide policy for next decade. Choose framework: Transformative Justice, Sustainable Excellence, Democratic Participation, or Pragmatic Balance.

**Key Stakeholders:**
- Your Track Record: Your decisions tell a story
- Council: Evaluating your self-awareness
- Arts Community: Hungry for clear direction
- Your Successor: Will inherit this framework

**The Question:**
What is the right philosophy for cultural policy?`,
      options: [
        {
          id: 'transformative-justice',
          label: 'Transformative Justice - Center equity and reparative change',
          effects: {
            accessEquity: 8,
            publicTrust: 5,
            politicalCapital: -3,
            culturalVitality: 2,
          },
        },
        {
          id: 'sustainable-excellence',
          label: 'Sustainable Excellence - Build world-class institutions',
          effects: {
            culturalVitality: 8,
            financialSustainability: 6,
            politicalCapital: 5,
            accessEquity: -3,
          },
        },
        {
          id: 'democratic-participation',
          label: 'Democratic Participation - Maximize access and engagement',
          effects: {
            accessEquity: 7,
            publicTrust: 7,
            culturalVitality: 4,
            politicalCapital: 2,
          },
        },
        {
          id: 'pragmatic-balance',
          label: 'Pragmatic Balance - Acknowledge tensions, adaptive approach',
          effects: {
            politicalCapital: 6,
            publicTrust: 5,
            financialSustainability: 4,
          },
        },
      ],
    },
    {
      id: 'month12-budget-recommendations',
      title: 'Final Budget Recommendations',
      description: `Recommend budget priorities for next year. Your analysis will influence next director's starting position. Honest assessment or optimistic projection?

**Key Stakeholders:**
- Budget Office: Wants realistic projections
- Council: Making decisions based on your recommendations
- Successor: Will have to live with your projections

**The Question:**
Provide honest assessment or paint optimistic picture?`,
      options: [
        {
          id: 'realistic',
          label: 'Realistic Assessment - Honest about challenges',
          effects: {
            publicTrust: 5,
            politicalCapital: 3,
            financialSustainability: 2,
          },
        },
        {
          id: 'optimistic',
          label: 'Optimistic Projection - Emphasize opportunities',
          effects: {
            publicTrust: -2,
            politicalCapital: 4,
            culturalVitality: 2,
          },
        },
        {
          id: 'scenarios',
          label: 'Multiple Scenarios - Present range of possibilities',
          effects: {
            publicTrust: 4,
            politicalCapital: 2,
          },
        },
        {
          id: 'successor-choice',
          label: 'Leave to Successor - Minimal recommendations',
          effects: {
            politicalCapital: 1,
          },
        },
      ],
    },
    {
      id: 'month12-acknowledgments',
      title: 'Public Acknowledgments',
      description: `Final public event. Who do you thank and recognize? Political allies, community critics who pushed you, staff who did the work?

**Key Stakeholders:**
- Political Leaders: Want recognition
- Arts Community: Want validation
- Staff: Want appreciation
- Critics: Surprised if included

**The Question:**
Who do you acknowledge in final public moment?`,
      options: [
        {
          id: 'political',
          label: 'Political Focus - Thank council and institutional partners',
          effects: {
            politicalCapital: 5,
            publicTrust: -1,
          },
        },
        {
          id: 'community',
          label: 'Community Focus - Recognize artists and advocates',
          effects: {
            publicTrust: 5,
            artistLivelihood: 2,
            culturalVitality: 2,
          },
        },
        {
          id: 'staff',
          label: 'Staff Recognition - Celebrate team that did the work',
          effects: {
            publicTrust: 3,
            culturalVitality: 2,
          },
        },
        {
          id: 'critics',
          label: 'Include Critics - Thank those who challenged you',
          effects: {
            publicTrust: 6,
            politicalCapital: 2,
          },
        },
      ],
    },
    {
      id: 'month12-lessons-learned',
      title: 'Lessons Learned',
      description: `Council asks: What surprised you? What would you do differently? Honest reflection builds credibility but admits failures. Confident tone protects reputation.

**Key Stakeholders:**
- Council: Testing your self-awareness
- Public: Wants authenticity
- Your Resume: Next job will see this

**The Question:**
Honest about mistakes or confident about achievements?`,
      options: [
        {
          id: 'honest-reflection',
          label: 'Honest Reflection - Discuss mistakes and learning',
          effects: {
            publicTrust: 7,
            politicalCapital: 4,
          },
        },
        {
          id: 'confident',
          label: 'Confident Summary - Emphasize achievements',
          effects: {
            politicalCapital: 5,
            publicTrust: 1,
          },
        },
        {
          id: 'balanced',
          label: 'Balanced Assessment - Acknowledge both successes and challenges',
          effects: {
            publicTrust: 5,
            politicalCapital: 3,
          },
        },
        {
          id: 'defer',
          label: 'Defer Judgment - "Too soon to fully assess"',
          effects: {
            politicalCapital: 1,
            publicTrust: -1,
          },
        },
      ],
    },
  ],
};

export function getDecisionForMonth(month: number): Decision | null {
  const decisions = monthlyDecisions[month];
  return decisions?.[0] || null;
}

export function getDecisionsForMonth(month: number): Decision[] {
  return monthlyDecisions[month] || [];
}
