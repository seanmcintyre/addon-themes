module.exports = {
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: true,
    checkOptions: {},
  },
  features: {
    postcss: false,
    previewCsfV3: false,
    buildStoriesJson: false,
    storyStoreV7: false,
  },
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: ['../dist/register'],
};
