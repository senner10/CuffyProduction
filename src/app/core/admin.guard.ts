import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { NotifyService } from './notify.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AdminGuard implements CanActivate {

	constructor(public afAuth: AngularFireAuth, private auth: AuthService, private router: Router, private notify: NotifyService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
//does not work currently come back to this
this.auth.user.subscribe(data=>{
	if (data){
		if (data.email == 'ahat91@aol.com') {
			return true
		}
	}

	return true;
});

return true;


  
  }
}
