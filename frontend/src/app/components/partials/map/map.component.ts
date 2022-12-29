import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
	icon,
	LatLng,
	LatLngExpression,
	LatLngTuple,
	LeafletMouseEvent,
	map,
	Map,
	marker,
	Marker,
	tileLayer,
} from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
	selector: 'map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
	constructor(private locationService: LocationService) {}

	ngOnInit(): void {
		this.initializeMap();
	}

	@Input() order!: Order;

	private readonly MARKER_ZOOM_LEVEL = 16;
	private readonly MARKER_ICON = icon({
		iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
		iconSize: [42, 42],
		iconAnchor: [21, 42],
	});
	private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

	@ViewChild('map', { static: true }) // Selects a tag from the HTML and puts it inside a field
	mapRef!: ElementRef;

	map!: Map;
	currentMarker!: Marker;

	initializeMap() {
		if (this.map) return;

		this.map = map(this.mapRef.nativeElement, {
			attributionControl: false,
		}).setView(this.DEFAULT_LATLNG, 1);

		tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

		// Setar posição do marcador com clique no mapa
		this.map.on('click', (e: LeafletMouseEvent) => {
			this.setMarker(e.latlng);
		});
	}

	findMyLocation() {
		this.locationService.getCurrentLocation().subscribe({
			next: (latlng) => {
				this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
				this.setMarker(latlng);
			},
		});
	}

	setMarker(latlng: LatLngExpression) {
		this.addressLatLng = latlng as LatLng;
		if (this.currentMarker) {
			this.currentMarker.setLatLng(latlng);
			return;
		}

		this.currentMarker = marker(latlng, {
			draggable: true,
			icon: this.MARKER_ICON,
		}).addTo(this.map);

		this.currentMarker.on('dragend', () => {
			this.addressLatLng = this.currentMarker.getLatLng();
		});
	}

	// Definindo valores de latitude e longitude para 8 casas decimais
	set addressLatLng(latlng: LatLng) {
		latlng.lat = parseFloat(latlng.lat.toFixed(8));
		latlng.lng = parseFloat(latlng.lng.toFixed(8));
		this.order.addressLatLng = latlng;
		console.log(this.order.addressLatLng);
	}
}
