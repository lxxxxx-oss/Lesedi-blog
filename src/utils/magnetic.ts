/**
 * Magnetic buttons — interactive elements subtly follow the cursor within a radius.
 */
export function initMagneticButtons() {
	const isTouch = window.matchMedia('(pointer: coarse)').matches;
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (isTouch || prefersReducedMotion) return;

	const selector = 'a.hero-links a, button.cat-filter-btn, button.sub-tag-btn, nav a, .hero-cta';
	const strength = 0.3;
	const radius = 80;

	document.querySelectorAll(selector).forEach((el) => {
		const element = el as HTMLElement;
		let rafId = 0;
		let tx = 0, ty = 0, cx = 0, cy = 0;

		function reset() {
			tx = 0;
			ty = 0;
		}

		element.addEventListener('mousemove', (e) => {
			const rect = element.getBoundingClientRect();
			const mx = e.clientX - (rect.left + rect.width / 2);
			const my = e.clientY - (rect.top + rect.height / 2);
			const dist = Math.sqrt(mx * mx + my * my);
			tx = dist < radius ? mx * strength : 0;
			ty = dist < radius ? my * strength : 0;
		});

		function animate() {
			cx += (tx - cx) * 0.1;
			cy += (ty - cy) * 0.1;
			element.style.transform = `translate(${cx}px, ${cy}px)`;
			if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
				rafId = requestAnimationFrame(animate);
			}
		}

		element.addEventListener('mouseenter', () => {
			if (rafId) cancelAnimationFrame(rafId);
			animate();
		});

		element.addEventListener('mouseleave', () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			reset();
			cx = 0;
			cy = 0;
			element.style.transform = '';
		});
	});
}
