module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {    
    screens: {
      'sm-mobile': '360px',

      'mobile': '512px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'semi-lg': '1152px',

      'xl': '1280px',

      '1.5xl': '1408px',

      '2xl': '1536px',

      '3xl': '1792px',
    },
    fontFamily: {
      'heading': ['GalanoGrotesqueBold'],
    },
    extend: {      
      colors: {
        red: '#C42729',
        lososPink: '#DD8C83',
        grey: '#E0DEDE',
        lightGrey: '#E9E9E9',
        darkGrey: '#4B4B4B',
        greyOp50: '#DFB5B0',
        green: '#1BB36C',
        oliveGreen: '#97CF9B',
        lightGreen: '#BDD796',
        darkGreen: '#A4CA7E'
      },
      height: {
        xl: '28rem'
      }
    },
  },
  variants: {
    extend: {},
  },
}
