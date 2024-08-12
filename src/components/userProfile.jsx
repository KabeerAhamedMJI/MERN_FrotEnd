import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
    // State to hold the user data
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Function to get user profile data from the server
        const fetchUserProfile = async () => {
            try {
                // Send a request to get the user profile
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Auth/profile`);
                // Update the state with the user data
                setUser(response.data);
            } catch (error) {
                // Log any errors that occur
                console.error('Error fetching user profile:', error);
            }
        };

        // Call the function to get user profile when the component mounts
        fetchUserProfile();
    }, []);

    // Show a loading message while waiting for the data
    if (!user) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            {/* Display user profile information */}
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}

export default UserProfile;
