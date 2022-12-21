import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
	required: 'O campo não pode estar vazio',
	email: 'Insira um email válido',
};

@Component({
	selector: 'input-validation',
	templateUrl: './input-validation.component.html',
	styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements OnInit, OnChanges {
	@Input()
	control!: AbstractControl;
	@Input()
	showErrorsWhen: boolean = true;
	errorMessages: string[] = [];

	ngOnInit(): void {
		this.control.statusChanges.subscribe(() => {
			this.checkValidation();
		});
		this.control.valueChanges.subscribe(() => {
			this.checkValidation();
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.checkValidation();
	}

	checkValidation() {
		const errors = this.control.errors;
		if (!errors) {
			this.errorMessages = [];
			return;
		}

		const errorKeys = Object.keys(errors);
		// ['required', 'email']
		this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
		// If the 'key' is 'required', this will return 'O campo não pode estar vazio'.
		// If the 'key' is 'email', this will return 'Insira um email válido'.
	}
}
