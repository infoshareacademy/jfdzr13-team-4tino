/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/components/Preloader/*.{js,jsx}",
"./node_modules/tw-elements-react/dist/js/**/*.js"
],
theme: {
extend: {},
},
plugins: [require("tw-elements-react/dist/plugin.cjs")]
}