import { createBrowserRouter } from 'react-router';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import DecisionHistory from './pages/DecisionHistory';
import Results from './pages/Results';
import SavedSimulations from './pages/SavedSimulations';
import CompareSimulations from './pages/CompareSimulations';
import SimulationDetail from './pages/SimulationDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/onboarding',
    Component: Onboarding,
  },
  {
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/history',
    Component: DecisionHistory,
  },
  {
    path: '/results',
    Component: Results,
  },
  {
    path: '/saved',
    Component: SavedSimulations,
  },
  {
    path: '/compare',
    Component: CompareSimulations,
  },
  {
    path: '/simulation-detail/:id',
    Component: SimulationDetail,
  },
]);