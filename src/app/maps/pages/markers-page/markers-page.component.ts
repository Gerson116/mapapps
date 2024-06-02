import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { MapboxEvents } from '../../constants/mapbox-event';

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy{
  
  @ViewChild('map') divMap?: ElementRef;
  map?: Map;
  marker?: Marker;
  currentLngLat: LngLat = new LngLat(-69.81855278168246, 18.50751112324967);
  zoomRange: number = 18;

  //#region icons fontawesome
  faPlus = faPlus;
  faSave = faSave;
  //#endregion
  
  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) {
      console.error('El contenedor no fue inicializado exitosamente.');
      return;
    }

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoomRange, // starting zoom
    });
    
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void {
    if(!this.map){
      throw 'El mapa no cargo'
    }

    // this.map.on('load', () => {
    //   this.map!.resize();
    // })

    //#region In this block I'm manage the zoom
    this.map.on('zoom', (ev)=>{
      this.zoomRange = this.map!.getZoom();
    });
    
    this.map.on('zoomend', ()=>{
      if(this.map!.getZoom() < 19){
        return;
      }
      this.map!.zoomTo(18);
    });
    //#endregion

    this.map.on(MapboxEvents.Mousemove, ()=> {
      this.currentLngLat = this.map!.getCenter();
    });
    
    this.map.on(MapboxEvents.Click, (ev) => {
      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      console.log(ev.lngLat);
      console.log(`color aleatorio ${color}`);
      
      this.currentLngLat = ev.lngLat;
      this.addMarker(ev.lngLat, color);
    });
  }

  zoomIn(){
    if (this.zoomRange < 19) {
      this.map?.zoomIn();
    }
    
  }

  zoomOut(){
    if (this.zoomRange > -2 && this.zoomRange < 19) {
      this.map?.zoomOut();
    }
  }

  addMarker(lngLat: LngLat, color: string): void{
    if (!this.map) {
      console.error('El mapa no se cargo completo');
      return;
    }

    this.marker = new Marker({
      color: color,
      draggable: true,
    }).setLngLat(lngLat).addTo(this.map);
    
  }

  btnAddMarker(): void{
    if (!this.map) {
      console.error('El mapa no se cargo completo');
      return;
    }
    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();
    // this.map.on(MapboxEvents.Click, (ev) => {
    //   console.log(ev);
    //   // this.addMarker(this.currentLngLat, color);
    // });
  }
}