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
        // Primary brand colors
        primary: colors.primary,
        
        // Secondary brand colors
        secondary: colors.secondary,
        
        // Accent colors
        accent: colors.accent,
        
        // Status colors
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
        
        // Neutral colors
        neutral: colors.neutral,
        
        // Special colors
        gold: colors.special.gold,
        purple: colors.special.purple,
        teal: colors.special.teal,
        
        // Semantic colors
        background: colors.semantic.background,
        text: colors.semantic.text,
        border: colors.semantic.border,
        
        // Status colors
        status: colors.status,
        
        // Overlay colors
        overlay: colors.overlay,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
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
