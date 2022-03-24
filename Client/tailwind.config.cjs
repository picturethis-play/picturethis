const production = !process.env.ROLLUP_WATCH;
module.exports = {
  theme: {
    fontFamily: {
      logo: "logo"
    },
    fontSize: {
      '69xl': '20rem'
    },
    extend: {
     animation: {
       'bouncey': 'bounce 5s ease infinite',
       'bouncer': 'bounce 4s ease infinite'
     }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active']
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
