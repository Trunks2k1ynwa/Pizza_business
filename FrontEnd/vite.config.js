import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@styles": "/src/styles",
      // Thêm các đường dẫn định danh khác vào đây
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  reactRefresh: {
    fastRefresh: false,
  },
  // esbuild: {
  //   loader: {
  //     ".js": "jsx", // add this line
  //   },
  //   jsxInject: "import React from 'react'",
  // },
});
