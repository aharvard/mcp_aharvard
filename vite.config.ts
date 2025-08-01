import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "public",
        emptyOutDir: false, // Don't empty the public folder to preserve existing files
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
