export function debounce(f: Function, wait: number, immediate?: boolean) {
	let timeout: NodeJS.Timeout | null;

	return function executedFunction() {
		// @ts-ignore
		const context = this;
		const args = arguments;

		const later = function() {
			timeout = null;
			if (!immediate) f.apply(context, args);
		};

		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (callNow) f.apply(context, args);
	};
}
