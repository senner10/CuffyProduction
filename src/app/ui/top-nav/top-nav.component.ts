import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {

  show = false;
  @Output() sideNavTrigger = new EventEmitter;

  toggleCollapse() {
   this.sideNavTrigger.emit();
  }


}
