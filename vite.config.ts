import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import legacy from "@vitejs/plugin-legacy";

import { tanstackRouter } from "@tanstack/router-plugin/vite";
// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false, // DO NOT generate production source maps
    target: "es2018",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
    assetsInlineLimit: 4096,
  },
  plugins: [
    react(),
    tailwindcss(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    legacy({ targets: ["defaults", "not IE 11"] }),
    obfuscatorPlugin({
      options: {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.6,
        deadCodeInjection: false,
        stringArray: true,
        stringArrayThreshold: 0.6,
        rotateStringArray: true,
        disableConsoleOutput: true,
        transformObjectKeys: true
      }
    }),
  ],
});
