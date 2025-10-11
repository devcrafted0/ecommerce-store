"use client";

import React, { useState, useRef } from "react";

interface OtpInputProps {
  length?: number; // default 6
  onChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return; // allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Notify parent
    onChange?.(newOtp.join(""));

    // Move focus to next box if value is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("").concat(Array(length).fill("")).slice(0, length);
      setOtp(newOtp);
      onChange?.(newOtp.join(""));
      inputRefs.current[length - 1]?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {(inputRefs.current[index] = el)}}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          style={{
            width: "45px",
            height: "55px",
            textAlign: "center",
            fontSize: "22px",
            borderRadius: "8px",
            border: "2px solid #ccc",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#B6349A")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      ))}
    </div>
  );
};

export default OtpInput;
