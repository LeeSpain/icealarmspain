
// Utility functions for client details components

/**
 * Format a date string to local date format
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

/**
 * Format a date string to local date and time format
 */
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

/**
 * Get the CSS class for device status badges
 */
export const getDeviceStatusBadge = (status: string) => {
  switch(status) {
    case 'active':
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
    case 'inactive':
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    case 'error':
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
    default:
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
  }
};

/**
 * Get the CSS class for interaction type badges
 */
export const getInteractionTypeBadge = (type: string) => {
  switch(type) {
    case 'ticket':
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
    case 'call':
      return "bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs";
    case 'maintenance':
      return "bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs";
    case 'email':
      return "bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
  }
};
