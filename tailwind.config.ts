
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
				border: "hsl(var(--border))",
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
				guardian: {
					400: '#4299e1',
					600: '#2b6cb0'
				}
			},
			boxShadow: {
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
				'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.05)',
				'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.10)',
				'device': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
