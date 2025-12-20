"use client";

interface UserOctagonProps {
  className?: string;
  size?: number;
}

export function UserOctagon({ className, size = 62 }: UserOctagonProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Hexagonal border */}
      <path
        d="M31 4L54.5 14.5V47.5L31 58L7.5 47.5V14.5L31 4Z"
        stroke="#EEAC1D"
        strokeWidth="2"
        fill="none"
      />
      {/* User icon */}
      <circle
        cx="31"
        cy="24"
        r="8"
        stroke="#EEAC1D"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M18 45C18 38.373 23.373 33 30 33H32C38.627 33 44 38.373 44 45"
        stroke="#EEAC1D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

