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

	name = this.userService.currentUser.name;
	cpf = this.userService.currentUser.cpf;
	email = this.userService.currentUser.email;
	cellphone = this.userService.currentUser.cellphone;
	zipCode = this.userService.currentUser.addresses[0].zipCode;
	state = this.userService.currentUser.addresses[0].state;
	city = this.userService.currentUser.addresses[0].city;
	district = this.userService.currentUser.addresses[0].district;
	street = this.userService.currentUser.addresses[0].street;
	residenceNumber = this.userService.currentUser.addresses[0].residenceNumber;
	addressLabel = this.userService.currentUser.addresses[0].addressLabel;

	ngOnInit(): void {
		this.updateForm = this.formBuilder.group(
			{
				name: [
					this.name,
					[Validators.required, Validators.minLength(5)],
				],
				cpf: [this.cpf, [Validators.required, Validators.minLength(5)]],
				email: [this.email, [Validators.required, Validators.email]],
				cellphone: [this.cellphone, [Validators.required]],
				password: ['', [Validators.required, Validators.minLength(5)]],
				confirmPassword: ['', Validators.required],
				zipCode: [
					this.zipCode,
					[Validators.required, Validators.minLength(8)],
				],
				state: [this.state, Validators.required],
				city: [this.city, Validators.required],
				district: [this.district, Validators.required],
				street: [this.street, Validators.required],
				residenceNumber: [this.residenceNumber, Validators.required],
				addressLabel: [this.addressLabel, Validators.required],
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
			cpf: fv.cpf,
			email: fv.email,
			cellphone: fv.cellphone,
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

		this.userService.update(user).subscribe((_) => {
			this.router.parseUrl(this.returnUrl);
		});

		// Reload necessário para pegar o token no Header
		// window.location.reload();
	}

	// comitar():any => {this.userService.update()}
}
