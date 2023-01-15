import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
	selector: 'app-checkout-page',
	templateUrl: './checkout-page.component.html',
	styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
	order: Order = new Order();
	checkoutForm!: FormGroup;
	constructor(
		cartService: CartService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private toastrService: ToastrService,
		private orderService: OrderService,
		private router: Router
	) {
		const cart = cartService.getCart();
		this.order.items = cart.items;
		this.order.totalPrice = cart.totalPrice;
	}

	ngOnInit(): void {
		let { name, address } = this.userService.currentUser;
		this.checkoutForm = this.formBuilder.group({
			name: [name, Validators.required],
			zipCode: [address.zipCode, Validators.required],
			state: [address.state, Validators.required],
			city: [address.city, Validators.required],
			district: [address.district, Validators.required],
			street: [address.street, Validators.required],
			residenceNumber: [address.residenceNumber, Validators.required],
		});
	}

	get fc() {
		return this.checkoutForm.controls;
	}

	createOrder() {
		if (this.checkoutForm.invalid) {
			this.toastrService.warning(
				'Por favor preencha os campos',
				'Campos inválidos'
			);
			return;
		}
		if (!this.order.addressLatLng) {
			this.toastrService.warning(
				'Por favor selecione seu endereço no mapa',
				'Endereço faltando'
			);
			return;
		}
		this.order.name = this.fc.name.value;
		this.order.address.zipCode = this.fc.zipCode.value;
		this.order.address.state = this.fc.state.value;
		this.order.address.city = this.fc.city.value;
		this.order.address.district = this.fc.district.value;
		this.order.address.street = this.fc.street.value;
		this.order.address.residenceNumber = this.fc.residenceNumber.value;

		this.orderService.create(this.order).subscribe({
			next: () => {
				this.router.navigateByUrl('/payment');
			},
			error: (errorResponse) => {
				this.toastrService.error(errorResponse.error, 'Carrinho');
			},
		});
	}
}
