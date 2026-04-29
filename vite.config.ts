import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vite";

const base = process.env.BASE_PATH ?? "";

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: "prompt",
      injectRegister: "script-defer",
      manifest: {
        name: "Unit Conversion Tool",
        short_name: "Unit Converters",
        description: "Unit and measurement conversion tool — works offline",
        theme_color: "#1e293b",
        background_color: "#0f172a",
        display: "standalone",
        scope: base ? `${base}/` : "/",
        start_url: base ? `${base}/` : "/",
        icons: [
          {
            src: "icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff,woff2}"],
        navigateFallback: base ? `${base}/` : "/",
        navigateFallbackDenylist: [/^\/api\//],
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
