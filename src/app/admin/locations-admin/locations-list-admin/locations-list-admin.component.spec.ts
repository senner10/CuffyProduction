import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsListAdminComponent } from './locations-list-admin.component';

describe('LocationsListAdminComponent', () => {
  let component: LocationsListAdminComponent;
  let fixture: ComponentFixture<LocationsListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
