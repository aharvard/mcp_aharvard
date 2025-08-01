import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist",
        emptyOutDir: true, // Empty the dist folder for clean builds
        rollupOptions: {
            input: {
                main: "index.html",
            },
        },
    },
    server: {
        port: 3000,
    },
});
