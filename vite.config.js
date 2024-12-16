import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    base: process.env.VITE_APP_URL_BASE,
    build: {
      outDir: 'dist', // 输出目录为 dist/river
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the folder containing SVG files
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify the symbolId format for the SVG icons
        symbolId: "icon-[dir]-[name]",
      }),
    ],

    server: {
      port: parseInt(process.env.VITE_PORT),
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
