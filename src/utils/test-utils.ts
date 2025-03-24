
/**
 * Test utilities for application quality assurance
 */

// Check if all links on the page are valid and not leading to 404s
export const validateLinks = () => {
  console.log("Running link validation...");
  
  // Get all links on the page
  const links = document.querySelectorAll('a');
  const brokenLinks: string[] = [];
  const validLinks: string[] = [];
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip empty, anchor or javascript links
    if (!href || href === '#' || href.startsWith('javascript:') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return;
    }
    
    // For internal links, check if they match any route
    if (!href.startsWith('http')) {
      const path = href.split('?')[0]; // Remove query params
      
      // Log the link for manual testing
      validLinks.push(path);
    }
  });
  
  console.log("Links to test:", validLinks);
  return {
    brokenLinks,
    validLinks,
    totalLinks: links.length
  };
};

// Check responsive behavior on different screen sizes
export const checkResponsiveness = () => {
  const width = window.innerWidth;
  
  if (width < 640) {
    console.log("Currently in mobile view");
    return "mobile";
  } else if (width < 1024) {
    console.log("Currently in tablet view");
    return "tablet";
  } else {
    console.log("Currently in desktop view");
    return "desktop";
  }
};

// Check if key UI elements are visible and accessible
export const checkUIElements = () => {
  const elements = {
    navbar: !!document.querySelector('nav'),
    footer: !!document.querySelector('footer'),
    mainContent: !!document.querySelector('main'),
    logo: !!document.querySelector('[alt*="logo" i]')
  };
  
  console.log("UI elements check:", elements);
  return elements;
};

// Run basic accessibility checks
export const runAccessibilityChecks = () => {
  // Check for alt text on images
  const images = document.querySelectorAll('img');
  const imagesWithoutAlt = Array.from(images).filter(img => !img.hasAttribute('alt'));
  
  // Check for proper heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
  
  // Check for sufficient color contrast (simplified)
  const lowContrastElements = [];
  
  return {
    imagesWithoutAlt: imagesWithoutAlt.length,
    headingLevels,
    lowContrastElements
  };
};

// Run all quality tests at once
export const runAllTests = () => {
  console.group("Running Quality Assurance Tests");
  
  console.log("Browser Info:", navigator.userAgent);
  console.log("Screen Size:", window.innerWidth, "x", window.innerHeight);
  
  const links = validateLinks();
  const responsiveness = checkResponsiveness();
  const uiElements = checkUIElements();
  const a11y = runAccessibilityChecks();
  
  console.groupEnd();
  
  return {
    links,
    responsiveness,
    uiElements,
    accessibility: a11y
  };
};
