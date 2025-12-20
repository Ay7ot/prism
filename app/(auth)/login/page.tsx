"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { demoCredentials } from "@/lib/data/users";
import { UserOctagon } from "@/components/ui/user-octagon";

export default function LoginPage() {
  const router = useRouter();
  const [workId, setWorkId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      workId === demoCredentials.workId &&
      password === demoCredentials.password
    ) {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Try: NDPHC001 / demo123");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#111] overflow-hidden">
      {/* Desktop Layout - Side by side */}
      <div className="login-desktop min-h-screen">
        {/* Left Panel - Image Background (already contains PRISM logo) */}
        <div className="w-1/2 relative">
          <Image
            src="/login.png"
            alt="PRISM Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 flex items-center justify-center bg-[#111] backdrop-blur-[11px]">
          <LoginForm
            workId={workId}
            setWorkId={setWorkId}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            isLoading={isLoading}
            handleLogin={handleLogin}
          />
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="login-mobile flex-col min-h-screen">
        {/* Top - Image Background (already contains PRISM logo) */}
        <div className="h-[495px] relative shrink-0">
          <Image
            src="/imobilelogin.png"
            alt="PRISM Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Bottom - Login Card */}
        <div className="flex-1 flex justify-center bg-[#111] backdrop-blur-[11px] -mt-56 rounded-xl mx-5 px-2 py-12">
          <LoginForm
            workId={workId}
            setWorkId={setWorkId}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={error}
            isLoading={isLoading}
            handleLogin={handleLogin}
            isMobile
          />
        </div>
      </div>
    </div>
  );
}

interface LoginFormProps {
  workId: string;
  setWorkId: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  error: string;
  isLoading: boolean;
  handleLogin: (e: React.FormEvent) => void;
  isMobile?: boolean;
}

function LoginForm({
  workId,
  setWorkId,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  isLoading,
  handleLogin,
  isMobile = false,
}: LoginFormProps) {
  return (
    <div className="w-full max-w-[337px] px-1 flex flex-col items-center gap-[30px]">
      {/* Icon and Title */}
      <div className="flex flex-col items-center h-[104px] justify-between">
        <UserOctagon size={62} />
        <h1
          className="text-[30px] font-bold text-white capitalize"
          style={{ fontFamily: "var(--font-outfit)", lineHeight: "30px" }}
        >
          Login
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        {/* Work ID Input */}
        <div className="relative h-[49px]">
          <input
            type="text"
            placeholder="Work ID"
            value={workId}
            onChange={(e) => setWorkId(e.target.value)}
            className="w-full h-full bg-[#2c2c2c] rounded-xl px-5 text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#eeac1d]/50"
            style={{ fontFamily: "var(--font-outfit)", fontWeight: 500 }}
          />
        </div>

        {/* Password Input */}
        <div className="relative h-[49px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full bg-[#2c2c2c] rounded-xl px-5 pr-16 text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#eeac1d]/50"
            style={{ fontFamily: "var(--font-outfit)", fontWeight: 500 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 text-xs font-bold hover:text-white/40 transition-colors"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-[#ef4444] bg-[#ef4444]/10 px-4 py-2 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Submit Button and Forgot Password */}
        <div className="flex flex-col items-center h-[100px] justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[53px] bg-[#ffc34d] rounded-xl flex items-center justify-center text-black text-base font-medium hover:bg-[#eeac1d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          <p
            className="text-xs text-white text-center"
            style={{ fontFamily: "var(--font-outfit)", fontWeight: 500 }}
          >
            Forgot Password?{" "}
            <span className="text-[#ffc34d]">Reset</span>
          </p>
        </div>
      </form>

      {/* Demo Credentials Hint - Only show if not mobile or for testing */}
      {!isMobile && (
        <div className="w-full p-4 bg-[#111]/50 rounded-xl">
          <p className="text-xs text-[#a5a4a4] text-center mb-2">
            Demo Credentials
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm">
            <span className="text-[#eeac1d] text-center">Work ID: NDPHC001</span>
            <span className="text-[#eeac1d] text-center">Password: demo123</span>
          </div>
        </div>
      )}
    </div>
  );
}
