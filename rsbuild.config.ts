import { defineConfig } from '@rsbuild/core';
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss';

export default defineConfig({
  plugins: [pluginTailwindcss()],
  source: {
    entry: {
      index: './src/index.ts',
      about: './src/about.ts',
    },
  },
  html: {
    template: './src/index.html',
  },
  tools: {
    htmlPlugin(config, { entryName }) {
      if (entryName === 'about') {
        config.template = './src/about.html';
      }
    },
  },
});
