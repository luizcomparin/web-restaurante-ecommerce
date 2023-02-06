import { AbstractControl } from '@angular/forms';

export const DuplicatedLabelValidator = (
	addressLabelControlName: string,
	addressLabelList: string[],
	selectedAddressLabel?: string
) => {
	const validator = (form: AbstractControl) => {
		const addressLabelControl = form.get(addressLabelControlName);
		// const addressLabelList = form.get(addressLabelListName);

		if (!addressLabelControl || !addressLabelList) return;

		if (selectedAddressLabel == addressLabelControl.value) return;

		if (addressLabelList.includes(addressLabelControl.value)) {
			addressLabelControl.setErrors({ duplicatedLabel: true });
		} else {
			if (!addressLabelControl.errors) return;
			delete addressLabelControl.errors.duplicatedLabel;
			addressLabelControl.setErrors(addressLabelControl.errors);
		}
	};

	return validator;
};
