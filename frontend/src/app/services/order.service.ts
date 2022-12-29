import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ORDERS_CREATE_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient) {}

	create(order: Order) {
		return this.http.post<Order>(ORDERS_CREATE_URL, order);
	}
}
