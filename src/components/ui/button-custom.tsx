
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  children: React.ReactNode;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant = "primary", 
      size = "md", 
      isLoading = false, 
      children, 
      ...props 
    }, 
    ref
  ) => {
    const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-ice-600 text-white hover:bg-ice-700 focus:ring-ice-500",
      secondary: "bg-secondary text-foreground hover:bg-secondary/80 focus:ring-secondary",
      outline: "border border-input bg-background hover:bg-secondary focus:ring-primary",
      ghost: "hover:bg-secondary focus:ring-primary",
      link: "text-primary underline-offset-4 hover:underline"
    };
    
    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-12 px-8 text-base"
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && "relative text-transparent transition-none hover:text-transparent",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </div>
        )}
        {children}
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom };
