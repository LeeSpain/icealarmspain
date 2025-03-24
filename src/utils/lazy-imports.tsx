
import React, { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface LazyComponentProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  loading?: React.ReactNode;
  props?: Record<string, any>;
}

export function lazyImport<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  component: Component,
  loading,
  props = {},
}) => {
  return (
    <Suspense fallback={loading || <LoadingSpinner fullPage />}>
      <Component {...props} />
    </Suspense>
  );
};

// Create a higher-order component for lazy loading page components
export const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>,
  loadingMessage?: string
) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props: P) => (
    <Suspense fallback={<LoadingSpinner fullPage message={loadingMessage} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
