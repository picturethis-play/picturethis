const production = !process.env.ROLLUP_WATCH;
module.exports = {
  theme: {
    fontSize: {
      '69xl': '20rem',
      '10xl': '10rem'
    },
    fontFamily: {
      logo: "logo"
    },
    extend: {
      animation: {
        'bouncey': 'bounce 3s ease infinite',
        'bouncer': 'bounce 2s ease infinite'
      },
      boxShadow: {
        '69xl': '6px 10px 0px rgba(0, 0, 0, 1)'
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
  plugins: [require('daisyui')],
  content: ['./src/App.svelte', './src/pages/*', './src/components/*'],
  enabled: production, // disable purge in dev
};
