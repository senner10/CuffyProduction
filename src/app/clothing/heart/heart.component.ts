import { Component, OnInit, Input } from '@angular/core';
import { HeartService } from '../../heart.service';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss']
})
export class HeartComponent implements OnInit {

	@Input() userId;
	@Input() itemId;

	hearts: Observable <any>;

  heartsArr: any;


  constructor(public snackBar: MatSnackBar, public heartService:HeartService) { }

  ngOnInit() {
  	this.hearts = this.heartService.getUserStars(this.userId, this.itemId);


    this.hearts.subscribe(data=>{

      this.heartsArr = data;
    })
  }

  starHandler(value){
  	console.log(value);
  	this.heartService.setStar(this.userId, this.itemId, value);
      if (value) {
        this.openSnackBar('Item Hearted','Thanks');
      } else{
        this.openSnackBar('Item Un-Hearted','Thanks');

      }
  }

    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }



}
