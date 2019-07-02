import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _autService:AuthService,
    private router:Router
    ){

  }
  canActivate():  boolean  {
    
    if( this._autService.isLogin()){
      return true;
    }    
    else{
      this.router.navigateByUrl('/lobin')
      return false;
    }
  }
  
}
