import noUiSlider, { type API } from 'nouislider';
import wNumb from 'wnumb';

export class RangeSliderConfigure {
	private readonly _instance: API | null = null;

	constructor(elementId: string) {
		const slider = document.getElementById(elementId);
		const input = document.querySelector<HTMLInputElement>(`[data-input-for=${slider?.id}]`);

		if (slider && input) {
			this._instance = noUiSlider.create(slider, {
				start: [Number(slider.dataset.start)],
				behaviour: 'snap',
				connect: 'lower',
				format: wNumb({
					decimals: 0
				}),
				range: {
					'min': Number(slider.dataset.min),
					'max': Number(slider.dataset.max)
				}
			});

			this._instance.on('update', (values, handle) => {
				input.value = String(values[handle]);
			});

			input.onchange = (event) => {
				const target = event.target as HTMLInputElement;
				this._instance?.set(target.value);
			};
		}
	}

	get slider() {
		return this._instance;
	}
}
