import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { ElementMenu } from './constants/element-menu';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      {
        path: ElementMenu.Main,
        component: FullScreenPageComponent
      },
      {
        path: ElementMenu.Markers,
        component: MarkersPageComponent
      },
      {
        path: ElementMenu.Properties,
        component: PropertiesPageComponent
      },
      {
        path: ElementMenu.ZoomRange,
        component: ZoomRangePageComponent
      },
      {
        path: '**',
        redirectTo: 'main'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
