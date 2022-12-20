import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	foods: Food[] = [];
	constructor(
		private FoodService: FoodService,
		activatedRoute: ActivatedRoute
	) {
		let foodsObservable: Observable<Food[]>;
		activatedRoute.params.subscribe((params) => {
			if (params.searchTerm)
				foodsObservable = this.FoodService.getAllFoodsBySearchTerm(
					params.searchTerm
				);
			else if (params.tag)
				foodsObservable = this.FoodService.getAllFoodsByTag(params.tag);
			else foodsObservable = FoodService.getAll();

			foodsObservable.subscribe((serverFoods) => {
				this.foods = serverFoods;
			});
		});
	}
}
