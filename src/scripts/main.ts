import LazyLoad from 'vanilla-lazyload';

import { DynamicAdaptive } from './libs/dynamic-adapt';
import { inputConfigure } from '@scripts/modules/input-configure';
import { PopupConfigure } from '@scripts/modules/popup-configure';
import { setScrollbarWidth } from '@scripts/modules/set-scrollbar-with';
import { BurgerMenuConfigure } from '@scripts/modules/burger-menu-configure';

document.addEventListener('DOMContentLoaded', () => {
	const popupConfigure = new PopupConfigure();

	setScrollbarWidth();
	new DynamicAdaptive('max');
	new LazyLoad();
	new BurgerMenuConfigure(popupConfigure.toggleBodyLock.bind(popupConfigure));
	inputConfigure();
});

window.onload = () => document.documentElement.classList.add('loaded');
