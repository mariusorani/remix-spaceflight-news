import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  root: __dirname,
  optimizeDeps: {
    include: ["@radix-ui/themes", "@radix-ui/react-icons"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  ssr: {
    noExternal: ["@radix-ui/themes", "@radix-ui/react-icons"],
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
});
