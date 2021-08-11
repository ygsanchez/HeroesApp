import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const route:Routes =[
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'heroes',
    loadChildren:()=>import('./heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path:'404',
    component: ErrorPageComponent
  },
  {
    path:'**',
    //component: ErrorPageComponent
    redirectTo:'404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(route)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
