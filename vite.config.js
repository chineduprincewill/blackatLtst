import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import tsconfigPaths from 'vite-tsconfig-paths';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        chunkSplitPlugin({
            strategy: 'unbundle',
            customSplitting: {
                // All files in `src/container` will be merged together in `container` chunk
                container: [/src\/container/],
            },
        }),
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
});
