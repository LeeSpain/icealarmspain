
import React from 'react';
import { getResponsiveImageProps } from '@/utils/image-optimization';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  aspectRatio?: string;
  width?: number;
  height?: number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallback,
  className,
  aspectRatio = '16/9',
  width,
  height,
  ...rest
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  
  const imageProps = getResponsiveImageProps(src, alt);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted", 
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={{ 
        ...(width ? { width: `${width}px` } : {}),
        ...(height ? { height: `${height}px` } : {})
      }}
      aria-hidden={rest['aria-hidden']}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      <img
        {...imageProps}
        {...rest}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading || hasError ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
      
      {hasError && fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <img 
            src={fallback} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
