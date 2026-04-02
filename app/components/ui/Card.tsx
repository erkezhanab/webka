import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-[color:var(--line)] bg-[color:var(--panel)] shadow-[var(--shadow-md)] backdrop-blur-xl transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:border-[rgba(15,98,254,0.2)] hover:shadow-[var(--shadow-lg)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`border-b border-[color:var(--line)] px-6 py-5 ${className}`}>{children}</div>;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`border-t border-[color:var(--line)] px-6 py-5 ${className}`}>{children}</div>;
}
