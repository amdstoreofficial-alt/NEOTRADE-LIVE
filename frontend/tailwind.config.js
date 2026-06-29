/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // NEOTRADE Next-Gen Gradient Theme
        app: '#080816',
        panel: '#0F0F1F',
        elevated: '#17172B',

        // Brand — Violet (center of Cyan→Violet→Pink gradient)
        brand: {
          DEFAULT: '#8B5CF6',
          hover: '#A78BFA',
          dark: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.35)'
        },

        // Trading Colors (functional — DO NOT change)
        buy: {
          DEFAULT: '#00BFA5',
          hover: '#4CAF50',
          glow: 'rgba(0, 191, 165, 0.2)'
        },
        sell: {
          DEFAULT: '#E53935',
          hover: '#F44336',
          glow: 'rgba(229, 57, 53, 0.2)'
        },

        // Gradient palette accents
        space: {
          DEFAULT: '#080816',
          light: '#0F0F1F',
          dark: '#050510'
        },
        electric: {
          DEFAULT: '#22D3EE', // Cyan — gradient start
          dark: '#0891B2',
          light: '#67E8F9'
        },
        neon: {
          DEFAULT: '#00BFA5', // Success — green
          dark: '#00897B',
          light: '#4CAF50'
        },
        vibrant: {
          DEFAULT: '#EC4899', // Pink/Magenta — gradient end (used for decorative accents & errors in specific places)
          dark: '#DB2777',
          light: '#F472B6'
        },
        amber: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fbbf24'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        body: ['IBM Plex Sans', 'Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 50%, #EC4899 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(139,92,246,0.15) 50%, rgba(236,72,153,0.15) 100%)',
        'hero-radial': 'radial-gradient(ellipse at top, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse at bottom, rgba(236,72,153,0.12), transparent 60%)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'spin-slow': 'spin 60s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)' }
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(236, 72, 153, 0.45)' }
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
}
