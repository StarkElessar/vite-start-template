import { RangeSliderConfigure } from "@scripts/modules/range-slider-configure";
import { Accordion } from "@scripts/modules/accordion";
import { integrationSwiperInit, moduleAdvantagesSwiperInit } from "./modules/swiper-sliders-init";

document.addEventListener("DOMContentLoaded", () => {
	moduleAdvantagesSwiperInit();
	integrationSwiperInit();

	new Accordion(".accordion");

	new RangeSliderConfigure("slider-hour-records");
});
