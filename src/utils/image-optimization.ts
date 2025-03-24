
/**
 * Utility functions for image optimization
 */

/**
 * Get optimized image URL based on screen size
 * @param imagePath Original image path
 * @param size Desired size (sm, md, lg)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (imagePath: string, size: 'sm' | 'md' | 'lg'): string => {
  // If it's an external URL (starts with http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // For local images, add width parameter for responsive images
  const sizeMap = {
    sm: '480w',
    md: '768w',
    lg: '1200w'
  };
  
  // This is a placeholder implementation
  // In a real app, you would use an image transformation service or native browser features
  return `${imagePath}?width=${sizeMap[size]}`;
};

/**
 * Creates a responsive image srcset
 * @param imagePath Base image path
 * @returns srcSet string for responsive images
 */
export const createResponsiveSrcSet = (imagePath: string): string => {
  // If it's an external URL, we can't manipulate it
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Create srcset for responsive images
  return `
    ${imagePath}?width=480 480w,
    ${imagePath}?width=768 768w,
    ${imagePath}?width=1024 1024w,
    ${imagePath}?width=1200 1200w
  `.trim();
};

/**
 * Component properties for responsive images
 */
export const getResponsiveImageProps = (imagePath: string, alt: string) => {
  return {
    src: imagePath,
    srcSet: createResponsiveSrcSet(imagePath),
    sizes: "(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1200px",
    alt,
    loading: "lazy" as const,
  };
};
