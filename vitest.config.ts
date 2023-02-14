import { config } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

config({
	path: '.env.development',
	debug: true,
});

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		globals: true,
		watch: true,
		testTimeout: 100000,
		environment: 'node',
	},
});
