"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use `next/navigation` for App Router navigation
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/modules/users/services/usersApiSlice";
import { useDispatch } from "react-redux";
import { setUser } from "@/modules/users/store/currentUserSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [login, { isError, data, isSuccess }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Login successful");
      dispatch(setUser(data));
      router.push("/users"); // Redirect to dashboard or secure route
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Invalid email or password");
    }
  }, [isError]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
