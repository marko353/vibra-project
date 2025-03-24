import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'scss', 'css'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
      '^.+\\.scss$': 'jest-transform-stub', // Za SCSS fajlove
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      '\\.scss$': 'identity-obj-proxy', // Mock-uje SCSS fajlove
      '\\.css$': 'identity-obj-proxy',  // Mock-uje CSS fajlove
    },
  };
  
  export default config;
  
  
