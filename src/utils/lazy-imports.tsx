
import React, { Suspense } from 'react';

export function lazyImport<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

// Create a higher-order component for lazy loading page components
export const withLazyLoading = <P extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<P> }>
) => {
  const LazyComponent = React.lazy(importFunc);
  
  // Create a proper React function component that will properly handle the props
  const WithLazyLoading = (props: P) => {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...(props as any)} />
      </Suspense>
    );
  };
  
  // Set display name for better debugging
  WithLazyLoading.displayName = `withLazyLoading(${importFunc.toString().split('(')[0]})`;
  
  return WithLazyLoading;
};
