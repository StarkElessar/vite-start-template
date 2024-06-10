import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export const moduleAdvantagesSwiperInit = () => {
	const swiperContainer = document.getElementById('module-advantages-swiper');

	if (swiperContainer) {
		new Swiper(swiperContainer, {
			modules: [Navigation],
			grabCursor: true,
			spaceBetween: 20,
			speed: 1000,
			navigation: {
				prevEl: '#advantages-prev',
				nextEl: '#advantages-next',
			},
			breakpoints: {
				375: {
					slidesPerView: 1,
				},
				640: {
					slidesPerView: 1.3,
				},
				960: {
					slidesPerView: 2,
				},
			},
		});
	}
};
