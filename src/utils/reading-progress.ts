/**
 * Reading progress bar — fixed at top of viewport, width follows scroll position.
 */
export function initReadingProgress() {
	// Create progress bar element once
	let bar = document.getElementById('reading-progress-bar') as HTMLDivElement;
	if (bar) return; // already initialized

	bar = document.createElement('div');
	bar.id = 'reading-progress-bar';
	bar.setAttribute('role', 'progressbar');
	bar.setAttribute('aria-hidden', 'true');
	document.body.prepend(bar);

	function update() {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		bar.style.width = `${progress}%`;
	}

	// Use rAF-throttled scroll listener
	let ticking = false;
	window.addEventListener('scroll', () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				update();
				ticking = false;
			});
			ticking = true;
		}
	}, { passive: true });

	update();
}
