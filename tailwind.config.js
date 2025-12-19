// Add this to your tailwind.config.js file

module.exports = {
  theme: {
    extend: {
      animation: {
        'drive': 'drive 3s ease-in-out infinite',
        'scroll': 'scroll 2s linear infinite',
        'fade-out': 'fade-out 1.5s ease-out infinite',
        'progress': 'progress 2s ease-in-out infinite',
      },
      keyframes: {
        drive: {
          '0%': { 
            left: '110%',
            transform: 'translateY(-50%)'
          },
          '100%': { 
            left: '-20%',
            transform: 'translateY(-50%)'
          },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-out': {
          '0%': { 
            opacity: '0.5',
            left: '0'
          },
          '100%': { 
            opacity: '0',
            left: '20%'
          },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
}