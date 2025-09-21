/**
 * Haya Design System - Color Palette
 * 
 * This file contains all the colors used in the Haya application.
 * Update these values to match your Figma design system.
 * 
 * Usage:
 * - Import specific colors: import { colors } from '@/lib/colors'
 * - Use in components: colors.primary[500]
 * - Use in Tailwind: className="bg-primary-500"
 */

export const colors = {
  // Primary Colors - Main brand colors
  primary: {
    50: '#eff6ff',   // Lightest primary
    100: '#dbeafe',  // Very light primary
    200: '#bfdbfe',  // Light primary
    300: '#93c5fd',  // Medium light primary
    400: '#60a5fa',  // Medium primary
    500: '#3b82f6',  // Base primary (main brand color)
    600: '#2563eb',  // Medium dark primary
    700: '#1d4ed8',  // Dark primary
    800: '#1e40af',  // Very dark primary
    900: '#1e3a8a',  // Darkest primary
    950: '#172554',  // Ultra dark primary
  },

  // Secondary Colors - Supporting brand colors
  secondary: {
    50: '#f8fafc',   // Lightest secondary
    100: '#f1f5f9',  // Very light secondary
    200: '#e2e8f0',  // Light secondary
    300: '#cbd5e1',  // Medium light secondary
    400: '#94a3b8',  // Medium secondary
    500: '#64748b',  // Base secondary
    600: '#475569',  // Medium dark secondary
    700: '#334155',  // Dark secondary
    800: '#1e293b',  // Very dark secondary
    900: '#0f172a',  // Darkest secondary
    950: '#020617',  // Ultra dark secondary
  },

  // Accent Colors - Highlight and call-to-action colors
  accent: {
    50: '#fef2f2',   // Lightest accent
    100: '#fee2e2',  // Very light accent
    200: '#fecaca',  // Light accent
    300: '#fca5a5',  // Medium light accent
    400: '#f87171',  // Medium accent
    500: '#ef4444',  // Base accent (main accent color)
    600: '#dc2626',  // Medium dark accent
    700: '#b91c1c',  // Dark accent
    800: '#991b1b',  // Very dark accent
    900: '#7f1d1d',  // Darkest accent
    950: '#450a0a',  // Ultra dark accent
  },

  // Success Colors - Success states and positive actions
  success: {
    50: '#f0fdf4',   // Lightest success
    100: '#dcfce7',  // Very light success
    200: '#bbf7d0',  // Light success
    300: '#86efac',  // Medium light success
    400: '#4ade80',  // Medium success
    500: '#22c55e',  // Base success
    600: '#16a34a',  // Medium dark success
    700: '#15803d',  // Dark success
    800: '#166534',  // Very dark success
    900: '#14532d',  // Darkest success
    950: '#052e16',  // Ultra dark success
  },

  // Warning Colors - Warning states and caution
  warning: {
    50: '#fffbeb',   // Lightest warning
    100: '#fef3c7',  // Very light warning
    200: '#fde68a',  // Light warning
    300: '#fcd34d',  // Medium light warning
    400: '#fbbf24',  // Medium warning
    500: '#f59e0b',  // Base warning
    600: '#d97706',  // Medium dark warning
    700: '#b45309',  // Dark warning
    800: '#92400e',  // Very dark warning
    900: '#78350f',  // Darkest warning
    950: '#451a03',  // Ultra dark warning
  },

  // Error Colors - Error states and negative actions
  error: {
    50: '#fef2f2',   // Lightest error
    100: '#fee2e2',  // Very light error
    200: '#fecaca',  // Light error
    300: '#fca5a5',  // Medium light error
    400: '#f87171',  // Medium error
    500: '#ef4444',  // Base error
    600: '#dc2626',  // Medium dark error
    700: '#b91c1c',  // Dark error
    800: '#991b1b',  // Very dark error
    900: '#7f1d1d',  // Darkest error
    950: '#450a0a',  // Ultra dark error
  },

  // Info Colors - Information states
  info: {
    50: '#eff6ff',   // Lightest info
    100: '#dbeafe',  // Very light info
    200: '#bfdbfe',  // Light info
    300: '#93c5fd',  // Medium light info
    400: '#60a5fa',  // Medium info
    500: '#3b82f6',  // Base info
    600: '#2563eb',  // Medium dark info
    700: '#1d4ed8',  // Dark info
    800: '#1e40af',  // Very dark info
    900: '#1e3a8a',  // Darkest info
    950: '#172554',  // Ultra dark info
  },

  // Neutral Colors - Grays and base colors
  neutral: {
    50: '#fafafa',   // Lightest neutral
    100: '#f5f5f5',  // Very light neutral
    200: '#e5e5e5',  // Light neutral
    300: '#d4d4d4',  // Medium light neutral
    400: '#a3a3a3',  // Medium neutral
    500: '#737373',  // Base neutral
    600: '#525252',  // Medium dark neutral
    700: '#404040',  // Dark neutral
    800: '#262626',  // Very dark neutral
    900: '#171717',  // Darkest neutral
    950: '#0a0a0a',  // Ultra dark neutral
  },

  // Special Colors - Unique brand colors
  special: {
    // Gold/Yellow for highlights
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
    // Purple for special elements
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
    // Teal for accents
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
      primary: '#ffffff',     // Main background
      secondary: '#f8fafc',   // Secondary background
      tertiary: '#f1f5f9',    // Tertiary background
      dark: '#0f172a',        // Dark background
    },
    text: {
      primary: '#0f172a',     // Main text
      secondary: '#64748b',   // Secondary text
      tertiary: '#94a3b8',    // Tertiary text
      inverse: '#ffffff',     // Inverse text (on dark)
      muted: '#cbd5e1',       // Muted text
    },
    border: {
      primary: '#e2e8f0',     // Main border
      secondary: '#cbd5e1',   // Secondary border
      focus: '#3b82f6',       // Focus border
      error: '#ef4444',       // Error border
    },
  },

  // Status Colors - UI state colors
  status: {
    online: '#22c55e',        // Online status
    offline: '#94a3b8',       // Offline status
    away: '#f59e0b',          // Away status
    busy: '#ef4444',          // Busy status
  },

  // Overlay Colors - For modals, overlays, etc.
  overlay: {
    light: 'rgba(0, 0, 0, 0.1)',    // Light overlay
    medium: 'rgba(0, 0, 0, 0.5)',   // Medium overlay
    dark: 'rgba(0, 0, 0, 0.8)',     // Dark overlay
  },
} as const;

// Color utility functions
export const colorUtils = {
  // Get color with opacity
  withOpacity: (color: string, opacity: number) => {
    return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  },

  // Get color from semantic name
  getSemanticColor: (category: keyof typeof colors.semantic, variant: string) => {
    return colors.semantic[category][variant as keyof typeof colors.semantic[typeof category]];
  },

  // Get color from palette
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
  warning,
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

