'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { performLogout } from '../../../utils/auth';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and has admin role
    const storedUsername = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    if (!storedUsername || userRole !== 'ADMIN') {
      // Redirect to login if not logged in as admin
      router.push('/login');
      return;
    }
    
    setUsername(storedUsername);
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    try {
      // Use centralized logout function
      performLogout();
      console.log('Admin logout completed');
    } catch (error) {
      console.error('Error during admin logout:', error);
    }

    // Redirect to login
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/wtl-logo.png" 
              alt="WTL Tourism" 
              className="h-12 mr-3" 
            />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-blue-800">Users</h3>
              <p className="mt-2 text-blue-600">Manage user accounts</p>
              <Link 
                href="/admin/users" 
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Users
              </Link>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-green-800">Vendors</h3>
              <p className="mt-2 text-green-600">Manage vendor accounts</p>
              <Link 
                href="/admin/vendors" 
                className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View Vendors
              </Link>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-purple-800">System</h3>
              <p className="mt-2 text-purple-600">System settings and logs</p>
              <Link 
                href="/admin/system" 
                className="mt-4 inline-block px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                System Settings
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 