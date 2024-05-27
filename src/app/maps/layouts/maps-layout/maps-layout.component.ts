import { Component } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { ElementMenu } from '../../constants/element-menu';

@Component({
  // selector: 'app-maps-layout',
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css'
})
export class MapsLayoutComponent {
  listMenu: Array<Menu> = [
    { name: "Main", value: ElementMenu.Main },
    { name: "Markers", value: ElementMenu.Markers },
    { name: "Properties", value: ElementMenu.Properties },
    { name: "Zoom Range", value: ElementMenu.ZoomRange },
  ];
}
