/**
 * Scroll-triggered animation helper using IntersectionObserver.
 * Adds `.visible` class to elements when they enter the viewport,
 * triggering CSS fade-in / slide-up animations.
 */
export function initScrollAnimations(options?: { threshold?: number; rootMargin?: string }) {
	const threshold = options?.threshold ?? 0.1;
	const rootMargin = options?.rootMargin ?? '0px 0px -50px 0px';

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold, rootMargin });

	document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
		// Add stagger delay via inline style
		const delay = (i % 6) * 80;
		(el as HTMLElement).style.setProperty('--stagger-delay', `${delay}ms`);
		observer.observe(el);
	});
}
