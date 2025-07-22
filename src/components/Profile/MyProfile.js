import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import './MyProfile.css'; 

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axiosInstance.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data); 
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-form">
        <div className="profile-row">
          <label><strong>Name:</strong></label>
          <span>{user.name}</span>
        </div>
        <div className="profile-row">
          <label><strong>Email:</strong></label>
          <span>{user.email}</span>
        </div>
        <div className="profile-row">
          <label><strong>Role:</strong></label>
          <span>{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;