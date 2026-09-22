import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Modal({ children, className = '' }: Props) {
  return (
    <div className="camada" role="dialog" aria-modal="true">
      <div className={`cartao ${className}`}>{children}</div>
    </div>
  );
}
