import IMask, { type InputMask } from 'imask';
import 'imask/masked/number';

export class InputMaskConfigure {
	private readonly _instance?: InputMask;

	constructor(element: HTMLInputElement | null) {
		if (element) {
			this._instance = IMask(element, {
				mask: element.dataset.mask,
				lazy: false
			});

			if (element.name === 'phone') {
				this._instance.unmaskedValue = '+7 (';
			}
		}
	}

	get instance() {
		return this._instance;
	}
}
