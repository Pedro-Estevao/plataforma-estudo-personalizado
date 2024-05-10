/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: true,
	compress: true,
	compiler: {
		removeConsole: true,
	},
};

export default nextConfig;
