import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin(),
        VitePWA({
            manifest: {
                includeAssets: [
                    "favicon.svg",
                    "favicon.ico",
                    "robots.txt",
                    "apple-touch-icon.png",
                ],
                name: "Adelaide ID",
                description:
                    "AdelaideID makes taking attendance easy, allowing you to validate and mark off students with a simple barcode-scan of an ID card.",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
    server: {
        proxy: {
            "/api": "http://localhost:8081",
        },
    },
});
