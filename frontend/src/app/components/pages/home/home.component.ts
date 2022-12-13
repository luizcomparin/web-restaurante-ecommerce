import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    foods:Food[] = [];
    constructor(private FoodService:FoodService) {
        this.foods = FoodService.getAll()
    }

}
