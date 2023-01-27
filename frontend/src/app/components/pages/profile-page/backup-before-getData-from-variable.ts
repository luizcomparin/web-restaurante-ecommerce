// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { UserService } from 'src/app/services/user.service';
// import { IAddress } from 'src/app/shared/interfaces/IAddress';
// import { IUserUpdate } from 'src/app/shared/interfaces/IUserUpdate';
// import { User } from 'src/app/shared/models/User';
// import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_valitador';

// @Component({
// 	selector: 'app-profile-page',
// 	templateUrl: './profile-page.component.html',
// 	styleUrls: ['./profile-page.component.scss'],
// })
// export class ProfilePageComponent implements OnInit {
// 	constructor(
// 		private userService: UserService,
// 		private formBuilder: FormBuilder,
// 		private activatedRoute: ActivatedRoute,
// 		private router: Router
// 	) {}

// 	ngOnInit(): void {
// 		this.oldUserData;
// 		this.getData();
// 		this.toggleAddress();
// 		this.createUpdateForm();

// 		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
// 	}

// 	// Variáveis do seletor de endereço
// 	addressLabelList!: string[];
// 	selectedAddress!: IAddress;

// 	// Variaveis do formulário
// 	updateForm!: FormGroup;
// 	addressLabel!: string;

// 	name!: string;
// 	cpf!: string;
// 	email!: string;
// 	cellphone!: number;

// 	isSubmitted = false;
// 	returnUrl = '';

// 	get oldUserData(): User {
// 		return JSON.parse(localStorage.getItem('User')!);
// 	}

// 	getData() {
// 		this.name = this.userService.currentUser.name;
// 		this.cpf = this.userService.currentUser.cpf;
// 		this.email = this.userService.currentUser.email;
// 		this.cellphone = this.userService.currentUser.cellphone;

// 		this.addressLabelList = this.userService.currentUser.addresses.map(
// 			(value) => value.addressLabel
// 		);
// 	}

// 	// getAndUpdateAddress(): User {
// 	// 	const user: User = JSON.parse(localStorage.getItem('User')!);

// 	// 	user.addresses = user.addresses.map((address) => {
// 	// 		if (address.addressLabel === this.addressLabel) {
// 	// 			return { ...address, street: 'new street' };
// 	// 		}
// 	// 		return address;
// 	// 	});
// 	// 	console.log(user);
// 	// 	return user;
// 	// }

// 	getAndUpdateAddress(): User {
// 		const user: User = JSON.parse(localStorage.getItem('User')!);

// 		user.addresses = user.addresses.map((address) => {
// 			if (address.addressLabel === this.addressLabel) {
// 				// return { ...address, street: 'new street' };
// 				return this.updatedAddress();
// 			}
// 			return address;
// 		});
// 		console.log('Updated User: ');
// 		console.log(user);
// 		return user;
// 	}

// 	saveToLocalStorage() {
// 		console.log(this.getAndUpdateAddress());
// 		localStorage.setItem(
// 			'User',
// 			JSON.stringify(this.getAndUpdateAddress())
// 		);

// 		this.getData();
// 	}

// 	toggleAddress(address: string = this.addressLabelList[0]) {
// 		this.addressLabel = address;
// 		console.log(
// 			'addressLabel: ' + this.addressLabel,
// 			'addresses: ' + this.addressLabelList
// 		);

// 		for (
// 			let index = 0;
// 			index < this.userService.currentUser.addresses.length;
// 			index++
// 		) {
// 			if (
// 				this.addressLabel ==
// 				this.userService.currentUser.addresses[index].addressLabel
// 			) {
// 				this.selectedAddress =
// 					this.userService.currentUser.addresses[index];
// 			}
// 		}
// 		console.log('selectedAddress:');
// 		console.log(this.selectedAddress);
// 		console.log('currentUser:');
// 		console.log(this.userService.currentUser);

// 		this.createUpdateForm();
// 	}

// 	createUpdateForm() {
// 		this.updateForm = this.formBuilder.group(
// 			{
// 				name: [
// 					this.name,
// 					[Validators.required, Validators.minLength(5)],
// 				],
// 				cpf: [this.cpf, [Validators.required, Validators.minLength(5)]],
// 				email: [this.email, [Validators.required, Validators.email]],
// 				cellphone: [this.cellphone, [Validators.required]],
// 				// password: ['', [Validators.required, Validators.minLength(5)]],
// 				// confirmPassword: ['', Validators.required],
// 				zipCode: [
// 					this.selectedAddress.zipCode,
// 					[Validators.required, Validators.minLength(8)],
// 				],
// 				state: [this.selectedAddress.state, Validators.required],
// 				city: [this.selectedAddress.city, Validators.required],
// 				district: [this.selectedAddress.district, Validators.required],
// 				street: [this.selectedAddress.street, Validators.required],
// 				residenceNumber: [
// 					this.selectedAddress.residenceNumber,
// 					Validators.required,
// 				],
// 				addressLabel: [this.addressLabel, Validators.required],
// 			},
// 			{
// 				validators: PasswordsMatchValidator(
// 					'password',
// 					'confirmPassword'
// 				),
// 			}
// 		);
// 	}

// 	// updatedUserData():User {
// 	// 	const formValue = this.updateForm.value;

// 	// 	return {
// 	// 		id: this.oldUserData.id,
// 	// 		name: formValue.name,
// 	// 		cpf: formValue.cpf,
// 	// 		email: formValue.email,
// 	// 		cellphone: formValue.cellphone,
// 	// 		addresses: {
// 	// 			addressLabel: formValue.addressLabel,
// 	// 			zipCode: formValue.zipCode,
// 	// 			state: formValue.state,
// 	// 			city: formValue.city,
// 	// 			district: formValue.district,
// 	// 			street: formValue.street,
// 	// 			residenceNumber: formValue.residenceNumber,
// 	// 		},
// 	// 	};
// 	// }

// 	updatedAddress(): IAddress {
// 		const formValue = this.updateForm.value;

// 		return {
// 			addressLabel: formValue.addressLabel,
// 			zipCode: formValue.zipCode,
// 			state: formValue.state,
// 			city: formValue.city,
// 			district: formValue.district,
// 			street: formValue.street,
// 			residenceNumber: formValue.residenceNumber,
// 		};
// 	}

// 	get fc() {
// 		return this.updateForm.controls;
// 	}

// 	submit() {
// 		this.isSubmitted = true;
// 		if (this.updateForm.invalid) {
// 			console.log('Form inválido. Campos faltando ou valores inválidos.');
// 			return;
// 		}

// 		const formValue = this.updateForm.value;

// 		const user: IUserUpdate = {
// 			name: formValue.name,
// 			cpf: formValue.cpf,
// 			email: formValue.email,
// 			cellphone: formValue.cellphone,
// 			address: {
// 				addressLabel: formValue.addressLabel,
// 				zipCode: formValue.zipCode,
// 				state: formValue.state,
// 				city: formValue.city,
// 				district: formValue.district,
// 				street: formValue.street,
// 				residenceNumber: formValue.residenceNumber,
// 			},
// 		};

// 		this.userService.update(user).subscribe((_) => {
// 			this.router.parseUrl(this.returnUrl);
// 		});

// 		// setTimeout(() => {
// 		// 	this.toggleAddress(this.addressLabel);
// 		// 	this.createUpdateForm();
// 		// }, 2000);
// 	}

// 	// comitar():any => {this.userService.update()}
// }
