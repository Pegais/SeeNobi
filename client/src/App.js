import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';

// Lazy load components for better performance and code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Auth/Login'));
const Register = lazy(() => import('./pages/Auth/Register'));
const CitizenDashboard = lazy(() => import('./pages/Citizen/Dashboard'));
const CitizenProfile = lazy(() => import('./pages/Citizen/Profile'));
const SubmitIssue = lazy(() => import('./pages/Citizen/SubmitIssue'));
const AddressVerification = lazy(() => import('./pages/Citizen/AddressVerification'));
const IssueDetail = lazy(() => import('./pages/Issue/IssueDetail'));
const IssuesList = lazy(() => import('./pages/Issue/IssuesList'));
const OfficialDashboard = lazy(() => import('./pages/Official/Dashboard'));
const OfficialProfile = lazy(() => import('./pages/Official/Profile'));
const PrivatePlayerDashboard = lazy(() => import('./pages/PrivatePlayer/Dashboard'));
const PrivatePlayerProfile = lazy(() => import('./pages/PrivatePlayer/Profile'));
const RatingPage = lazy(() => import('./pages/Rating/RatingPage'));
const PollingPage = lazy(() => import('./pages/Polling/PollingPage'));
const VerificationPage = lazy(() => import('./pages/Verification/VerificationPage'));
const AnalyticsPage = lazy(() => import('./pages/Analytics/AnalyticsPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    color: 'var(--text-secondary)'
  }}>
    <div>Loading...</div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Citizen Routes */}
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/profile" element={<CitizenProfile />} />
            <Route path="/citizen/submit-issue" element={<SubmitIssue />} />
            <Route path="/citizen/verify-address" element={<AddressVerification />} />
            
            {/* Issue Routes */}
            <Route path="/issues" element={<IssuesList />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            
            {/* Official Routes */}
            <Route path="/official/dashboard" element={<OfficialDashboard />} />
            <Route path="/official/profile/:id" element={<OfficialProfile />} />
            
            {/* Private Player Routes */}
            <Route path="/private-player/dashboard" element={<PrivatePlayerDashboard />} />
            <Route path="/private-player/profile/:id" element={<PrivatePlayerProfile />} />
            
            {/* Rating & Polling Routes */}
            <Route path="/rating/:entityType/:entityId" element={<RatingPage />} />
            <Route path="/polling/:entityType/:entityId" element={<PollingPage />} />
            <Route path="/verification" element={<VerificationPage />} />
            
            {/* Analytics */}
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

