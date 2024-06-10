export class PopupConfigure {
	private _html: HTMLElement;
	private _body: HTMLElement;
	openedPopup?: Element;

	constructor() {
		this._html = document.documentElement;
		this._body = document.body;

		this.eventInit();
	}

	private eventInit() {
		const onTransitionEndHandle = ({ target }: TransitionEvent) => {
			if (target === this.openedPopup) {
				this.toggleBodyLock(false);
				this._body.removeEventListener('transitionend', onTransitionEndHandle);
			}
		};

		document.addEventListener('click', (event) => {
			const target = event.target as HTMLElement;
			const button = target.closest('[data-popup-id]') as HTMLElement | null;

			if (button) {
				this.closePopup();
				this.openPopup(button.dataset.popupId!);
				this.toggleBodyLock(true);
			}

			else if (this.openedPopup && (target.hasAttribute('data-close-overlay') || target.closest('.btn-close'))) {
				this.closePopup();
				this._body.addEventListener('transitionend', onTransitionEndHandle);
			}
		});
	}

	private openPopup(id: string) {
		const popupElement = document.getElementById(id);

		if (popupElement) {
			popupElement.classList.add('open');
			this.openedPopup = popupElement;
		}
	}

	private closePopup() {
		this.openedPopup?.classList.remove('open');
		this._html.classList.remove('burger-menu-open');
	}

	public toggleBodyLock(isLock: boolean) {
		this._html.classList.toggle('lock', isLock);
	}
}
