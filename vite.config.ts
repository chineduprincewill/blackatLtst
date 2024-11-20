import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

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
    build: {
        minify: false,
        terserOptions: {
            compress: false,
            mangle: false,
        },
    },
});
