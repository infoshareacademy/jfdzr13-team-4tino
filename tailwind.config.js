/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/tw-elements-react/dist/js/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                'custom-green': '#42811e',
                'custom-green-hover': '#57ab27',
                'custom-green-active': '#57ab27',
                'icon-green': '#ddebce',
                'symbol-green': '#B8D698',
            },
            boxShadow: {
                'inset-custom': 'inset 0 0 0 2px #5da746',
            },
            keyframes: {
                'fly-in': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
            animation: {
                'fly-in': 'fly-in 0.5s ease-in-out',
            },
        },
    },
    safelist: ['animate-[fly-in_0.5s]'],
    plugins: [require("tw-elements-react/dist/plugin.cjs")],
};
