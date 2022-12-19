import { CartService } from './../../../services/cart.service';
import { FoodService } from './../../../services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { Component } from '@angular/core';

@Component({
	selector: 'app-food-page',
	templateUrl: './food-page.component.html',
	styleUrls: ['./food-page.component.scss'],
})
export class FoodPageComponent {
	food!: Food;
	constructor(
		activatedRoute: ActivatedRoute,
		foodService: FoodService,
		private cartService: CartService,
		private router: Router
	) {
		activatedRoute.params.subscribe((params) => {
			if (params.id) this.food = foodService.getFoodById(params.id);
		});
	}

	addToCart() {
		this.cartService.addToCart(this.food);
		this.router.navigateByUrl('/cart-page');
	}
}
