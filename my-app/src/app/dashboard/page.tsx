'use client'
import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DataTable from '@/components/dashboard/DataTable';
import { logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 ">
          <h1 className="text-7xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-red-400 px-4 py-2 rounded-2xl hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>
        <DataTable />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
