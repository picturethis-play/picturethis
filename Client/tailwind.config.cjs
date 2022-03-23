const production = !process.env.ROLLUP_WATCH;
module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  plugins: [
  ],
  purge: {
    content: [
     "./src/App.svelte",
     "./src/pages/*"
    ],
    enabled: production // disable purge in dev
  },
};