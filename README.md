# Art Policy App

## Tagline
A strategic simulation platform where you navigate the complex decisions of cultural funding and civic policy to shape thriving arts ecosystems across American cities.

## Project Description

The Art Policy App is an interactive decision-making simulation that explores the multifaceted challenges of arts and cultural policy. Players assume the role of a cultural decision-maker in one of six distinct American cities, making monthly policy decisions that impact community engagement, artist welfare, cultural diversity, and municipal finances.

### Key Features:
- **Interactive Simulation Engine**: Make strategic decisions and observe their ripple effects across interconnected ecosystem metrics
- **Dynamic Feedback System**: Real-time news headlines and monthly summaries reveal consequences of your choices
- **Multi-Month Campaign**: Navigate 12 months of decision-making with evolving challenges and constraints
- **Metropolitan Context**: Six distinct US cities (Portland, Detroit, Austin, Providence, Minneapolis, New Orleans) with unique initial conditions and cultural landscapes
- **Metrics Tracking**: Monitor multiple impact dimensions including community engagement, artist equity, cultural diversity, and budget sustainability
- **Decision Comparison**: Compare different policy outcomes and strategies across simulations
- **Persistent State Management**: Save and load simulations to explore alternative policy pathways

## Target Audience

**Primary Users:**
- Arts administrators, cultural policy makers, and city planners
- Educators and students in arts management, urban planning, and public policy programs
- Civic leaders and community stakeholders interested in cultural economics
- Arts organization directors and nonprofit leaders
- Researchers exploring policy dynamics in cultural ecosystems

**Use Contexts:**
- Educational settings for teaching policy systems thinking and consequences
- Professional development for arts administrators
- Strategic planning workshops for cultural organizations
- Public engagement and stakeholder consultation processes
- Research and demonstration of policy trade-offs

## Motivation

This project addresses critical gaps in how arts policy decisions are understood and evaluated:

**Problems Addressed:**
- Arts policy decisions are often made in silos without understanding systemic consequences
- The interconnected nature of cultural ecosystems is poorly understood by decision-makers
- Trade-offs between competing cultural values are rarely made explicit
- Educational tools for policy systems thinking in the arts sector are sparse
- Stakeholders lack accessible ways to explore "what-if" scenarios in cultural planning

**Research Questions:**
- How do different funding strategies influence different metrics of cultural health?
- What are the long-term trade-offs between supporting established institutions versus grassroots artists?
- How do municipal budget constraints shape cultural policy decisions?
- What role does community engagement play in sustainable cultural ecosystems?
- How transparent should policy decision-making be in cultural planning?

## Human-Centered Design Analysis

### Affordances
- **Decision Cards**: Clear, clickable cards present policy choices with visual prominence and obvious interactivity
- **Metric Visualizations**: Charts and gauges immediately communicate system state and decision impact
- **Modal Windows**: Modal dialogs for decisions and details afford focused attention on one choice at a time
- **Progressive Disclosure**: Information reveals itself through tabs, expandable sections, and sequential modals to avoid cognitive overload
- **Temporal Navigation**: Month-to-month progression affords understanding of cause-and-effect over time

### Anti-Affordances & Intentional Constraints
- **Limited Decision Windows**: Users cannot skip decisions or revisit past months—this enforces engagement and consequence acceptance
- **Budget Constraints**: Limited allocation percentages prevent unrealistic policy spending, reflecting real-world constraints
- **Information Asymmetry**: Headlines reveal consequences post-decision, preventing perfect optimization and encouraging realistic decision-making under uncertainty
- **No Undo Function**: Decisions cannot be reverted, emphasizing commitment and consequence awareness
- **Fixed Campaign Duration**: 12-month campaign provides natural closure and prevents endless optimization

### Signifiers
- **Visual Hierarchy**: Primary actions (current decision) are centered and highlighted; secondary options are available but visually de-emphasized
- **Color Coding**: Metric cards use color (green/red) to indicate positive/negative trends, creating immediate visual meaning
- **Icon Language**: Specific icons (Users, Heart, DollarSign, Sparkles) consistently represent different policy dimensions
- **Button Styling**: Primary actions use bold fills; secondary actions use outlines, clearly communicating priority
- **Typography Scale**: Larger text for decision titles, smaller for explanatory content guides attention hierarchy
- **Animation Entrance**: Items animate in to signal interactivity and focus

### Interactive Cues & Site-Specific Action Communication
- **Hover States**: Buttons brighten and card elements highlight on hover, indicating clickability
- **Transition Animations**: Smooth fades and slides between months signal progression and change
- **Modal Pop-ins**: Decisions appear in foreground modals signaling they demand user action
- **Progress Indicators**: Visual markers show decision completion and campaign progression
- **Metric Change Animations**: Number and chart changes animate to draw attention to consequences
- **Cursor Changes**: Pointer cursor on interactive elements, default on static content

