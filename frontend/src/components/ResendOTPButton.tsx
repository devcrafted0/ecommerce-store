"use client";

import { useEffect, useState } from "react";

type ResendOTPButtonProps = {
  onResend: () => void; // function to call when user clicks "Resend"
  delayMs?: number; // optional custom delay, defaults to 2 minutes
};

export default function ResendOTPButton({
  onResend,
  delayMs = 2 * 60 * 1000, // 2 minutes
}: ResendOTPButtonProps) {
  const STORAGE_KEY = "otpResendExpiry";
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = localStorage.getItem(STORAGE_KEY);
      if (!expiry) {
        setRemaining(0);
        return;
      }

      const timeLeft = parseInt(expiry, 10) - Date.now();

      if (timeLeft <= 0) {
        localStorage.removeItem(STORAGE_KEY);
        setRemaining(0);
      } else {
        setRemaining(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    const expiry = Date.now() + delayMs;
    localStorage.setItem(STORAGE_KEY, expiry.toString());
    setRemaining(delayMs);
    onResend(); // trigger your backend call
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <button
      onClick={handleClick}
      disabled={remaining > 0}
      className={`px-4 py-2 rounded-md text-white transition w-full ${
        remaining > 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary hover:opacity-90"
      }`}
    >
      {remaining > 0 ? `Resend in ${formatTime(remaining)}` : "Resend OTP"}
    </button>
  );
}