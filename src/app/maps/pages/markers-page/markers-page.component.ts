import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { MapboxEvents } from '../../constants/mapbox-event';
import { Markers } from '../../interfaces/markers';
import { MarkerSave } from '../../interfaces/marker-save';

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('map') divMap?: ElementRef;
  map?: Map;
  marker?: Marker;
  currentLngLat: LngLat = new LngLat(-69.81855278168246, 18.50751112324967);
  zoomRange: number = 18;

  //#region icons fontawesome
  faPlus = faPlus;
  faSave = faSave;
  //#endregion

  public color!: string;
  listMarkers: Array<Markers> = new Array<Markers>();
  listMarkersSave: Array<MarkerSave> = new Array<MarkerSave>();

  //...

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) {
      console.error('El contenedor no fue inicializado exitosamente.');
      return;
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      attributionControl: false,
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoomRange, // starting zoom
    });

    this.mapListeners();
    this.readToMarker();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void {
    if (!this.map) {
      throw 'El mapa no cargo';
    }

    this.map.on('load', () => {
      this.map!.resize();
    });

    //#region In this block I'm manage the zoom
    this.map.on('zoom', (ev) => {
      this.zoomRange = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 19) {
        return;
      }
      this.map!.zoomTo(18);
    });
    //#endregion

    this.map.on(MapboxEvents.Click, (ev) => {
      this.color = '#xxxxxx'.replace(/x/g, (y) =>
        ((Math.random() * 16) | 0).toString(16)
      );
      this.addMarker(ev.lngLat, this.color);
    });
  }

  zoomIn() {
    if (this.zoomRange < 19) {
      this.map?.zoomIn();
    }
  }

  zoomOut() {
    if (this.zoomRange > -2 && this.zoomRange < 19) {
      this.map?.zoomOut();
    }
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

  flyTo(lngLat: LngLat): void {
    this.map?.flyTo({
      zoom: this.zoomRange,
      center: lngLat,
    });
  }

  deleteElement(index: number): void {
    this.listMarkers[index].marker.remove();
    this.listMarkers.splice(index, 1);
  }

  btnAddMarker(): void {
    if (!this.map) {
      console.error('El mapa no se cargo completo');
      return;
    }

    if (!this.marker) {
      console.error('El marcador es nulo');
      return;
    }

    let tempMarkers: Markers = {
      marker: this.marker,
      color: this.color,
      lngLat: this.marker.getLngLat(),
    };

    this.listMarkers.push(tempMarkers);

    let tempMarkerSave: MarkerSave = {
      color: this.color,
      lngLat: this.marker.getLngLat(),
    };

    this.saveToMarker(tempMarkerSave);
  }

  saveToMarker(markerSave: MarkerSave): void {
    if (typeof markerSave === 'object') {
      this.listMarkersSave.push(markerSave);
    }

    let markers = JSON.stringify(this.listMarkersSave);
    localStorage.setItem('listMarkersSave', markers);
  }

  loadMarker(markersSaved: Array<MarkerSave>, map: Map): void{
    markersSaved.forEach(element => {

      this.marker = new Marker({
        color: element.color,
        draggable: true,
        anchor: 'center',
      }).setLngLat(element.lngLat).addTo(map);

      let tempMarkers: Markers = {
        marker: this.marker,
        color: element.color,
        lngLat: this.marker.getLngLat(),
      };

      let tempMarkerSave: MarkerSave = {
        color: element.color,
        lngLat: this.marker.getLngLat(),
      };

      this.listMarkers.push(tempMarkers);
      this.listMarkersSave.push(tempMarkerSave);
    });
  }

  readToMarker(): void {
    let tempData = localStorage.getItem('listMarkersSave');
    if (tempData != null) {
      if (!this.map) {
        console.error('El mapa no cargo');
        return;
      }
      let markersSaved: Array<MarkerSave> = JSON.parse(JSON.parse(JSON.stringify(tempData)));
      this.loadMarker(markersSaved, this.map);
    }
  }
}
