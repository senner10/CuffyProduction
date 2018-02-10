import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsAdminComponent } from './locations-admin.component';

describe('LocationsAdminComponent', () => {
  let component: LocationsAdminComponent;
  let fixture: ComponentFixture<LocationsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
