// Central theme palette for Math4All modernization
import designTokens from './designTokens.json' assert { type: 'json' };

export const theme = {
  primary: designTokens.colors.primary,
  secondary: designTokens.colors.secondary,
  accent: designTokens.colors.accent,
  light: designTokens.colors.light,
  dark: designTokens.colors.dark
};

export const semantic = {
  success: '#1CA37B',
  warning: '#C7A7F5',
  danger: '#FF4D4F'
};

// Helper to attach CSS variables dynamically if ever needed
export function injectThemeVariables(root = document.documentElement) {
  Object.entries(theme).forEach(([k,v]) => root.style.setProperty(`--m4a-${k}`, v));
}