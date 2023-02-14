import { AbstractControl } from '@angular/forms';

export const ZipCodeValidator = (zipCodeControlName: string) => {
	const validator = (form: AbstractControl) => {
		const zipCodeControl = form.get(zipCodeControlName);
		// const addressLabelList = form.get(addressLabelListName);

		if (!zipCodeControl) return;

		if (zipCodeControl.value.length == 8) {
			if (!zipCodeControl.errors) return;
			delete zipCodeControl.errors.zipCodeError;
			zipCodeControl.setErrors(zipCodeControl.errors);
			return;
		} else zipCodeControl.setErrors({ zipCodeError: true });
	};

	return validator;
};
