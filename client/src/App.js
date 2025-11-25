import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import CitizenDashboard from './pages/Citizen/Dashboard';
import CitizenProfile from './pages/Citizen/Profile';
import SubmitIssue from './pages/Citizen/SubmitIssue';
import AddressVerification from './pages/Citizen/AddressVerification';
import IssueDetail from './pages/Issue/IssueDetail';
import IssuesList from './pages/Issue/IssuesList';
import OfficialDashboard from './pages/Official/Dashboard';
import OfficialProfile from './pages/Official/Profile';
import PrivatePlayerDashboard from './pages/PrivatePlayer/Dashboard';
import PrivatePlayerProfile from './pages/PrivatePlayer/Profile';
import RatingPage from './pages/Rating/RatingPage';
import PollingPage from './pages/Polling/PollingPage';
import VerificationPage from './pages/Verification/VerificationPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';

function App() {
  return (
    <ThemeProvider>
      <Layout>
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
      </Layout>
    </ThemeProvider>
  );
}

export default App;

