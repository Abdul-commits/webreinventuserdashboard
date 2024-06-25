import React, { useEffect, useState } from 'react';
import './AuthPages.css';

interface UserData {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

const DashboardPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        if (!token) {
          throw new Error('Token not found.');
        }

        const response = await fetch('https://reqres.in/api/users/2', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }

        const data = await response.json();
        setUserInfo(data.data); // Assuming data structure is { data: { avatar, email, first_name, id, last_name } }
      } catch (error: any) {
        setError(error.message ?? 'Unknown error occurred');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : userInfo ? (
        <div>
          <img src={userInfo.avatar} alt="User Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2>Welcome, {userInfo.first_name} {userInfo.last_name}!</h2>
          <p>Email: {userInfo.email}</p>
          <p>ID: {userInfo.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DashboardPage;
