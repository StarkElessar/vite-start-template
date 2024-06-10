type Options = {
	shouldOpenAll: boolean;
	defaultOpen: number[];
	collapsedClass: string
}

export class Accordion {
	private readonly _accordionHeaderClass = 'accordion__header';
	private readonly _accordionItemClass = 'accordion__item';
	private readonly _accordionSelector: string;
	private _options: Options;
	private _accordions: NodeListOf<HTMLElement>;

	constructor(selector: string, options = {} as Partial<Options>) {
		const defaultConfig = {
			shouldOpenAll: false,
			defaultOpen: [],
			collapsedClass: 'open',
		};

		this._options = Object.assign(defaultConfig, options);
		this._accordionSelector = selector;
		this._accordions = document.querySelectorAll(this._accordionSelector);

		this.init();
	}

	private init() {
		document.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			const header = target.closest(`.${this._accordionHeaderClass}`);

			if (header) {
				const item = header.parentNode as HTMLElement;
				const accordion = item.closest(this._accordionSelector) as HTMLElement;
				const accordionItems = accordion.querySelectorAll<HTMLElement>(`.${this._accordionItemClass}`);

				this.toggle(item);

				if (this.isCollapsed(item) && !this._options.shouldOpenAll) {
					this.closeOthers(item, accordionItems);
				}
			}
		});

		this._accordions.forEach((accordion) => {
			const accordionItems = accordion.querySelectorAll<HTMLElement>(`.${this._accordionItemClass}`);

			accordionItems.forEach((item, index) => {
				if (this._options.defaultOpen.includes(index)) {
					this.open(item);
				} else {
					this.close(item);
				}
			});
		});
	}

	private toggle(element: HTMLElement) {
		element.classList.toggle(this._options.collapsedClass);
	}

	private open(element: HTMLElement) {
		element.classList.add(this._options.collapsedClass);
	}

	private close(element: HTMLElement) {
		element.classList.remove(this._options.collapsedClass);
	}

	private closeOthers(currentItem: HTMLElement, items: NodeListOf<HTMLElement>) {
		for (const item of items) {
			if (item !== currentItem && this.isCollapsed(item)) {
				this.close(item);
			}
		}
	}

	private isCollapsed(item: HTMLElement) {
		return item.classList.contains(this._options.collapsedClass);
	}
}
