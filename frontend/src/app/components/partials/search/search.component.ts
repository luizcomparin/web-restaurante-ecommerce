import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
	searchTerm = ''
	constructor(activatedRoute:ActivatedRoute, private router:Router) {
		activatedRoute.params.subscribe((params) => {
			if (params.searchTerm) this.searchTerm = params.searchTerm;
		})
	}

	search(term:string):void {
		if(term) this.router.navigateByUrl('/search/' + term)
	}
}