### Feedback Mechanisms

#### Visual Feedback
- **Metric Gauges**: Real-time updates show impact of each decision on community engagement, artist equity, cultural diversity, and sustainability
- **News Headlines**: Contextual news items provide narrative feedback about decision consequences
- **Chart Animations**: Recharts visualizations animate to show metric changes over time
- **Color Transitions**: Metrics shift from neutral to green (positive) or red (negative) based on trends

#### Auditory Feedback (Current: Silent)*
- Currently no audio cues; opportunities exist for subtle positive/negative sounds on decision impact or month progression

#### Feedback Loops & Behavioral Influence
1. **Immediate Consequence Loop**: Decision → Direct metric impact → Visible gauge change, creates clear causality
2. **Delayed Context Loop**: News headlines appear after decisions, revealing indirect consequences and teaching complex systems thinking
3. **Cumulative Trend Loop**: Multiple metrics tracked over 12 months show emergent properties—decisions compound in unexpected ways
4. **Comparison Loop**: Side-by-side simulation comparison lets users see how different policy choices diverge
5. **Narrative Loop**: Monthly summaries summarize the story of their choices, reinforcing agency and consequence
6. **Learning Loop**: Results page shows final standings and decision history, enabling reflection on strategic outcomes

**Behavioral Influence**: This feedback architecture encourages:
- Careful, deliberate decision-making (consequence visibility)
- Systems thinking (understanding indirect effects through news)
- Long-term planning (metric trends over full campaign)
- Experimentation (save/load simulations to explore alternatives)
- Reflection (results page summary and comparison features)

## Installation

### Prerequisites
- **Node.js**: v18 or higher (verify with `node --version`)
- **npm**: v9 or higher (comes with Node.js)
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (ES2020+ support required)

### Setup Steps

1. **Clone or download the repository**
   ```bash
   cd "Art Policy App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This installs all required packages including React, TypeScript, Tailwind CSS, and Radix UI components.

3. **Verify installation**
   ```bash
   npm list
   ```

### Running the Project

**Development Mode** (with hot reload):
```bash
npx vite dev
```
- Access the app at `http://localhost:5173` (default Vite port)
- Changes in code automatically reload in the browser
- Recommended for local development and testing

**Production Build**:
```bash
npm run build
```
- Optimizes and bundles code for deployment
- Output is in the `build/` directory

**Preview Production Build**:
```bash
npm run preview
```
- Serves the production-built application locally
- Verify production build before deployment

## Usage

### Getting Started

1. **Launch the Application**: Run `npm run dev` and open your browser to the displayed URL (typically `http://localhost:5173`)

2. **Select Your City**: The landing page presents six US cities with unique cultural contexts:
   - **Portland, Oregon**: DIY art scene and indie culture
   - **Detroit, Michigan**: Post-industrial city with grassroots arts revival
   - **Austin, Texas**: Rapid growth challenging cultural identity
   - **Providence, Rhode Island**: Small city with major arts institutions
   - **Minneapolis, Minnesota**: Strong civic arts support facing equity questions
   - **New Orleans, Louisiana**: Deep cultural traditions meeting modern challenges

3. **Complete Onboarding**: Answer profile questions about your approach to cultural policy. Your answers inform the game's initial conditions and decision options.

4. **Navigate the Dashboard**: The main simulation interface displays:
   - **Real-time Metrics**: Four key indicators (Community Engagement, Artist Equity, Cultural Diversity, Budget Sustainability)
   - **Current Decision Card**: A policy choice with 2-3 options, each with clear descriptions of impacts
   - **News Updates**: Context about your community's cultural landscape

### Making Decisions

1. Click on a decision option to open the decision preview modal
2. Review impacts across metrics before confirming
3. Click "Make Decision" to commit your choice
4. The game reveals news headlines showing decision consequences
5. Advance to the next month to continue

### Key Features to Explore

- **Decision History**: Access a complete log of all decisions made and their impacts
- **News History**: Review all headlines and news items chronologically
- **Compare Simulations**: Load multiple saved games to compare policy outcomes
- **Month Summary**: Each month shows a summary card with key metrics changes
- **Ecosystem Map**: Visualize relationships between different cultural system elements

### Tips for Success

- **Balance Metrics**: No single metric should be ignored; cultural health requires multiple dimensions
- **Plan Ahead**: Consider long-term trends, not just immediate impacts
- **Explore Trade-offs**: Different cities present different constraints—experiment with varied strategies
- **Save Frequently**: Use different save slots to explore alternative decision paths
- **Review Trends**: Use the metrics visualization to understand emergent patterns

### Screenshots and Diagrams

*[Recommended additions for your documentation]*
- Landing page with city selection
- Dashboard showing metrics, decisions, and news
- Decision modal with comparative impact display
- Results page showing campaign summary
- Comparison view of multiple simulations

