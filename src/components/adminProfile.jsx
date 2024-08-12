import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProfile() {
    // State to hold the list of users
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Function to get the users from the server
        const fetchUsers = async () => {
            try {
                // Send a request to get the users
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Auth/users`);
                // Update the state with the users
                setUsers(response.data);
            } catch (error) {
                // Log any errors that occur
                console.error('Error fetching users:', error);
            }
        };

        // Call the function to get users when the component mounts
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <ul>
                {/* Loop through each user and show their details */}
                {users.map((user) => (
                    <li key={user._id} className="mb-2 border-b pb-2">
                        {user.name} - {user.email} - {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminProfile;
