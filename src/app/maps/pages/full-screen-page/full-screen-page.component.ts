import { AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';

import { Map } from 'mapbox-gl';

// (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZ2Vyc29uZGV2eCIsImEiOiJjbDUzMjNkYmIwMXZqM3FtZnlzMnVqMndyIn0.zN5K7yybSQANGPcse6ZsNg';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit{
  
  @ViewChild('map') divMap?: ElementRef;
  ngAfterViewInit(): void {

    if (!this.divMap?.nativeElement) {
      return;
    }

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });    
  }
}

//  npm install -D @types/mapbox-gl