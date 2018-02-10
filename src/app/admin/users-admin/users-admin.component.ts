import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent implements OnInit {

  constructor(public userService: UserService) { }

  users: Observable<any>;

  userArray = []

  ngOnInit() {

  	this.users = this.userService.getSnapshot();

  	this.users
  	.subscribe(data=>{
  		this.userArray = data;

  	});

  }

     deleteUser(user:any) {
    
    this.userService.delete(user.id);
  }

}
