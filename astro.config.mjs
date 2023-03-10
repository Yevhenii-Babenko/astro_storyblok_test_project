import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv("", process.cwd(), 'STORYBLOK');

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      apiOptions: {
        cache: {
          clear: "auto",
          type: "memory",
        },
      },
      useCustomApi: false,
      bridge: true,
      components: {
        page: "storyblok/Page",
        feature: "storyblok/Feature",
        grid: "storyblok/Grid",
        teaser: "storyblok/Teaser",
      },
    }),
  ],
  // vite: {
  //   // plugins: [basicSsl()],
  //   server: {
  //     https: true,
  //   },
  // },
  output: 'server',
  adapter: netlify(),
});