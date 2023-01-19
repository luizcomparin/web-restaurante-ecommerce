import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IUserRegister';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_valitador';

@Component({
	selector: 'app-register-page',
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
	registerForm!: FormGroup;
	isSubmitted = false;

	returnUrl = '';

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private activatedRoute: ActivatedRoute,
		private router: Router
	) {
		if (userService.currentUser.token) router.navigate(['/']);
	}

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group(
			{
				name: ['', [Validators.required, Validators.minLength(5)]],
				cpf: ['', [Validators.required, Validators.minLength(5)]],
				email: ['', [Validators.required, Validators.email]],
				cellphone: ['', [Validators.required]],
				password: ['', [Validators.required, Validators.minLength(5)]],
				confirmPassword: ['', Validators.required],
				zipCode: ['', [Validators.required, Validators.minLength(8)]],
				state: ['', Validators.required],
				city: ['', Validators.required],
				district: ['', Validators.required],
				street: ['', Validators.required],
				residenceNumber: ['', Validators.required],
				addressLabel: ['Casa', Validators.required],
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
		return this.registerForm.controls;
	}

	submit() {
		this.isSubmitted = true;
		if (this.registerForm.invalid) return;

		const fv = this.registerForm.value;
		const user: IUserRegister = {
			name: fv.name,
			cpf: fv.cpf,
			email: fv.email,
			cellphone: fv.cellphone,
			password: fv.password,
			confirmPassword: fv.confirmPassword,
			addresses: [
				{
					addressLabel: fv.addressLabel,
					zipCode: fv.zipCode,
					state: fv.state,
					city: fv.city,
					district: fv.district,
					street: fv.street,
					residenceNumber: fv.residenceNumber,
				},
			],
		};

		this.userService.register(user).subscribe((_) => {
			this.router.navigateByUrl(this.returnUrl);
		});
	}
}
