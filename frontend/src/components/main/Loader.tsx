import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen fixed top-0 left-0 bg-black/40 z-50">
      <div className="relative w-32 h-32">
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          }
          .loader-ring {
            animation: spin 1s linear infinite;
          }
          .loader-center {
            animation: pulse 1.5s ease-in-out infinite;
          }
        `}</style>

        <div className="loader-ring absolute inset-0 rounded-full border-8 border-[#B6349A]/20 border-t-[#B6349A]" />

        <div className="loader-center absolute top-1/2 left-1/2 w-3/5 h-3/5 rounded-full bg-[#B6349A] shadow-[0_0_30px_rgba(182,52,154,0.5)]" />
      </div>
    </div>
  );
};

export default Loader;
