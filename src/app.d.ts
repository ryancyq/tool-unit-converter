declare global {
  namespace App {
    // interfaces (Error, Locals, PageData, Platform) can be added here as needed
  }

  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export {};
