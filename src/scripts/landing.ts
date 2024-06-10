import { FilteredTabs } from '@scripts/libs/filtered-tabs';
import { setHeaderSticky } from '@scripts/modules/set-header-sticky';
import { RangeSliderConfigure } from '@scripts/modules/range-slider-configure';

document.addEventListener('DOMContentLoaded', () => {
	setHeaderSticky();
	new FilteredTabs();

	new RangeSliderConfigure('slider-hours');
	new RangeSliderConfigure('slider-staff-time');
});
