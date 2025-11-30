export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          600: '#4338ca'
        },
        accent: '#06b6d4',
        background: '#f8fafc',
        surface: '#ffffff',
        muted: '#6b7280'
      }
    },
  },
  plugins: [],
}
