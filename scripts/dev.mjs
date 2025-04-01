import { execSync } from 'node:child_process';
import { watch } from 'chokidar';
import browserSync from 'browser-sync';

let bs = null;
let debounceChangesTimeout = null;
watch(['src'], { ignoreInitial: false })
	.addListener('all', () => {
		if (debounceChangesTimeout) clearTimeout(debounceChangesTimeout);
		debounceChangesTimeout = setTimeout(() => {
			try {
				execSync(`node ${import.meta.dirname}/build.mjs`, { stdio: 'inherit' });
				if (!bs) bs = startBrowserSync();
			} catch (error) {
				console.error(error);
				console.error('Build failed.');
			}
		}, 250);
	});

function startBrowserSync() {
	const bs = browserSync.create();
	bs.init({
		port: 80, // --port 80
		watch: true, // --watch
		server: {
			baseDir: '.',
			index: 'index.html',
			serveStaticOptions: {
				extensions: ['html'], // --extensions=html
			},
		},
		reloadDebounce: 600, // --reload-debounce=600
		notify: false, // --no-notify
		ghostMode: false, // --ghost-mode=false
		startPath: 'examples/index.html',
	}, () => {
		console.log('BrowserSync started!');
	});
	return bs;
}
