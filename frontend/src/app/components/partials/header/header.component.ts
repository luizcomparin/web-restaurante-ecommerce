import { CartService } from './../../../services/cart.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	cartQuantity = 0;
	constructor(cartService: CartService) {
		cartService.getCartObservable().subscribe((newCart) => {
			this.cartQuantity = newCart.totalCount;
		});
	}
}
