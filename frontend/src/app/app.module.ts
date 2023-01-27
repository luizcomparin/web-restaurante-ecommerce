import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { DragScrollModule } from 'ngx-drag-scroll';

// Angular Material Components imports
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponents = [
	MatButtonModule,
	MatButtonToggleModule,
	MatChipsModule,
	MatIconModule,
	MatFormFieldModule,
];

registerLocaleData(localePt, 'pt');

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		HomeComponent,
		SearchComponent,
		TagsComponent,
		FoodPageComponent,
		CartPageComponent,
		TitleComponent,
		NotFoundComponent,
		LoginPageComponent,
		TextInputComponent,
		DefaultButtonComponent,
		RegisterPageComponent,
		LoadingComponent,
		CheckoutPageComponent,
		OrderItemsListComponent,
		MapComponent,
		PaymentPageComponent,
		PaypalButtonComponent,
		OrderTrackPageComponent,
		ProfilePageComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		RatingModule,
		HttpClientModule,
		ReactiveFormsModule,
		DragScrollModule,
		MaterialComponents,
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: 'toast-bottom-right',
			newestOnTop: false,
		}),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true,
		},
		{
			provide: LOCALE_ID,
			useValue: 'pt',
		},
		{
			provide: DEFAULT_CURRENCY_CODE,
			useValue: 'BRL',
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
