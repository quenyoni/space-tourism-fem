import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: '35em',
        md: '48em',
        lg:'62em',
        xl:'75em'
        
        
      }
  ,
      colors: {
        dark: '#0B0D17',
        pastelBlue: '#D0D6F9',
        navBackdrop:"hsl(0 0% 100%/ 0.04)"
        
      },
      // backgroundImage:"/assets/home/bg-h-3.jpg",
      fontFamily: {
        
         "bellefair": ["bellefair", "serif"],
        "barlow": ["barlow", "serif"],
        // "barlow":'/assets/BarlowCondensed-Regular.tff'
     
      },
    },
  },
  plugins: [],
} satisfies Config;
