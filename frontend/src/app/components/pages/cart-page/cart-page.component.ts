import { CartItem } from './../../../shared/models/CartItem';
import { CartService } from './../../../services/cart.service';
import { Cart } from './../../../shared/models/Cart';
import { Component } from '@angular/core';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
	cart!: Cart;
	constructor(private cartService: CartService) {
		this.cartService.getCartObservable().subscribe((cart) => {
			this.cart = cart;
		});
	}

	removeFromCart(cartItem: CartItem) {
		this.cartService.removeFromCart(cartItem.food.id);
	}

	changeQuantity(cartItem: CartItem, quantityInString: string) {
		const quantity = parseInt(quantityInString);
		this.cartService.changeQuantity(cartItem.food.id, quantity);
	}
}
