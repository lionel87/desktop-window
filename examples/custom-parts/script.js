const btn = document.querySelector('.menu-btn');
const menu = btn.querySelector('.menu');

btn.addEventListener('click', (e) => {
	e.stopPropagation();
	menu.classList.toggle('show');
});
btn.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		btn.click();
	}
});
document.addEventListener('click', () => {
	menu.classList.remove('show');
});

// ----

document.querySelector('.searchbar').addEventListener('pointerdown', (event) => {
	// disable window drag on the input
	event.stopPropagation();
});

// ----

document.querySelector('.help-btn').addEventListener('click', () => {
	alert('Wanna some help? There is none.');
});
document.querySelector('.help-btn').addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		btn.click();
	}
});
