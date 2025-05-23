import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Support from './pages/Support';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import React from 'react';
import About from './pages/About';
import Projects from './pages/Projects';
import AnnualReport from './pages/AnnualReport';
import Events from './pages/Events';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const noNavFooterPaths = ['/login', '/signup'];
  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main>{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/reports" element={<AnnualReport />} />
                <Route path="/support" element={<Support />} />
                <Route path="/events" element={<Events />} />
                <Route path="/support" element={<Support />} />
                {/* Add other routes here */}
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
