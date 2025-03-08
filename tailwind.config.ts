
import type { Config } from "tailwindcss";

export default {
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				playfair: ['Playfair Display', 'serif']
			},
			colors: {
				ice: {
					50: '#fff2e6',
					100: '#ffe0cc',
					200: '#ffc299',
					300: '#ffa366',
					400: '#ff8533',
					500: '#e55400',
					600: '#cc4a00',
					700: '#993800',
					800: '#662500',
					900: '#331300',
					950: '#1a0a00',
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
