const production = !process.env.ROLLUP_WATCH;
module.exports = {
  theme: {
    fontSize: {
      '69xl': '20rem',
      '10xl': '10rem',
      '5xl': '5rem',
      '2xl': '2.5rem'
    },
    fontFamily: {
      logo: "logo"
    },
    extend: {
      animation: {
        'bouncey': 'bounce 3s ease infinite',
        'bouncer': 'bounce 2s ease infinite',
        'scrolling': 'scrolling 5s linear 1'
      },
      boxShadow: {
        '69xl': '6px 10px 0px rgba(0, 0, 0, 1)'
      },
      keyframes: {
        scrolling: {
          '0%': {
            transform: 'translate3d(0, 0, 0)'
          },
          '100%': {
            transform: 'translate3d(-1000px, 0, 0)'
          }
        }
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
