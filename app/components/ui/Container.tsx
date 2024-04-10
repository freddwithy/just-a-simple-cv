// Container.tsx

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Prop para las clases de Tailwind
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  // Agrega las clases de Tailwind al contenedor
  const containerClasses = `py-10 mx-auto max-w-lg ${className || ''}`;

  return (
    <div className={containerClasses}>{children}</div>
  );
};

export default Container;
