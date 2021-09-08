import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicies/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authservice:AuthService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      console.log('Boqueado por - canActivate')
     
     /* if(this.authservice.auth.id)
      {
        return true;
      }
      console.log('Boqueado por - canActivate')
    return false;*/
    return this.authservice.verificaAutenticacion().pipe(
      tap(estaAutenticado => {
        if(!estaAutenticado)
        {
          this.router.navigate(['./auth/login'])
        }
      })
    );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean>  | boolean  {
      console.log('canload', true);
      console.log(route);
      console.log(segments);
      console.log('Boqueado por - canLoad')
   
    /*  if(this.authservice.auth.id)
      {
        return true;
      }
      console.log('Boqueado por - canLoad')
    return false;*/
    return this.authservice.verificaAutenticacion().pipe(
      tap(estaAutenticado => {
        if(!estaAutenticado)
        {
          this.router.navigate(['./auth/login'])
        }
      })
    );
  }
}
