/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#6366f1", // Indigo 500
                    dark: "#4f46e5",    // Indigo 600
                },
                secondary: "#10b981",
                dark: {
                    DEFAULT: "#0f172a", // Slate 900
                    lighter: "#1e293b", // Slate 800
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Outfit", "sans-serif"],
            },
        },
    },
    plugins: [],
}