## License

This project is provided for educational and research purposes. Refer to the [LICENSE](LICENSE) file in the repository for detailed terms.

## Acknowledgments

### Technologies & Libraries
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 for fast development and optimized builds
- **Styling**: Tailwind CSS 4.1.12 with custom theme system
- **UI Component Library**: Radix UI (comprehensive accessible components including dialogs, dropdowns, sliders, tabs)
- **Material Design**: Material-UI 7.3.5 for additional component options
- **Animation**: Motion (Framer Motion equivalent) for smooth transitions
- **Data Visualization**: Recharts for interactive metric charts
- **Form Management**: React Hook Form for efficient form state handling
- **State Management**: React Context API for simulation state
- **Routing**: React Router 7.13.0 for client-side navigation
- **Utilities**: Lucide React icons, date-fns for date handling, clsx for conditional className management

### Design & UX Philosophy
- Human-Centered Design principles emphasizing affordances, feedback, and systems thinking
- Inspired by educational simulations and serious games in policy education
- Decision-making interface patterns adapted from game design and interactive narrative
- Responsive design following mobile-first principles with Tailwind CSS

### Related Projects & Inspiration
- Policy Simulation Group research on interactive decision-making
- Arts management education tools and frameworks
- Educational game design practices from MIT and Carnegie Mellon
- Cultural strategy frameworks from ArtPlace America and Knight Foundation

### Design & Visual Assets
- Original Figma design: [Implement User Request](https://www.figma.com/design/znn7At0lbOa4dDcm4hriUb/Implement-User-Request)
- Custom theme system extending Tailwind CSS
- Sonner toast notifications for user feedback

## Roadmap

### Current Version (v0.0.1)
- Core simulation engine with 12-month campaign
- Six cities with unique initial conditions
- 24+ decision points with consequence modeling
- Metrics tracking and visualization
- Save/load simulation functionality
- Decision history and comparison features

### Planned Features (Next Phase)

**Enhanced Simulation Mechanics**
- [ ] Seasonal considerations affecting policy effectiveness
- [ ] Multi-stakeholder impact analysis (artists, institutions, community members, city officials)
- [ ] Dynamic difficulty scaling based on player decisions
- [ ] Consequence delayed by several months (long-term policy effects)
- [ ] Random events and external shocks (economic recession, arts grants, demographic changes)

**Expanded Content**
- [ ] Additional cities (Denver, Nashville, Baltimore, Albuquerque)
- [ ] Expanded decision library with 50+ unique choices
- [ ] Customizable initial conditions for specific research scenarios
- [ ] Multiple campaign lengths (6-month rapid, 24-month extended)

**Educational Features**
- [ ] Structured learning modules for arts administrators
- [ ] Guided tutorials for first-time players
- [ ] Classroom tools for comparing student cohort outcomes
- [ ] Downloadable reports on policy decisions and outcomes
- [ ] Integration with learning management systems (Canvas, Blackboard)

**Comparison & Analysis Tools**
- [ ] Multi-simulation comparison with trend lines
- [ ] Policy portfolio analysis (what combinations work best?)
- [ ] Stakeholder impact breakdowns (by community segment)
- [ ] "Recommended next decisions" based on current metrics
- [ ] Export decision logs as case studies

**Accessibility & Internationalization**
- [ ] Additional language translations (Spanish, French, Mandarin)
- [ ] Enhanced accessible keyboard navigation
- [ ] Screen reader optimization for all components
- [ ] High contrast mode and dyslexia-friendly font options
- [ ] WCAG 2.1 AA compliance audit and remediation

**Technical Improvements**
- [ ] Backend API integration for cloud save functionality
- [ ] Data persistence and user accounts
- [ ] Multiplayer/collaborative decision-making mode
- [ ] Real-time analytics dashboard for instructors
- [ ] Mobile-responsive optimization (tablet/iPad focus)
- [ ] Offline mode with service workers

**Research & Analytics**
- [ ] Anonymized telemetry on decision patterns and outcomes
- [ ] Heatmaps showing popular decisions vs. outcomes
- [ ] Demographic analysis of player decision-making
- [ ] Integration with academic research tools

### Known Limitations & Future Investigations
- Currently simple linear metric model; opportunity for complex systems modeling
- Limited representation of power dynamics and advocacy in cultural policy
- Single-player focus; opportunity for collaborative negotiation mechanics
- No consideration of racial equity in arts funding (planned addition)
- Limited representation of rural and smaller communities

### Release Timeline
- **Q2 2026**: Enhanced simulation mechanics, additional random events
- **Q3 2026**: Classroom tools and learning modules
- **Q4 2026**: Multi-language support and accessibility improvements
- **Q1 2027**: Mobile optimization and cloud save functionality
  
