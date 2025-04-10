import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = 'NextGen Websites', 
  description = 'Professional web development services for businesses of all sizes. Custom websites, e-commerce solutions, and digital marketing services.',
  keywords = 'web development, web design, react development, responsive websites, SEO services',
  canonicalUrl,
  ogImage = '/src/images/logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => {
  const siteUrl = 'https://yourwebsitedomain.com'; // Replace with your actual domain
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="NextGen Websites" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Robots Meta Tag */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export default SEO;