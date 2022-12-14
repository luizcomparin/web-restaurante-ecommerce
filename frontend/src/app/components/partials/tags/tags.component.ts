import { FoodService } from './../../../services/food.service';
import { Component } from '@angular/core';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
tags?:Tag[]
constructor(FoodService:FoodService) {
	this.tags = FoodService.getAllTags()
}
}
