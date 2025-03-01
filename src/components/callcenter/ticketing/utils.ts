
// Utility functions for the ticketing system

// Format date for display
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Get status badge style
export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'open':
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
    case 'pending':
      return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs";
    case 'closed':
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
    default:
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
  }
};

// Get priority badge style
export const getPriorityBadge = (priority: string) => {
  switch(priority) {
    case 'high':
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs";
    case 'medium':
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs";
    case 'low':
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs";
    default:
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs";
  }
};
