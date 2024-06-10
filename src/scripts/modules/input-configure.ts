const EMAIL_REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const inputConfigure = () => {
	const emailInputs = document.querySelectorAll<HTMLInputElement>('input[data-type=email]');

	emailInputs.forEach((input) => {
		if (input) {
			const currentForm = input.closest('form');
			const submit = currentForm?.querySelector<HTMLButtonElement>('[type="submit"]');

			input.addEventListener('input', (event) => {
				const target = event.target as HTMLInputElement;
				const result = EMAIL_REG.test(target.value);

				target.classList.toggle('invalid', !result);
				currentForm?.classList.toggle('invalid', !result);
				if (submit) submit.disabled = !result;
			});
		}
	});
};
