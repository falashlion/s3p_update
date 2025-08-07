import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GettingStartedPage from './pages/GettingStartedPage';
import AuthenticationPage from './pages/AuthenticationPage';
import ServicesPage from './pages/ServicesPage';
import PaymentsPage from './pages/PaymentsPage';
import WebhooksPage from './pages/WebhooksPage';
import ErrorsPage from './pages/ErrorsPage';
import ClientLibrariesPage from './pages/ClientLibrariesPage';
import SandboxPage from './pages/SandboxPage';
import ChangelogPage from './pages/ChangelogPage';
import SupportPage from './pages/SupportPage';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStartedPage />} />
            <Route path="/authentication" element={<AuthenticationPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/webhooks" element={<WebhooksPage />} />
            <Route path="/errors" element={<ErrorsPage />} />
            <Route path="/client-libraries" element={<ClientLibrariesPage />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;