
// Update the LoadingSpinner usage to match the component props
{isLoading && (
  <LoadingSpinner 
    size="lg" 
    fullPage={true} 
    message="Loading product details..."
    color="primary"
  />
)}
