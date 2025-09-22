/**
 * Haya Design System - Color Palette
 * 
 * This file contains all the colors used in the Haya application.
 * Updated to match the provided color palette from design files.
 * 
 * Usage:
 * - Import specific colors: import { colors } from '@/lib/colors'
 * - Use in components: colors.primary[500]
 * - Use in Tailwind: className="bg-primary-500"
 */

export const colors = {
  // Primary Colors - Main brand colors (from palette 1)
  primary: {
    50: '#f2f8f2',
    100: '#e6f1e6',
    200: '#bfddc0',
    300: '#99c899',
    400: '#4d9f4d',
    500: '#09650A', // Base primary (from palette 1)
    600: '#085b09',
    700: '#074c08',
    800: '#053d06',
    900: '#043105',
    950: '#032104',
  },

  // Secondary Colors - Supporting brand colors (from palette 1)
  secondary: {
    50: '#fbf8eb',
    100: '#f7f1d7',
    200: '#eadca4',
    300: '#ddc771',
    400: '#c49e2a',
    500: '#77911E', // Base secondary (from palette 1)
    600: '#6b831b',
    700: '#596d17',
    800: '#475712',
    900: '#3a470f',
    950: '#2d380c',
  },

  // Warning Colors - Warning states (from palette 1)
  warning: {
    50: '#ffe5e5',
    100: '#ffcccc',
    200: '#ff9999',
    300: '#ff6666',
    400: '#ff3333',
    500: '#790000', // Base warning (from palette 1)
    600: '#6d0000',
    700: '#5a0000',
    800: '#480000',
    900: '#3b0000',
    950: '#2e0000',
  },

  // Text Colors - Text colors (from palette 1)
  text: {
    50: '#f5f4f4',
    100: '#ebe9e9',
    200: '#cec9c9',
    300: '#b0a8a8',
    400: '#756767',
    500: '#332323', // Base text (from palette 1)
    600: '#2e2020',
    700: '#261a1a',
    800: '#1e1515',
    900: '#191111',
    950: '#140d0d',
  },

  // Additional colors from palette 2
  mainText: '#333333',
  lightText: '#808080',
  background: '#FFFFFF',
  buttons: '#17973F',
  attention: '#F7921E',

  // Accent Colors - Highlight and call-to-action colors
  accent: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Success Colors - Success states and positive actions
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },

  // Error Colors - Error states and negative actions
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Info Colors - Information states
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Neutral Colors - Grays and base colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },

  // Special Colors - Unique brand colors
  special: {
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
  },

  // Semantic Colors - Context-specific colors
  semantic: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      dark: '#0f172a',
    },
    text: {
      primary: '#333333', // Using mainText from palette 2
      secondary: '#808080', // Using lightText from palette 2
      tertiary: '#94a3b8',
      inverse: '#ffffff',
      muted: '#cbd5e1',
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1',
      focus: '#3b82f6',
      error: '#ef4444',
    },
  },

  // Status Colors - UI state colors
  status: {
    online: '#22c55e',
    offline: '#94a3b8',
    away: '#f59e0b',
    busy: '#ef4444',
  },

  // Overlay Colors - For modals, overlays, etc.
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
} as const;

// Color utility functions
export const colorUtils = {
  withOpacity: (color: string, opacity: number) => {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  },

  getSemanticColor: (category: keyof typeof colors.semantic, variant: string) => {
    return colors.semantic[category][variant as keyof typeof colors.semantic[typeof category]];
  },

  getColor: (palette: keyof typeof colors, shade: string | number) => {
    const paletteColors = colors[palette] as Record<string, string>;
    return paletteColors[shade.toString()];
  },
};

// Export individual color palettes for convenience
export const {
  primary,
  secondary,
  accent,
  success,
  warning: warningColors,
  error,
  info,
  neutral,
  special,
  semantic,
  status,
  overlay,
} = colors;

// Default export
export default colors;