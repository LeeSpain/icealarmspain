
import React, { Suspense, LazyExoticComponent, ComponentType } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';

/**
 * Wrapper component for lazily loaded components with a loading fallback
 */
export const AsyncComponent = ({
  component: Component,
  ...props
}: {
  component: LazyExoticComponent<ComponentType<any>>;
  [key: string]: any;
}) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full">
          <LoadingSpinner 
            size="lg" 
            color="primary"
          />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

/**
 * Creates a route with a lazy-loaded component
 */
export function AsyncPageRoute({
  component: Component,
  fallbackMessage = "Loading page...",
  ...rest
}: RouteProps & {
  component: LazyExoticComponent<ComponentType<any>>;
  fallbackMessage?: string;
}) {
  return (
    <Route
      {...rest}
      element={
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <LoadingSpinner 
                size="lg" 
                message={fallbackMessage}
                color="primary"
              />
            </div>
          }
        >
          <Component />
        </Suspense>
      }
    />
  );
}
