
// Analytics service mock for Firebase to satisfy imports

export const logEvent = (eventName: string, eventParams?: Record<string, any>) => {
  console.log(`Analytics event: ${eventName}`, eventParams);
};

export const setUserProperties = (properties: Record<string, any>) => {
  console.log('Setting user properties:', properties);
};

export const setUserId = (userId: string | null) => {
  console.log('Setting analytics user ID:', userId);
};

export const setCurrentScreen = (screenName: string) => {
  console.log('Setting current screen:', screenName);
};
