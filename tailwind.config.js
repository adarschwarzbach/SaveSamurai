/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				"bp-dark-blue": "#111418",
				"bp-light-gray1": "#1C2127",
				"bp-light-gray2": "#252A31",
				"bp-light-gray3": "#2F343C",
				"bp-light-gray4": "#383E47",
				"bp-light-gray5": "#404854",
				"bp-mid-gray1": "#5F6B7C",
				"bp-mid-gray2": "#738091",
				"bp-mid-gray3": "#8F99A8",
				"bp-soft-gray1": "#ABB3BF",
				"bp-soft-gray2": "#C5CBD3",
				"bp-soft-gray3": "#D3D8DE",
				"bp-soft-gray4": "#DCE0E5",
				"bp-soft-gray5": "#E5E8EB",
				"bp-softest-gray": "#EDEFF2",
				"bp-almost-white": "#F6F7F9",
				"bp-white": "#FFFFFF",
			},
			textColor: {
				"bp-dark-blue": "#111418",
				"bp-light-gray1": "#1C2127",
				"bp-light-gray2": "#252A31",
				// ... You can continue in the same pattern for the rest
			},
		},
	},
	plugins: [],
};
