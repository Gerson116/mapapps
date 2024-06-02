import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
  
  @ViewChild('map') divMap?: ElementRef;
  map?: Map;
  currentLngLat: LngLat = new LngLat(-74.5, 40);
  zoomRange: number = 18;

  ngAfterViewInit(): void {

    if (!this.divMap?.nativeElement) {
      return;
    }

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-69.98346202767439, 18.472000777364997], // starting position [lng, lat]
      zoom: this.zoomRange, // starting zoom
    });
    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners(): void{
    if (!this.map) {
      throw 'El mapa no cargo';
    }

    this.map.on('zoom', (ev) => {
      this.zoomRange = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 19)  return;
      this.map?.zoomTo(18);
    });
    
    this.map.on('mousemove', ()=> {
      this.currentLngLat = this.map!.getCenter();
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
}