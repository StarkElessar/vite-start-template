export class FilteredTabs {
	private readonly _targetAttribute = 'data-filtered-tabs';
	private readonly _cardDataAttribute = 'data-card-id';
	private readonly _component = 'component';
	private readonly _actions = 'actions';
	private readonly _content = 'content';
	private readonly _defaultActiveId = 'ready';
	private readonly _buttonActiveClass = 'button_secondary';
	private readonly _buttonInActiveClass = 'button_smoke';
	private readonly _cardHiddenClass = 'hidden';

	constructor() {
		const allComponentsOnPage = document.querySelectorAll(`[${this._targetAttribute}=${this._component}]`);

		for (const component of allComponentsOnPage) {
			const actions = component.querySelector<HTMLElement>(`[${this._targetAttribute}=${this._actions}]`);
			const content = component.querySelector<HTMLElement>(`[${this._targetAttribute}=${this._content}]`);

			if (actions && content) {
				const cards = content.querySelectorAll<HTMLElement>(`[${this._cardDataAttribute}]`);

				actions.setAttribute('role', 'tablist');
				actions.addEventListener('click', (event) => this.actionsClickHandle(event, actions, cards));

				content.setAttribute('role', 'tabpanel');

				this.actionsButtonInit(actions.querySelectorAll('button'));
				this.itemsInit(cards);
			}
		}
	}

	private actionsClickHandle(event: MouseEvent, actions: HTMLElement, cards: NodeListOf<HTMLElement>) {
		const target = event.target as HTMLElement;

		if (target.closest('button') && target.getAttribute('aria-selected') !== 'true') {
			const oldSelected = actions.querySelector<HTMLButtonElement>('[aria-selected=true]')!;

			oldSelected.classList.remove(this._buttonActiveClass);
			oldSelected.classList.add(this._buttonInActiveClass);
			oldSelected.setAttribute('aria-selected', 'false');

			target.classList.add(this._buttonActiveClass);
			target.classList.remove(this._buttonInActiveClass);
			target.setAttribute('aria-selected', 'true');

			cards.forEach((card) => card.classList.toggle(this._cardHiddenClass, card.dataset.cardId !== target.id));
		}
	}

	private actionsButtonInit(buttons: NodeListOf<HTMLButtonElement>) {
		buttons.forEach((btn) => {
			btn.setAttribute('role', 'tab');
			btn.setAttribute('aria-selected', btn.id === this._defaultActiveId ? 'true' : 'false');
			btn.classList.toggle(this._buttonActiveClass, btn.id === this._defaultActiveId);
			btn.classList.toggle(this._buttonInActiveClass, btn.id !== this._defaultActiveId);
		});
	}

	private itemsInit(cards: NodeListOf<HTMLElement>) {
		cards.forEach((card) => {
			const current = card.dataset.cardId ?? '';
			card.setAttribute('aria-labelledby', current);

			if (current !== this._defaultActiveId) {
				card.classList.add(this._cardHiddenClass);
			}
		});
	}
}
