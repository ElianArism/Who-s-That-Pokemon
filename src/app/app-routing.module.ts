import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayGuard } from './guard/play.guard';

const routes: Routes = [{
  pathMatch: 'full', 
  path: '', 
  redirectTo: '/home'
}, 
{
  path: 'home', 
  loadChildren: () => import('./pages/home/home-module.module').then(m => m.HomeModuleModule)
}, 
{
  path: 'play', 
  loadChildren: () => import('./pages/play/play.module').then(m => m.PlayModule), 
  canLoad: [PlayGuard],
}, 
{
  path: 'scores', 
  loadChildren: () => import('./pages/scores/scores.module').then(m => m.ScoresModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
