import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Auth/profile`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}

export default UserProfile;
