
import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  structuredData?: Record<string, any>;
}

const SEO: React.FC<SEOProps> = ({
  title = "ICE Alarm España - Emergency Alert Systems",
  description = "ICE Alarm España provides reliable emergency alert systems for seniors and individuals with medical conditions in Spain.",
  keywords = "emergency alert, medical alarm, senior care, emergency response, Spain, elderly care",
  canonical = window.location.href,
  ogImage = "/og-image.png",
  ogType = "website",
  structuredData,
}) => {
  const siteTitle = title.includes("ICE Alarm España") ? title : `${title} | ICE Alarm España`;
  
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Structured data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
