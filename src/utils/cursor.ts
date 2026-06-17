/**
 * Custom cursor — a circle that follows the mouse and expands on interactive elements.
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export function initCustomCursor() {
	// Skip on touch devices
	const isTouch = window.matchMedia('(pointer: coarse)').matches;
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (isTouch || prefersReducedMotion) return;

	// Create cursor element
	const cursor = document.createElement('div');
	cursor.id = 'custom-cursor';
	cursor.setAttribute('aria-hidden', 'true');
	document.body.appendChild(cursor);

	// Hover targets
	const hoverTargets = 'a, button, .note-card, input, textarea, [role="button"], [role="link"]';

	let mouseX = 0, mouseY = 0;
	let cursorX = 0, cursorY = 0;
	let isHovering = false;
	let hoverScale = 1;

	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	document.addEventListener('mouseover', (e) => {
		if (e.target.closest(hoverTargets)) {
			isHovering = true;
			cursor.classList.add('hovering');
		}
	});

	document.addEventListener('mouseout', (e) => {
		if (e.target.closest(hoverTargets)) {
			isHovering = false;
			cursor.classList.remove('hovering');
		}
	});

	function animate() {
		// Smooth follow with easing
		cursorX += (mouseX - cursorX) * 0.15;
		cursorY += (mouseY - cursorY) * 0.15;
		hoverScale += ((isHovering ? 2 : 1) - hoverScale) * 0.1;

		cursor.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0) scale(${hoverScale})`;
		requestAnimationFrame(animate);
	}
	animate();
}
