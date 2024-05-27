import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElementMenu } from './maps/constants/element-menu';

const routes: Routes = [
  {
    path: ElementMenu.Empty,
    loadChildren: () => import('./maps/map.module').then(m => m.MapModule),
  },
  {
    path: '**',
    redirectTo: 'maps'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
