import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx', 
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: resolve(__dirname, '../vite.config.ts'),
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Add your custom Vite config here
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@calendar/core': resolve(__dirname, '../../../packages/core/dist'),
          '@calendar/react': resolve(__dirname, '../../../packages/react/dist'),
        },
      },
    };
  },
};

export default config; 