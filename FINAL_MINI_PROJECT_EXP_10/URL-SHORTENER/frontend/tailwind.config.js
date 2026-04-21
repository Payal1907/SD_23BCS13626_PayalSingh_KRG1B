/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This ensures your App.jsx is scanned
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
}