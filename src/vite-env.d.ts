/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_RECAPTCHA_SITE_KEY: string;
    readonly VITE_EMAIL_SERVICE: string;
    readonly VITE_EMAIL_TEMPLATE: string;
    readonly VITE_EMAIL_USER: string;
    // Add any other environment variables you might need here
    readonly [key: string]: string;
  };
}
