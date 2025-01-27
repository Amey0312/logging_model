'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/utils/auth';
import { toast } from 'react-toastify';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-400 bg-opacity-40 rounded-3xl ">
      <form
        className="bg-white p-8 border-b-2 border-r-2 rounded-2xl shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-3xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-3 py-2 border-b-2 border-r-2 text-black font-mono rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 text-black border-b-2 border-r-2 font-mono rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full font-mono bg-gradient-to-r from-emerald-500 to-emerald-900 text-white text-xl  py-2 rounded hover:bg-gray-400 transition"
        >
          Login
        </button>
        <div className="mt-4 text-gray-400 text-center">
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/register')}
              className="text-blue-500 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;