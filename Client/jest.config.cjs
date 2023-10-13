
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/src/**/*.test.tsx'],
  moduleNameMapper: {
    "\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
