import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import monkey, { cdn } from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
              name: 'Antolin User Script',
              namespace: 'npm/antolin-user-script',
              version: '0.1.0',
              author: 'radu',
              description: 'Antolin User Script',
              match: ['https://antolin.westermann.de/*'],
              // resource: {
              //   'pico-css': 'https://cdn.jsdelivr.net/npm/@picocss/pico@2.0.6/css/pico.min.css',
              // },
              grant: ['GM_addStyle', 'GM_getResourceText'],
            },
            build: {
              externalGlobals: {
                preact: cdn.jsdelivr('preact', 'dist/preact.min.js'),
                'preact/hooks': ['preactHooks', 'https://cdn.jsdelivr.net/npm/preact@10.29.2/hooks/dist/hooks.umd.js'],
              },
            },
        }),
    ],
});
