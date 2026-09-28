import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Events from './pages/Events';
import Resources from './pages/Resources';
import Newcomer from './pages/Newcomer';
import Admin from './pages/Admin';
import Signups from './pages/Signups';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="resources" element={<Resources />} />
          <Route path="signups" element={<Signups />} />
          <Route path="new" element={<Newcomer />} />
        </Route>
        {/* Admin outside MainLayout for full-page experience */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
