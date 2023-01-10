import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserUpdate } from 'src/app/shared/interfaces/IUserUpdate';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_valitador';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
	constructor(
		private userService: UserService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {}

	updateForm!: FormGroup;
	isSubmitted = false;
	returnUrl = '';

	ngOnInit(): void {
		this.updateForm = this.formBuilder.group(
			{
				name: ['', [Validators.required, Validators.minLength(5)]],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(5)]],
				confirmPassword: ['', Validators.required],
				cep: ['', [Validators.required, Validators.minLength(8)]],
				state: ['', Validators.required],
				city: ['', Validators.required],
				district: ['', Validators.required],
				street: ['', Validators.required],
				residenceNumber: ['', Validators.required],
			},
			{
				validators: PasswordsMatchValidator(
					'password',
					'confirmPassword'
				),
			}
		);

		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
	}

	get fc() {
		return this.updateForm.controls;
	}

	submit() {
		this.isSubmitted = true;
		if (this.updateForm.invalid) {
			console.log('Form inválido. Campos faltando ou valores inválidos.');
			return;
		}

		const fv = this.updateForm.value;
		const user: IUserUpdate = {
			name: fv.name,
			email: fv.email,
			address: {
				cep: fv.cep,
				state: fv.state,
				city: fv.city,
				district: fv.district,
				street: fv.street,
				residenceNumber: fv.residenceNumber,
			},
		};

		this.userService.update(user).subscribe((_) => {
			this.router.parseUrl(this.returnUrl);
		});

		// Reload necessário para pegar o token no Header
		// window.location.reload();
	}

	// comitar():any => {this.userService.update()}
}
