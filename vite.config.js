import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build source lives in build-src/ so it never clashes with the deployed
// root artifacts (index.html + assets/). Output goes to dist/, which is then
// copied to the repo root for GitHub Pages.
export default defineConfig({
  root: "build-src",
  base: "/",
  plugins: [react()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
