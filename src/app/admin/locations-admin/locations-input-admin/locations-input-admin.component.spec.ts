import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsInputAdminComponent } from './locations-input-admin.component';

describe('LocationsInputAdminComponent', () => {
  let component: LocationsInputAdminComponent;
  let fixture: ComponentFixture<LocationsInputAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsInputAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsInputAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
