import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      builder: {
        useSWC: false,
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../src/assets'],
  typescript: {
    check: false,
  },
  webpackFinal: async (config) => {
    // Modify CSS rules to allow DevExtreme CSS from node_modules
    const rules = config.module?.rules || [];
    
    for (const rule of rules) {
      if (rule && typeof rule === 'object' && Array.isArray(rule.oneOf)) {
        // Storybook uses oneOf structure
        for (const oneOfRule of rule.oneOf) {
          if (oneOfRule && oneOfRule.test) {
            const testStr = oneOfRule.test.toString();
            // Find CSS rules (not CSS modules)
            if (testStr.includes('css') && !testStr.includes('module')) {
              // Modify exclude function to allow DevExtreme CSS
              if (oneOfRule.exclude) {
                if (typeof oneOfRule.exclude === 'function') {
                  const originalExclude = oneOfRule.exclude;
                  oneOfRule.exclude = (filePath: string) => {
                    // Don't exclude DevExtreme CSS files
                    if (filePath && filePath.includes('devextreme') && filePath.endsWith('.css')) {
                      return false;
                    }
                    // Call original exclude function
                    try {
                      return originalExclude(filePath);
                    } catch (e) {
                      // If original exclude fails, default to excluding node_modules except DevExtreme
                      return filePath.includes('node_modules') && !filePath.includes('devextreme');
                    }
                  };
                } else if (Array.isArray(oneOfRule.exclude)) {
                  // Remove DevExtreme from exclude array
                  oneOfRule.exclude = oneOfRule.exclude.filter((exclude: any) => {
                    if (typeof exclude === 'string') {
                      return !exclude.includes('devextreme');
                    }
                    if (exclude && typeof exclude === 'object' && exclude.test) {
                      const excludeTest = exclude.test.toString();
                      return !excludeTest.includes('devextreme');
                    }
                    return true;
                  });
                }
              } else {
                // If no exclude, add one that allows DevExtreme
                oneOfRule.exclude = (filePath: string) => {
                  return filePath.includes('node_modules') && !filePath.includes('devextreme');
                };
              }
            }
          }
        }
      }
    }

    return config;
  },
};

export default config;
