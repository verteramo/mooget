import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import tsconfigPaths from "vite-tsconfig-paths";

function generateManifest() {
  const manifest = readJsonFile("manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    webExtension({
      manifest: generateManifest,
      disableAutoLaunch: true,
    }),
  ],
});
