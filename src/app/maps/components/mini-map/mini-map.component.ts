import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LngLat, LngLatLike, Map, Marker } from 'mapbox-gl';
import { MapboxEvents } from '../../constants/mapbox-event';
import { MarkerSave } from '../../interfaces/marker-save';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() markerSave?: MarkerSave;
  @Input() marker?: Marker;

  @ViewChild('miniMap') divMiniMap?: ElementRef;
  map?: Map;
  zoomRange: number = 15;
  currentLngLat!: LngLatLike;

  // constructor() {}

  ngAfterViewInit(): void {
    if (!this.divMiniMap) {
      console.error('El mini map no cargo correctamente');
      return;
    }

    this.map = new Map({
      container: this.divMiniMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      attributionControl: false,
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoomRange, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners(): void {
    if (!this.map) {
      throw 'El mapa no cargo';
    }

    this.map.on('load', () => {
      this.map!.resize();
    });

    this.addMarker(this.markerSave!.lngLat, this.markerSave!.color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) {
      console.error('El mapa no se cargo completo');
      return;
    }

    this.marker = new Marker({
      color: color,
      draggable: true,
      anchor: 'center',
    })
      .setLngLat(lngLat)
      .addTo(this.map);
  }
}
