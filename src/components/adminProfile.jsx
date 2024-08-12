import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminProfile() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Auth/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <ul>
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
