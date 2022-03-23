const production = !process.env.ROLLUP_WATCH;
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [],
  purge: {
    content: ['./src/App.svelte', './src/pages/*', './src/components/*'],
    enabled: production, // disable purge in dev
  },
};
