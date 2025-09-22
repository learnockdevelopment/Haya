/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/lib/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors (from palette 1)
        primary: colors.primary,
        
        // Secondary brand colors (from palette 1)
        secondary: colors.secondary,
        
        // Warning colors (from palette 1)
        warning: colors.warning,
        
        // Text colors (from palette 1)
        text: colors.text,
        
        // Additional colors from palette 2
        'main-text': colors.mainText,
        'light-text': colors.lightText,
        background: colors.background,
        buttons: colors.buttons,
        attention: colors.attention,
        
        // Status colors
        success: colors.success,
        error: colors.error,
        info: colors.info,
        
        // Neutral colors
        neutral: colors.neutral,
        
        // Special colors
        gold: colors.special.gold,
        purple: colors.special.purple,
        teal: colors.special.teal,
        
        // Semantic colors
        semantic: colors.semantic,
        
        // Status colors
        status: colors.status,
        
        // Overlay colors
        overlay: colors.overlay,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'Marck-Script': ['"Marck Script"', 'cursive'],
        arabic: ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
                marck: ["var(--font-marck-script)", "cursive"],
                        manrope: ["var(--font-manrope)", "sans-serif"],


      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};