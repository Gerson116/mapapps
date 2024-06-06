import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerSave } from '../../interfaces/marker-save';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() currentLngLat!: LngLat;
  // @Input() marker?: Marker;

  @ViewChild('miniMap') divMiniMap?: ElementRef;
  map?: Map;
  zoomRange: number = 15;
  color!: string;
  marker!: Marker;
  // currentLngLat: LngLat = new LngLat(-69.81855278168246, 18.50751112324967);

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
    
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    this.addMarker(this.currentLngLat, this.color);
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
    }).setLngLat(lngLat).addTo(this.map);
  }
}
