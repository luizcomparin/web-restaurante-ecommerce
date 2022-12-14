import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    foods:Food[] = [];
    constructor(private FoodService:FoodService, activatedRoute:ActivatedRoute) {
		activatedRoute.params.subscribe((params) => {
			if(params.searchTerm)
			this.foods = this.FoodService.getAllFoodsBySearchTerm(params.searchTerm);
			else if (params.tag)
			this.foods = this.FoodService.getAllFoodsByTag(params.tag)
			else
			this.foods = FoodService.getAll();
		})

    }

}
