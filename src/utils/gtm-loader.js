export function loadGtm(gtmId) {
  if (!gtmId) {
    console.error('GTM ID is required');
    return;
  }

  // Check if GTM script already exists
  if (document.getElementById('gtm-script')) {
    console.log('GTM already loaded');
    return;
  }

  // Add dataLayer initialization
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  // Create the GTM script element
  const script = document.createElement('script');
  script.id = 'gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  console.log(`GTM script loaded.`);
}