import React, { useState } from 'react';
import { signUp } from '../services/httpService';
import Input from '../components/Input';
import './AuthPages.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signUp(email, password);
      alert('Registration successful');
      // Redirect to sign-in page after successful registration
      navigate('/signin'); // Navigate to '/signin' route
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <h6>API only supports registration of their already created users. If you want to create a new user, use "eve.holt@reqres.in" as Username and "pistol" as Password.</h6>
    </div>
  );
};

export default SignUpPage;
