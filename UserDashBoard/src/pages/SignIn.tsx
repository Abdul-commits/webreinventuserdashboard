import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import './AuthPages.css';

interface SignInResponse {
  token: string;
}

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Ensure error state is typed correctly
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials. Please try again.');
      }

      const data: SignInResponse = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error: any) { // Catch all errors and handle them
      setError(error.message ?? 'Unknown error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Sign In</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignInPage;
