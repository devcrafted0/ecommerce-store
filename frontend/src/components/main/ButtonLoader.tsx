const ButtonLoader = ({ size = 16, color = "white" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin"
    >
      <defs>
        <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#spinnerGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="60 40"
      />
    </svg>
  );
};

export default ButtonLoader;