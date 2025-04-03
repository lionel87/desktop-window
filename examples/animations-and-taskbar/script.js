const lorem = `Sint amet reprehenderit nostrud commodo occaecat consequat nisi minim tempor elit proident. Aute nostrud sit sint ad adipisicing ad enim. Culpa esse proident duis excepteur excepteur.

Enim Lorem magna dolor sunt aute. Tempor voluptate magna eiusmod adipisicing. Proident excepteur nisi exercitation consectetur consequat velit officia. Ex consequat laborum velit enim laboris. Voluptate do laborum elit minim velit duis enim nisi Lorem. Veniam eu ipsum elit cillum ut.

Nostrud ipsum ipsum exercitation minim cupidatat mollit cupidatat eiusmod incididunt irure Lorem. Dolore sunt sint duis ex voluptate dolore sit est exercitation. Labore exercitation do labore anim cupidatat nulla dolor aute ea. Adipisicing veniam minim veniam minim excepteur irure do qui ullamco nostrud cillum. Elit et commodo consectetur ex. Veniam exercitation do minim officia amet. Dolor aliquip fugiat reprehenderit irure ea do eiusmod qui do ex ut magna.

Eiusmod mollit duis nisi dolore in ex in incididunt deserunt. Anim sit deserunt aliqua magna esse ex aliqua duis cupidatat commodo. Et nostrud amet elit sit laborum id. Commodo esse reprehenderit sint veniam qui quis labore voluptate eu. Excepteur aliquip consectetur exercitation labore adipisicing sunt aliquip exercitation.

Et anim aliqua culpa laborum mollit. Eiusmod veniam consequat exercitation dolor ea laborum do eu esse nisi occaecat. Aute incididunt sit minim quis proident Lorem occaecat commodo in. Dolore dolor et officia fugiat eu esse non ad sit ipsum excepteur ut. Cillum veniam proident sint ea. Ea ut commodo excepteur deserunt elit elit consequat cupidatat irure laboris aliqua minim labore.

Cupidatat consectetur duis laborum consectetur consequat tempor laboris. Lorem do amet officia in amet ad nulla cillum officia pariatur elit commodo. Officia sit quis occaecat anim eu laborum. Mollit magna veniam consequat et eu non pariatur elit pariatur laborum voluptate. Exercitation ut eu quis reprehenderit deserunt voluptate laboris Lorem reprehenderit laboris quis fugiat eu. Irure veniam excepteur nulla non ea deserunt id aliquip ullamco. Esse occaecat qui nostrud adipisicing amet labore tempor ipsum aute.
`;

let openIndex = 0;
document.querySelector('.open-window-shortcut').addEventListener('click', () => {
	const win = document.createElement('desktop-window');

	win.setAttribute('name', 'Text Editor - Test document.txt');
	win.setAttribute('movable', '');
	win.setAttribute('resizable', '');
	win.setAttribute('closable', '');
	win.setAttribute('minimizable', '');
	win.setAttribute('maximizable', '');
	win.setAttribute('autofocus', '');

	const idx = openIndex++;
	win.setAttribute('x', (idx % 10) * 40 + 100);
	win.setAttribute('y', (idx % 10) * 40 + 100);

	win.innerHTML = `<div id="wrap"><div id="editor" contenteditable autocorrect="off" autocapitalize="off" spellcheck="false">${lorem}</div></div>`;

	// we add animations class
	win.classList.add('animating');
	setTimeout(() => {
		win.classList.remove('animating');
	}, 300);

	document.querySelector('#desktop').append(win);
});

document.getElementById('animation-select').addEventListener('change', (event) => {
	document.querySelector('#desktop').className = event.target.value;
});

// to handle closing animation
document.querySelector('#desktop').addEventListener('closing', (event) => {
	event.preventDefault(); // prevents the window from actually closing
	event.target.classList.add('closing', 'animating');
	setTimeout(() => {
		event.target.destroy(); // forces closing without emitting 'closing'
	}, 300);
});

// to handle maximized to restored animation
// it should be done in a much sophisticated way, but oh well...
document.querySelector('#desktop').addEventListener('restoring', (event) => {
	if (event.target.maximized) {
		event.target.classList.add('restoring-from-maximized', 'animating');
	} else {
		event.target.classList.add('animating');
	}
	setTimeout(() => {
		event.target.classList.remove('animating');
	}, 300);
});
document.querySelector('#desktop').addEventListener('minimizing', (event) => {
	event.target.classList.add('animating');
	event.target.classList.remove('restoring-from-maximized');
	setTimeout(() => {
		event.target.classList.remove('animating');
	}, 300);
});
document.querySelector('#desktop').addEventListener('maximizing', (event) => {
	event.target.classList.add('animating');
	event.target.classList.remove('restoring-from-maximized');
	setTimeout(() => {
		event.target.classList.remove('animating');
	}, 300);
});

// this is a really neat way to handle taskbar buttons
const taskbar = document.getElementById('taskbar');
const desktop = document.getElementById('desktop');

const updateTaskbar = () => {
	taskbar.innerHTML = '';
	const windows = desktop.querySelectorAll('desktop-window');
	for (const win of windows) {
		const btn = document.createElement('button');
		btn.title = btn.textContent = win.getAttribute('name') || 'Unnamed window';
		btn.onclick = () => {
			if (win.minimized) {
				// TODO: accessing win.shadowRoot is not a good idea
				//       need to move the listeners to the host?
				win.shadowRoot.dispatchEvent(new Event('restore'));
			}
			win.focus();
			document.querySelector('#notice-me').style.display = 'none';
		};
		taskbar.appendChild(btn);
	}
}

const desktopMutations = new MutationObserver(updateTaskbar).observe(desktop, {
	childList: true,
	subtree: false,
	attributes: true,
	attributeFilter: ['name'],
});

updateTaskbar();
