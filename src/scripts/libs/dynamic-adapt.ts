type AdaptiveType = 'min' | 'max';

type PlaceType = 'first' | 'last';

// Example: ['(max-width: 768px)', 768]
type MediaQueriesTuple = [string, number];

type DOMElementObject = {
	element: HTMLElement;
	parent: ParentNode | null;
	breakpoint: number;
	destination: HTMLElement | null;
	place: PlaceType;
	index: number;
}

export class DynamicAdaptive {
	private readonly _type: AdaptiveType;
	private readonly _nodes: HTMLElement[];
	private readonly _targetAttribute = 'data-da';
	private _daClassname = '_dynamic_adapt_';
	private _objects: DOMElementObject[] = new Array();
	private _mediaQueries?: MediaQueriesTuple[];

	constructor(type: AdaptiveType) {
		this._type = type;
		// массив DOM-элементов
		this._nodes = [...document.querySelectorAll<HTMLElement>(`[${this._targetAttribute}]`)];

		this.init();
	}

	private init() {
		// наполнение _objects объектами
		this._nodes.forEach((node) => {
			const data = node.dataset.da?.trim();

			if (data) {
				const optionsFrom = data.split(/\s*,\s*/);
				const destinationId = optionsFrom[0];
				const breakpoint = optionsFrom[1] ?? '767';
				const place = (optionsFrom[2] ?? 'last') as PlaceType;

				this._objects.push({
					element: node,
					parent: node.parentNode,
					destination: document.getElementById(`${destinationId}`),
					breakpoint: Number(breakpoint),
					place,
					index: this.indexInParent(node.parentNode, node)
				});
			}
		});

		this.arraySort(this._objects);

		this._mediaQueries = this._objects
		                         .map(({ breakpoint }): MediaQueriesTuple => [`(${this._type}-width: ${breakpoint}px)`, breakpoint])
		                         .filter((item, index, self) => self.indexOf(item) === index);
		// массив уникальных медиа-запросов
		// this._mediaQueries = Array.from(new Set(allMediaQueries))

		// навешивание слушателя на медиа-запрос
		// и вызов обработчика при первом запуске
		this._mediaQueries.forEach(([media, mediaBreakpoint]) => {
			const matchMedia = window.matchMedia(media);

			// массив объектов с подходящим брейкпоинтом
			const objectsFilter = this._objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint);

			matchMedia.addEventListener('change', this.mediaHandler.bind(this, matchMedia, objectsFilter));
			this.mediaHandler(matchMedia, objectsFilter);
		});
	}

	// Основная функция
	private mediaHandler(matchMedia: MediaQueryList, objects: DOMElementObject[]) {
		if (matchMedia.matches) {
			objects.forEach((object) => {
				// object.index = this.indexInParent(object.parent, object.element);
				this.moveTo(object.place, object.element, object.destination);
			});
		} else {
			objects.forEach(({ parent, element, index }) => {
				if (element.classList.contains(this._daClassname)) {
					this.moveBack(parent, element, index);
				}
			});
		}
	}

	// Функция перемещения
	private moveTo(place: PlaceType, element: HTMLElement, destination: HTMLElement | null) {
		if (destination) {
			element.classList.add(this._daClassname);

			if (place === 'last') {
				destination.append(element);
				return;
			}
			if (place === 'first') {
				destination.prepend(element);
				return;
			}
			destination.children[place].before(element);
		}
	}

	// Функция возврата элемента на своё место
	private moveBack(parent: ParentNode | null, element: HTMLElement, index: number) {
		if (parent) {
			element.classList.remove(this._daClassname);

			if (parent.children[index]) {
				parent.children[index].before(element)
			}
			else {
				parent.append(element)
			}
		}
	}

	// Функция для получения индекса внутри родителя
	private indexInParent(parent: ParentNode | null, element: HTMLElement) {
		return parent ? [...parent.children].indexOf(element) : 0;
	}

	// Функция сортировки массива пo breakpoint и place
	// пo возрастанию для this._type = min
	// пo убыванию для this._type = max
	private arraySort(arr: DOMElementObject[]) {
		if (this._type === 'min') {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return -1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return 1;
					}
					return 0;
				}
				return a.breakpoint - b.breakpoint;
			});
		}
		else {
			arr.sort((a, b) => {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}
					if (a.place === 'first' || b.place === 'last') {
						return 1;
					}
					if (a.place === 'last' || b.place === 'first') {
						return -1;
					}
					return 0;
				}
				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	}
}
