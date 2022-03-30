const production = !process.env.ROLLUP_WATCH;
module.exports = {
  theme: {
    fontSize: {
      '69xl': '20rem',
      '10xl': '10rem',
      '5xl': '5rem',
      '2xl': '2.5rem',
      '1x': '18px',
      '2x': '24px'
    },
    fontFamily: {
      logo: "logo"
    },
    screens: {
      'xl': { 'min': '1401px' },
      // => @media (max-width: 1279px)

      'lg': { 'min':'1200px', 'max': '1400px' },
      // => @media (max-width: 1023px)

      'md': { 'max': '1200px' },
      // => @media (max-width: 767px)

      'sm': { 'max': '700px' },
      // => @media (max-width: 639px)

    },
    minWidth: {
      'mac': '80px'
    },
    extend: {
      animation: {
        'bouncey': 'bounce 3s ease infinite',
        'bouncer': 'bounce 2s ease infinite',
        'scrolling': 'scrolling 5s linear infinite'
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
      },
      height: {
        'xl': '700px',
        'xl-jr': '620px',
        'll': '550px',
        'rr': '500px'
      },
      width: {
        'xl': '1100px',
        'rr': '800px',
        'df': '600px',
        '70': '17rem',
        'box': '250px'
      },
     cursor: {
       'emoji': 'url(../public/pencil.png), pencil'
     },
     margin: {
       'picturethis': '360px',
       'picturethistwo': '230px'
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
  daisyui: {
    themes: ["dracula", "emerald"]
  },
  content: ['./src/App.svelte', './src/pages/*', './src/components/*'],
  enabled: production, // disable purge in dev
};
