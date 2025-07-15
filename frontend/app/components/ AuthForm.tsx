"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Toaster } from "@/components/ui/sonner";

interface AuthFormProps {
  isSignUp: boolean;
  onToggle: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp, onToggle }) => {
  const { accessToken, login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignup();
    }
    else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = {
        email: formData.email,
        password: formData.password,
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/auth/login`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success("LoggedIn successfully!!");
        login(res.data.access_Token, res.data.refresh_Token, res.data.user);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      console.log("error", error);
      console.log("error.response.data.message", error.response.data.message);
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleSignup = async () => {
    try {
      setLoading(true);
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/auth/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        toast.success("Account created successfully!!");
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-gray-600">
          {isSignUp
            ? 'Sign up to get started with your account'
            : 'Sign in to your account to continue'
          }
        </p>
      </div>

      <Card className="shadow-lg border-0">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={isSignUp}
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={onToggle}
                disabled={loading}
                className="ml-1 text-purple-600 hover:text-purple-500 font-medium transition-colors"
              >
                {/* {isSignUp ? 'Sign In' : 'Sign Up'} */}
                {
                  loading ? isSignUp ? 'Signing In...' : 'Signing Up...' : isSignUp ? 'Sign In' : 'Sign Up'
                }
              </button>
            </p>
          </div>

        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default AuthForm;
