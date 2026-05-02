/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-deep':      '#0a0a0a',
        'black-secondary': '#121212',
        'black-card':      '#181818',
        'gray-elegant':    '#1f1f1f',
        'gray-border':     '#2a2a2a',
        'red-main':        '#ff1e1e',
        'red-hover':       '#cc0000',
        'red-light':       '#ff4444',
        'red-glow':        'rgba(255,30,30,0.3)',
        'white-text':      '#f5f5f5',
        'gray-text':       '#a0a0a0',
        'gray-dim':        '#666666',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'red-gradient':    'linear-gradient(135deg, #ff1e1e 0%, #cc0000 100%)',
        'dark-gradient':   'linear-gradient(135deg, #0a0a0a 0%, #121212 100%)',
        'hero-gradient':   'radial-gradient(ellipse at 20% 50%, rgba(255,30,30,0.12) 0%, transparent 60%)',
        'card-gradient':   'linear-gradient(145deg, rgba(31,31,31,0.9) 0%, rgba(18,18,18,0.95) 100%)',
        'red-glow-radial': 'radial-gradient(ellipse at center, rgba(255,30,30,0.2) 0%, transparent 70%)',
      },
      animation: {
        'pulse-red':  'pulseRed 2s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'glow-text':  'glowText 3s ease-in-out infinite',
        'slide-up':   'slideUp 0.6s ease-out',
        'fade-in':    'fadeIn 0.8s ease-out',
        'spin-slow':  'spin 8s linear infinite',
        'bounce-slow':'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255,30,30,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,30,30,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        glowText: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255,30,30,0.4)' },
          '50%':      { textShadow: '0 0 25px rgba(255,30,30,0.9), 0 0 50px rgba(255,30,30,0.4)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'red':       '0 0 20px rgba(255,30,30,0.25)',
        'red-lg':    '0 0 40px rgba(255,30,30,0.45)',
        'red-xl':    '0 0 60px rgba(255,30,30,0.6)',
        'card':      '0 8px 32px rgba(0,0,0,0.6)',
        'card-hover':'0 16px 48px rgba(255,30,30,0.15), 0 8px 32px rgba(0,0,0,0.8)',
        'inner-red': 'inset 0 0 20px rgba(255,30,30,0.1)',
        'button':    '0 4px 15px rgba(255,30,30,0.3)',
        'button-lg': '0 8px 30px rgba(255,30,30,0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl':  '1rem',
        '3xl':  '1.5rem',
      },
      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
