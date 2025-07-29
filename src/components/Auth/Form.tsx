import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { authAPI } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import InputField from "./InputField";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authAPI.login(email, password);

      if (
        response.success &&
        response.data.access_token &&
        response.data.email
      ) {
        const user = {
          id: Date.now().toString(), // Temporary ID
          email: response.data.email,
        };
        login(user, response.data.access_token);
      } else {
        throw new Error(
          response.message || "Invalid response format from server"
        );
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <InputField
          label="Email address"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          required
          icon={Mail}
        />

        <InputField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          required
          icon={Lock}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LogIn className="h-5 w-5 text-green-500 group-hover:text-green-400" />
          </span>
          {isLoading ? "Processing..." : "Sign In / Register"}
        </button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>New users will be automatically registered</p>
      </div>
    </form>
  );
};

export default AuthForm;
