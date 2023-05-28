/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
	],
	daisyui: {
		themes: [
			{
				irecycle: {
					"primary": "#3b82f6",
					"secondary": "#06b6d4",
					"accent": "#0ea5e9",
					"neutral": "#737373",
					"base-100": "#FFFFFF",
					"info": "#0ea5e9",
					"success": "#10b981",
					"warning": "#f59e0b",
					"error": "#f43f5e",
				},
			},
		],
	},
	plugins: [require("daisyui")],
}
