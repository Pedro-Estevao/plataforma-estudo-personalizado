import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/theme';

const config: Config = {
	darkMode: 'class',
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			boxShadow: {
				'navbar': '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0,0,0,0.05)',
				'navbar-dark': '0 0 #0000',
			},
			flex: {
				'um': '1 1 0%',
			},
		},
		screens: {
			xs: '375px',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			xxl: '1400px',
			'max-xs': { max: '374px' },
			'max-450': { max: '450px'},
			'max-sm': { max: '575px' },
			'max-md': { max: '767px' },
			'max-lg': { max: '991px' },
			'max-xl': { max: '1199px' },
			'max-xxl': { max: '1399px' }
		}
	},
	plugins: [nextui({
		addCommonColors: true
	})],
};

export default config;
