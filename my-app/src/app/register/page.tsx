'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/register', { email, password });
      toast.success('Registration successful');
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Registration failed');
      } else {
        toast.error('Registration failed');
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-700 bg-opacity-50 rounded-3xl ">
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-96 border-b-2 border-r-2"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text font-bold mb-6">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full font-mono mb-4 px-3 py-2 border-b-2 border-r-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full font-mono mb-4 px-3 py-2 border-b-2 border-r-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full font-mono bg-gradient-to-r from-emerald-500 to-emerald-900 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
