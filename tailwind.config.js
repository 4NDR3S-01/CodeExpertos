module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // azul moderno
        secondary: '#171717',
        accent: '#38bdf8', // celeste
        background: '#ffffff',
        foreground: '#171717',
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'Inter',
          'Montserrat',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}; 