// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import DashboardPage from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Set the initial path to /signup */}
        <Route path="/" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<ProtectedRoute component={DashboardPage} />} />
        {/* <Route path="/dashboard" element={<DashboardPage/>} /> */}

      </Routes>
    </Router>
  );
};

export default App;
