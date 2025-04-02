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

	document.querySelector('#desktop').append(win);
});

document.getElementById('theme-select').addEventListener('change', (event) => {
	document.querySelector('#desktop').className = event.target.value;
});
