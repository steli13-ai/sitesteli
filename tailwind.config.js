/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Safelist dynamic classes built at runtime (e.g., bg-${color}) so Tailwind
  // doesn't purge them. These are used in homepage cards and course badges.
  safelist: [
    // solids
    'bg-primary','bg-secondary','bg-warning','bg-success','bg-error',
    'text-primary','text-secondary','text-warning','text-success','text-error',
    'border-primary','border-secondary','border-warning','border-success','border-error',
    // hover/variants used
    'bg-primary/90','bg-secondary/90','bg-warning/90','bg-success/90','bg-error/90',
    'border-primary/20','border-secondary/20','border-warning/20','border-success/20','border-error/20',
    // gradients from/to
    'from-primary/10','to-primary/5',
    'from-secondary/10','to-secondary/5',
    'from-warning/10','to-warning/5',
    'from-success/10','to-success/5',
    'from-error/10','to-error/5',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* light-cream */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* purple-primary */
        background: "var(--color-background)", /* warm-cream */
        foreground: "var(--color-foreground)", /* dark-gray */
        primary: {
          DEFAULT: "var(--color-primary)", /* purple-primary */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* coral-secondary */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* coral-error */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* light-cream */
          foreground: "var(--color-muted-foreground)", /* medium-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* green-accent */
          foreground: "var(--color-accent-foreground)", /* dark-gray */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* dark-gray */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* dark-gray */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-success */
          foreground: "var(--color-success-foreground)", /* dark-gray */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* yellow-warning */
          foreground: "var(--color-warning-foreground)", /* dark-gray */
        },
        error: {
          DEFAULT: "var(--color-error)", /* coral-error */
          foreground: "var(--color-error-foreground)", /* white */
        },
        surface: "var(--color-surface)", /* light-cream */
        "text-primary": "var(--color-text-primary)", /* dark-gray */
        "text-secondary": "var(--color-text-secondary)", /* medium-gray */
        trust: {
          DEFAULT: "var(--color-trust)", /* blue-trust */
          foreground: "var(--color-trust-foreground)", /* dark-gray */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        headline: ['Baloo 2', 'cursive'],
        body: ['Inter', 'sans-serif'],
        cta: ['Rubik', 'sans-serif'],
        accent: ['Public Sans', 'sans-serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4.5vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 5vw, 2.25rem)',
        'fluid-4xl': 'clamp(2.25rem, 6vw, 2.875rem)',
        'fluid-5xl': 'clamp(2.875rem, 7vw, 3.5rem)',
        'fluid-hero': 'clamp(1.2rem, 4vw, 2.8rem)',
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(115, 80, 255, 0.08)',
        'warm-lg': '0 8px 32px rgba(115, 80, 255, 0.15)',
        'academic': '0 2px 8px rgba(115, 80, 255, 0.1)',
      },
      animation: {
        'math-float': 'mathFloat 15s linear infinite',
        'math-float-slow': 'mathFloat 23s linear infinite',
        'math-float-slower': 'mathFloat 31s linear infinite',
        'celebration-bounce': 'celebrationBounce 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        mathFloat: {
          '0%': {
            transform: 'rotate(0deg) translateY(0px)',
            opacity: '0.3',
          },
          '50%': {
            opacity: '0.1',
          },
          '100%': {
            transform: 'rotate(360deg) translateY(-10px)',
            opacity: '0.3',
          },
        },
        celebrationBounce: {
          '0%, 20%, 53%, 80%, 100%': {
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            transform: 'translate3d(0, -8px, 0)',
          },
          '70%': {
            transform: 'translate3d(0, -4px, 0)',
          },
          '90%': {
            transform: 'translate3d(0, -2px, 0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}