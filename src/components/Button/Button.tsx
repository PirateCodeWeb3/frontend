import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  onClick,
  children,
  ...rest
}: ButtonProps): React.ReactElement => (
  <button
    onClick={onClick}
    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    {...rest}
  >
    {children ?? label}
  </button>
);
