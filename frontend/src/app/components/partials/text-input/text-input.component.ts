import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
	required: 'Campo obrigatório',
	email: 'Email inválido',
	minlength: 'Insira mais caracteres',
	notMatch: 'A senha está diferente',
	duplicatedLabel: 'Já existe um endereço com este nome',
};

@Component({
	selector: 'text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit, OnChanges {
	@Input() control!: AbstractControl;
	@Input() showErrorsWhen: boolean = true;
	@Input() label!: string;
	@Input() type: 'text' | 'password' | 'email' = 'text';
	@Input() idInput!: string; // Id do objeto para relacionamento do label
	@Input() hideableValue: boolean = false; // Define se o input vai ter o olhinho pra ocultar o valor
	@Input() onChange: any;

	hidden: boolean = true;
	@Input() showError: boolean = false;
	errorMessages: string[] = [];

	ngOnInit(): void {
		// console.log(this.control.errors);
		this.control.statusChanges.subscribe(() => {
			this.checkValidation();
		});
		this.control.valueChanges.subscribe(() => {
			this.checkValidation();
		});
	}

	ngOnChanges(): void {
		this.checkValidation();
	}

	hideValue() {
		if (this.hideableValue) {
			this.hidden = !this.hidden;
			if (this.type == 'text') return (this.type = 'password');
			if (this.type == 'password') return (this.type = 'text');
		}
		return;
	}

	get formControl() {
		return this.control as FormControl;
	}

	checkValidation() {
		const errors = this.control.errors;
		if (!errors) {
			this.errorMessages = [];
			this.checkIfHasError();
			return;
		}

		const errorKeys = Object.keys(errors);

		// ['required', 'email']
		this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
		// If the 'key' is 'required', this will return 'O campo não pode estar vazio'.
		// If the 'key' is 'email', this will return 'Insira um email válido'.
		this.checkIfHasError();
	}

	checkIfHasError() {
		if (this.errorMessages.length != 0 && this.showErrorsWhen) {
			this.showError = true;
		} else this.showError = false;
		// console.log(
		// 	'Tem erro: ' +
		// 		this.showError +
		// 		' & errorMessages: ' +
		// 		this.errorMessages.length +
		// 		' & showErrorsWhen: ' +
		// 		this.showErrorsWhen
		// );
	}
}
