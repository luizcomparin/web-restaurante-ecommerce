import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
	DEV_BASE_URL,
	USER_LOGIN_URL,
	USER_REGISTER_URL,
	USER_UPDATE_URL,
} from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { IUserUpdate } from '../shared/interfaces/IUserUpdate';
import { User } from '../shared/models/User';

const USER_KEY = 'User';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private userSubject = new BehaviorSubject<User>(
		this.getUserFromLocalStorage()
	);
	public userObservable: Observable<User>;

	constructor(
		private http: HttpClient,
		private toastrService: ToastrService,
		private router: Router
	) {
		this.userObservable = this.userSubject.asObservable();
	}

	public get currentUser(): User {
		this.userSubject.next(this.getUserFromLocalStorage());
		return this.userSubject.value;
	}

	login(userLogin: IUserLogin): Observable<User> {
		return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
			tap({
				next: (user) => {
					this.setUserToLocalStorage(user);
					this.userSubject.next(user);
					this.toastrService.success(
						`Bem vindo ao FaceBurguer ${user.name}!`,
						`Login realizado.`
					);
				},
				error: (errorResponse) => {
					this.toastrService.error(
						errorResponse.error,
						'Falha no login'
					);
				},
			})
		);
	}

	logout() {
		this.userSubject.next(new User());
		localStorage.removeItem(USER_KEY);
		// console.log('URL atual: ' + window.location.href);
		if (window.location.href != DEV_BASE_URL + '/cart-page') {
			this.router.navigate(['/']);
		} else window.location.reload();
	}

	register(userRegister: IUserRegister): Observable<User> {
		return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
			tap({
				next: (user) => {
					this.setUserToLocalStorage(user);
					this.userSubject.next(user);
					this.toastrService.success(
						`Bem vindo ao FaceBurguer ${user.name}!`,
						'Conta criada com sucesso.'
					);
				},
				error: (errorResponse) => {
					this.toastrService.error(
						errorResponse.error,
						'Cadastro mal sucedido.'
					);
				},
			})
		);
	}

	update(userUpdate: IUserUpdate): Observable<User> {
		return this.http.post<User>(USER_UPDATE_URL, userUpdate).pipe(
			tap({
				next: (user) => {
					this.setUserToLocalStorage(user);
					this.userSubject.next(user);
					this.toastrService.success(
						`Suas informações foram atualizadas!`,
						'Dados salvos com sucesso.'
					);
				},
				error: (errorResponse) => {
					this.toastrService.error(
						errorResponse.error,
						'Falha na atualização.'
					);
				},
			})
		);
	}

	private setUserToLocalStorage(user: User) {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	private getUserFromLocalStorage(): User {
		const userJson = localStorage.getItem(USER_KEY);
		if (userJson) return JSON.parse(userJson) as User;
		return new User();
	}

	// FUNCAO SUBSTITUIDA PELO CODIGO:
	// if (userService.currentUser.token) router.navigate(['/']);
	// Verifica se o usuário está logado ou não, e conforme desejo,
	// redireciona para a rota informada.
	// redirectIfUserIs(status: 'logged' | 'notLogged', route: string) {
	// 	this.userObservable.subscribe((user) => {
	// 		let loginStatus;

	// 		if (status == 'logged') loginStatus = user.token;
	// 		else loginStatus = !user.token;

	// 		if (loginStatus) {
	// 			this.router.navigate([route]);
	// 		}
	// 	});
	// }
}
