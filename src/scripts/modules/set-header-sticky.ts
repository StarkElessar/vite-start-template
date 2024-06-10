export const setHeaderSticky = () => {
	const header = document.getElementById('header');
	const targetElement = document.getElementById('trigger-for-header');

	if (header && targetElement) {
		const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
			document.documentElement.classList.toggle('header-reverse', !entry.isIntersecting);
		};

		new IntersectionObserver(handleIntersection, { threshold: 0.35 }).observe(targetElement);
	}
};
