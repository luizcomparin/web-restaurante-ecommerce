import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	private isLoadingSubject = new BehaviorSubject<boolean>(false);
	constructor() {}

	showLoading() {
		this.isLoadingSubject.next(true);
	}
}
