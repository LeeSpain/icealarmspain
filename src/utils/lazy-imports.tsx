
// Update the LoadingSpinner usage to match the component props
export const AsyncComponent = ({
  component: Component,
  ...props
}: {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  [key: string]: any;
}) => {
  return (
    <React.Suspense
      fallback={
        <LoadingSpinner 
          size="lg" 
          fullPage={true} 
          color="primary"
        />
      }
    >
      <Component {...props} />
    </React.Suspense>
  );
};

// And later in the file:
export function AsyncPageRoute({
  component: Component,
  fallbackMessage = "Loading page...",
  ...rest
}: RouteProps & {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallbackMessage?: string;
}) {
  return (
    <Route
      {...rest}
      element={
        <React.Suspense
          fallback={
            <LoadingSpinner 
              size="lg" 
              fullPage={true} 
              message={fallbackMessage}
              color="primary"
            />
          }
        >
          <Component />
        </React.Suspense>
      }
    />
  );
}
