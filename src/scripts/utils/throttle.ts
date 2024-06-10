export type ThrottledFuncType = (...args: unknown[]) => unknown | void;

export const throttle = <F extends ThrottledFuncType>(throttledFn: F, delayTime: number = 300) => {
	let lastCallTime = 0;

	return (...args: Parameters<F>) => {
		const currentCallTime = new Date().getTime();
		if (currentCallTime - lastCallTime < delayTime) return;
		lastCallTime = currentCallTime;
		throttledFn(...args);
	};
};
