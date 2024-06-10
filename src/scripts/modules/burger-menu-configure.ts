import { ToggleScrollLockType } from '@scripts/type/toggle-scroll-lock.type.ts';

export class BurgerMenuConfigure {
	private readonly _toggleScrollLock: ToggleScrollLockType;

	constructor(toggleScrollLock: ToggleScrollLockType) {
		this._toggleScrollLock = toggleScrollLock;
		const html = document.documentElement;
		const burgerButton = document.getElementById('burger-button');

		if (burgerButton) {
			document.addEventListener('click', (event) => {
				const target = event.target as HTMLElement;

				if (target === burgerButton) {
					html.classList.toggle('burger-menu-open');
					this._toggleScrollLock(html.classList.contains('burger-menu-open'))
				}

				else if (target.id === 'header') {
					html.classList.remove('burger-menu-open');
					this._toggleScrollLock(false);
				}
			});
		}
	}
}
