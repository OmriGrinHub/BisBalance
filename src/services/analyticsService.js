const GA_SRC_BASE = 'https://www.googletagmanager.com/gtag/js?id=';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export async function initAnalytics() {
  const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }

  await loadScript(`${GA_SRC_BASE}${measurementId}`);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

