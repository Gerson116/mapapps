import { Component, OnInit } from '@angular/core';
import { House } from '../../interfaces/house';
import { LngLat } from 'mapbox-gl';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent implements OnInit {
  houses: House[] = [
    {
      title: 'Casa residencial, Canadá',
      description: 'Bella propiedad en Katana, Canadá',
      lngLat: new LngLat(-75.92722289474008, 45.280015511264466),
    },
    {
      title: 'Casa de playa, México',
      description: 'Hermosa casa de playa en Acapulco, México',
      lngLat: new LngLat(-99.91287720907991, 16.828940930185748),
    },
    {
      title: 'Apartamento, Argentina',
      description:
        'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: new LngLat(-58.430166677283445, -34.57150108832866),
    },
    {
      title: 'Local comercial, España',
      description:
        'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: new LngLat(-3.7112735618380177, 40.42567285425766),
    },
  ];

  ngOnInit(): void {}

  presentProperties(): void {
    //...
  }
}
