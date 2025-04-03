import fs, { rmSync } from 'node:fs';
import esbuild from 'esbuild';
import { execSync } from 'node:child_process';
import { minify as htmlMinify } from 'html-minifier-terser';

try {
	// preprocess HTML
	const htmlRaw = fs.readFileSync('src/desktop-window.html', 'utf-8');
	const htmlMinified = await htmlMinify(htmlRaw, {
		collapseWhitespace: true,
	});
	fs.writeFileSync('src/desktop-window.generated.html.txt', htmlMinified);

	// preprocess CSS
	await esbuild.build({
		logLevel: 'info',
		entryPoints: ['src/desktop-window.css'],
		bundle: true,
		minify: true,
		outfile: 'src/desktop-window.generated.css.txt',
		sourcemap: false,
		loader: {
			'.svg': 'dataurl',
		},
	});

	// create the ESM bundle
	execSync('tsc', { stdio: 'inherit' });
	fs.copyFileSync('desktop-window.d.mts', 'desktop-window.d.cts');
	await esbuild.build({
		logLevel: 'info',
		entryPoints: ['src/desktop-window.mts'],
		bundle: true,
		format: 'esm',
		minify: false,
		outfile: './desktop-window.mjs',
		sourcemap: false,
	});

	// create the CJS bundle
	await esbuild.build({
		logLevel: 'info',
		entryPoints: ['src/desktop-window.mts'],
		bundle: true,
		format: 'cjs',
		minify: false,
		outfile: './desktop-window.cjs',
		sourcemap: false,
	});

	// create the iife bundle (NO autoload)
	await esbuild.build({
		logLevel: 'info',
		entryPoints: ['src/desktop-window.mts'],
		bundle: true,
		globalName: 'DESKTOP_WINDOW',
		format: 'iife',
		minify: true,
		outfile: './desktop-window.js',
		sourcemap: false,
	});

	// create the iife bundle (WITH autoload)
	await esbuild.build({
		logLevel: 'info',
		entryPoints: ['src/desktop-window.mts'],
		bundle: true,
		globalName: 'DESKTOP_WINDOW',
		footer: {
			js: 'DESKTOP_WINDOW.register();',
		},
		format: 'iife',
		minify: true,
		outfile: './desktop-window.autoload.js',
		sourcemap: false,
	});

} finally {
	rmSync('src/desktop-window.generated.css.txt', { force: true });
	rmSync('src/desktop-window.generated.html.txt', { force: true });
}
