// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { CartService } from 'src/app/services/cart.service';
// import { OrderService } from 'src/app/services/order.service';
// import { UserService } from 'src/app/services/user.service';
// import { IAddress } from 'src/app/shared/interfaces/IAddress';
// import { Order } from 'src/app/shared/models/Order';

// @Component({
// 	selector: 'app-checkout-page',
// 	templateUrl: './checkout-page.component.html',
// 	styleUrls: ['./checkout-page.component.scss'],
// })
// export class CheckoutPageComponent implements OnInit {
// 	order: Order = new Order();
// 	checkoutForm!: FormGroup;

// 	// addresses: string[] = ['Casa', 'Trabalho'];
// 	addresses: string[] = this.userService.currentUser.addresses.map(
// 		(value) => value.addressLabel
// 	); // Stores all addresess

// 	address!: string[]; // Stores the selected address

// 	toggleAddress(address: string[] = this.addresses) {
// 		this.address = address;
// 		console.log(this.address, this.addresses);
// 	}

// 	constructor(
// 		cartService: CartService,
// 		private formBuilder: FormBuilder,
// 		private userService: UserService,
// 		private toastrService: ToastrService,
// 		private orderService: OrderService,
// 		private router: Router
// 	) {
// 		const cart = cartService.getCart();
// 		this.order.items = cart.items;
// 		this.order.totalPrice = cart.totalPrice;
// 	}

// 	ngOnInit(): void {
// 		let { name, addresses } = this.userService.currentUser;
// 		this.checkoutForm = this.formBuilder.group({
// 			name: [name, Validators.required],
// 			zipCode: [addresses[0].zipCode, Validators.required],
// 			state: [addresses[0].state, Validators.required],
// 			city: [addresses[0].city, Validators.required],
// 			district: [addresses[0].district, Validators.required],
// 			street: [addresses[0].street, Validators.required],
// 			residenceNumber: [
// 				addresses[0].residenceNumber,
// 				Validators.required,
// 			],
// 		});

// 		this.toggleAddress();
// 	}

// 	get fc() {
// 		return this.checkoutForm.controls;
// 	}

// 	createOrder() {
// 		if (this.checkoutForm.invalid) {
// 			this.toastrService.warning(
// 				'Por favor preencha os campos',
// 				'Campos inválidos'
// 			);
// 			return;
// 		}
// 		if (!this.order.addressLatLng) {
// 			this.toastrService.warning(
// 				'Por favor selecione seu endereço no mapa',
// 				'Endereço faltando'
// 			);
// 			return;
// 		}
// 		this.order.name = this.fc.name.value;
// 		this.order.address.zipCode = this.fc.zipCode.value;
// 		this.order.address.state = this.fc.state.value;
// 		this.order.address.city = this.fc.city.value;
// 		this.order.address.district = this.fc.district.value;
// 		this.order.address.street = this.fc.street.value;
// 		this.order.address.residenceNumber = this.fc.residenceNumber.value;

// 		this.orderService.create(this.order).subscribe({
// 			next: () => {
// 				this.router.navigateByUrl('/payment');
// 			},
// 			error: (errorResponse) => {
// 				this.toastrService.error(errorResponse.error, 'Carrinho');
// 			},
// 		});
// 	}
// }
