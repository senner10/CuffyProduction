import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  path:string;

  ngOnInit() {
  	this.path = this.route.snapshot.url.join('/');
  }

}
