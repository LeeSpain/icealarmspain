
import { useEffect } from "react";

export const useDevCredentials = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => {
  // Pre-fill dev credentials on load if in development mode
  useEffect(() => {
    if (localStorage.getItem('forceDevMode') === 'true') {
      // Fill with dev credentials
      handleChange({ target: { name: 'email', value: 'admin@icealarm.es' } } as React.ChangeEvent<HTMLInputElement>);
      handleChange({ target: { name: 'password', value: 'password123' } } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [handleChange]);
};
