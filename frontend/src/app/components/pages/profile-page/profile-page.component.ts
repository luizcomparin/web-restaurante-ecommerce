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
import { DuplicatedLabelValidator } from 'src/app/shared/validators/addressLabelDuplicate_validator';

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
	) { }

	ngOnInit(): void {
		this.oldUserData;
		this.toggleAddress();
		this.createUpdateForm();

		this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
	}

	isSubmitted = false;
	labelSaveButtonClicked = false;
	newAddressButtonClicked = false;
	returnUrl = '';

	// toggleAddress() variables
	addressLabelList: string[] = this.userService.currentUser.addresses.map(
		(value) => value.addressLabel
	);
	selectedAddress!: IAddress;

	// Form variables
	updateForm!: FormGroup;
	newAddressForm!: FormGroup;
	addressLabel: string = this.addressLabelList[0];
	showLabelError: boolean = false;

	get oldUserData(): User {
		return JSON.parse(localStorage.getItem('User')!);
	}

	currentUserData: User = this.oldUserData;

	// Alias for HTML
	get updateFormControls() {
		return this.updateForm.controls;
	}

	get newAddressFormControls() {
		return this.newAddressForm.controls;
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// Returns the updated selectedAddress
	updatedAddress(): IAddress {
		const updateForm = this.updateForm.value;

		return {
			addressLabel: this.selectedAddress.addressLabel,
			zipCode: updateForm.zipCode,
			state: updateForm.state,
			city: updateForm.city,
			district: updateForm.district,
			street: updateForm.street,
			residenceNumber: updateForm.residenceNumber,
		};
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// Returns the updated currentUser
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

	// Runs everytime a form field is modified
	getAndUpdateUser(): User {
		const currentUserData = this.currentUserData;
		const updateForm = this.updateForm.value;

		currentUserData.name = updateForm.name;
		currentUserData.cpf = updateForm.cpf;
		currentUserData.email = updateForm.email;
		currentUserData.cellphone = updateForm.cellphone;

		currentUserData.addresses = currentUserData.addresses.map((address) => {
			if (address.addressLabel === this.addressLabel) {
				// return { ...address, street: 'new street' };
				return this.updatedAddress();
			}
			return address;
		});
		console.log('Updated User: ', currentUserData);
		console.log('currentUserData: ', this.currentUserData);
		console.log('updatedUser(): ', this.updatedUser());
		return currentUserData;
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// Responsible for switching and updating displayed address when mat-button-toggle is clicked
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

	changeAddressLabel() {
		const updateForm = this.updateForm.value;
		this.labelSaveButtonClicked = true;

		if (updateForm.addressLabel != '' && !this.updateForm.invalid) {
			this.selectedAddress.addressLabel = updateForm.addressLabel;

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

	addNewAddress() {
		const newAddressForm = this.newAddressForm.value;
		this.isSubmitted = true;

		if (newAddressForm.addressLabel != '' && !this.newAddressForm.invalid) {
			const newAddress = {
				addressLabel: newAddressForm.addressLabel,
				zipCode: newAddressForm.zipCode,
				state: newAddressForm.state,
				city: newAddressForm.city,
				district: newAddressForm.district,
				street: newAddressForm.street,
				residenceNumber: newAddressForm.residenceNumber,
			};

			this.addressLabelList.push(newAddress.addressLabel);

			this.currentUserData.addresses.push(newAddress);

			this.selectedAddress = newAddress;

			console.log('currentUserAddress: ', this.currentUserData.addresses);

			this.updatedAddress();

			this.toggleAddress(this.selectedAddress.addressLabel);

			this.closeDialog();
		}

		console.log('updateForm: ', this.updateForm.value);
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	deleteAddress() {
		this.currentUserData.addresses.forEach((element, index) => {
			if (element.addressLabel == this.selectedAddress.addressLabel) {
				this.currentUserData.addresses.splice(index, 1);

				this.addressLabelList.splice(index, 1);
			}
		});

		console.log(this.currentUserData.addresses);
		console.log(this.addressLabelList);

		this.toggleAddress(this.currentUserData.addresses[0].addressLabel);

		this.closeDialog();
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
					this.selectedAddress?.zipCode || '',
					[Validators.required, Validators.minLength(8)],
				],
				state: [this.selectedAddress?.state || '', Validators.required],
				city: [this.selectedAddress?.city || '', Validators.required],
				district: [this.selectedAddress?.district || '', Validators.required],
				street: [this.selectedAddress?.street || '', Validators.required],
				residenceNumber: [
					this.selectedAddress?.residenceNumber || '',
					Validators.required,
				],
				addressLabel: [
					this.selectedAddress?.addressLabel || '',
					Validators.required,
				],
			},
			{
				validators: [
					PasswordsMatchValidator('password', 'confirmPassword'),
					DuplicatedLabelValidator(
						'addressLabel',
						this.addressLabelList,
						this.selectedAddress?.addressLabel || ''
					),
				],
			}
		);
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	// This is called when button "Adicionar endereço" is clicked
	addNewAddressForm() {
		this.isSubmitted = false;

		this.newAddressForm = this.formBuilder.group(
			{
				zipCode: ['', [Validators.required, Validators.minLength(8)]],
				state: ['', Validators.required],
				city: ['', Validators.required],
				district: ['', Validators.required],
				street: ['', Validators.required],
				residenceNumber: ['', Validators.required],
				addressLabel: ['', Validators.required],
			},
			{
				validators: [
					DuplicatedLabelValidator(
						'addressLabel',
						this.addressLabelList
					),
				],
			}
		);
	}

	//==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==#==//

	openDialog(ngTemplate: any) {
		this.matDialog.open(ngTemplate, {
			width: 'fit-content',
			autoFocus: true,
		});
	}

	closeDialog() {
		this.matDialog.closeAll();
		this.labelSaveButtonClicked = false;
		this.isSubmitted = false;
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
