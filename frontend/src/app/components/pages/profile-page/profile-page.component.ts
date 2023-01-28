import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IAddress } from 'src/app/shared/interfaces/IAddress';
import { IUserUpdate } from 'src/app/shared/interfaces/IUserUpdate';
import { User } from 'src/app/shared/models/User';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_valitador';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
		private router: Router,
		private matDialog: MatDialog,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.oldUserData;
		this.toggleAddress();
		this.createUpdateForm();

		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
	}

	isSubmitted = false;
	returnUrl = '';

	// Alias for HTML
	get fc() {
		return this.updateForm.controls;
	}

	// toggleAddress() variables
	addressLabelList: string[] = this.userService.currentUser.addresses.map(
		(value) => value.addressLabel
	);
	selectedAddress!: IAddress;

	// Form variables
	updateForm!: FormGroup;
	addressLabel: string = this.addressLabelList[0];
	showLabelError: boolean = false;

	get oldUserData(): User {
		return JSON.parse(localStorage.getItem('User')!);
	}

	currentUserData: User = this.oldUserData;

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// Simply returns the updated selectedAddress
	updatedAddress(): IAddress {
		const formValue = this.updateForm.value;

		return {
			addressLabel: this.selectedAddress.addressLabel,
			zipCode: formValue.zipCode,
			state: formValue.state,
			city: formValue.city,
			district: formValue.district,
			street: formValue.street,
			residenceNumber: formValue.residenceNumber,
		};
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// Simply returns the updated currentUser
	updatedUser(): IUserUpdate {
		return {
			oldEmail: this.oldUserData.email,
			name: this.currentUserData.name,
			cpf: this.currentUserData.cpf,
			email: this.currentUserData.email,
			cellphone: this.currentUserData.cellphone,
			addresses: this.currentUserData.addresses,
		};
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	getAndUpdateUser(): User {
		const user = this.currentUserData;
		const formValue = this.updateForm.value;

		user.name = formValue.name;
		user.cpf = formValue.cpf;
		user.email = formValue.email;
		user.cellphone = formValue.cellphone;

		user.addresses = user.addresses.map((address) => {
			if (address.addressLabel === this.addressLabel) {
				// return { ...address, street: 'new street' };
				return this.updatedAddress();
			}
			return address;
		});
		console.log('Updated User: ', user);
		console.log('currentUserData: ', this.currentUserData);
		console.log('updatedUser(): ', this.updatedUser());
		return user;
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	toggleAddress(address: string = this.addressLabelList[0]) {
		this.addressLabel = address;
		// console.log(
		// 	'addressLabel: ',
		// 	this.addressLabel,
		// 	'addressLabelList: ',
		// 	this.addressLabelList
		// );

		for (
			let index = 0;
			index < this.currentUserData.addresses.length;
			index++
		) {
			if (
				this.addressLabel ==
				this.currentUserData.addresses[index].addressLabel
			) {
				this.selectedAddress = this.currentUserData.addresses[index];
			}
		}

		// console.log('selectedAddress: ', this.selectedAddress);
		// console.log('currentUserData: ', this.currentUserData);

		this.createUpdateForm();
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	createUpdateForm() {
		this.updateForm = this.formBuilder.group(
			{
				name: [
					this.currentUserData.name,
					[Validators.required, Validators.minLength(5)],
				],
				cpf: [
					this.currentUserData.cpf,
					[Validators.required, Validators.minLength(5)],
				],
				email: [
					this.currentUserData.email,
					[Validators.required, Validators.email],
				],
				cellphone: [
					this.currentUserData.cellphone,
					[Validators.required],
				],
				// password: ['', [Validators.required, Validators.minLength(5)]],
				// confirmPassword: ['', Validators.required],
				zipCode: [
					this.selectedAddress.zipCode,
					[Validators.required, Validators.minLength(8)],
				],
				state: [this.selectedAddress.state, Validators.required],
				city: [this.selectedAddress.city, Validators.required],
				district: [this.selectedAddress.district, Validators.required],
				street: [this.selectedAddress.street, Validators.required],
				residenceNumber: [
					this.selectedAddress.residenceNumber,
					Validators.required,
				],
				addressLabel: [''],
			},
			{
				validators: PasswordsMatchValidator(
					'password',
					'confirmPassword'
				),
			}
		);
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	saveToLocalStorage() {
		localStorage.setItem('User', JSON.stringify(this.getAndUpdateUser()));
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	openDialog(ngTemplate: any) {
		this.matDialog.open(ngTemplate, {
			// height: 'auto',
			width: 'fit-content',
			// disableClose: true,
			autoFocus: true,
		});
	}

	closeDialog() {
		this.matDialog.closeAll();
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	verifyLabelError() {
		const formValue = this.updateForm.value;

		if (this.addressLabelList.includes(formValue.addressLabel)) {
			this.showLabelError = true;
		} else this.showLabelError = false;
	}

	changeAddressLabel() {
		const formValue = this.updateForm.value;

		this.verifyLabelError();

		if (formValue.addressLabel != '' && this.showLabelError != true) {
			this.selectedAddress.addressLabel = formValue.addressLabel;

			this.addressLabelList = this.currentUserData.addresses.map(
				(value) => value.addressLabel
			);

			this.updatedAddress();

			this.toggleAddress(this.selectedAddress.addressLabel);

			this.closeDialog();

			// console.log(
			// 	'selected addressLabel: ',
			// 	this.selectedAddress.addressLabel
			// );
			// console.log(
			// 	'currentUserData.addresses: ',
			// 	this.currentUserData.addresses
			// );
			// console.log('this.addressLabelList: ', this.addressLabelList);
			// console.log('this.selectedAddress: ', this.selectedAddress);
			// console.log('this.updatedUser(): ', this.updatedUser());
		}
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	submit() {
		this.isSubmitted = true;
		if (this.updateForm.invalid) {
			this.toastrService.clear();
			this.toastrService.error(
				'Form inválido. Campos faltando ou valores inválidos.',
				'Falha na atualização.'
			);
			return;
		}

		this.userService.update(this.updatedUser()).subscribe((_) => {
			this.router.parseUrl(this.returnUrl);
		});
	}
}
