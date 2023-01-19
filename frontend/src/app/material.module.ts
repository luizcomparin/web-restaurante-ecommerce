import { NgModule } from '@angular/core';
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

@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents],
})
export class MaterialModule {}
