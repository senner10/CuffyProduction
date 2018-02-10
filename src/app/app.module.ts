import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


///// Start FireStarter

// Core
import { CoreModule } from './core/core.module';

// Shared/Widget
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { UploadModule } from './uploads/shared/upload.module';
import { UiModule } from './ui/shared/ui.module';
import { NotesModule } from './notes/notes.module';
///// End FireStarter

import { environment } from '../environments/environment';

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UploadService } from './uploads/shared/upload.service';
import { AdminComponent } from './admin/admin.component';
import { UserService } from './admin/users-admin/user.service';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import { LocationsAdminComponent } from './admin/locations-admin/locations-admin.component';


//Materials START
import { 
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, 
  MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, 
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule, 
} from '@angular/material'; 
import {CdkTableModule} from '@angular/cdk/table';
//Materials END 
//
//Calender App
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './calendar/calendar.component';
import { DemoUtilsModule } from './calendar/calendar-utils/module';


import { EventsListAdminComponent } from './admin/events-admin/events-list-admin/events-list-admin.component';
import { EventsInputAdminComponent } from './admin/events-admin/events-input-admin/events-input-admin.component';
import { MenuComponent } from './admin/menu/menu.component';
import { UsersAdminComponent } from './admin/users-admin/users-admin.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { InventoryInputComponent } from './admin/inventory-admin/inventory-input/inventory-input.component';
import { InventoryListComponent } from './admin/inventory-admin/inventory-list/inventory-list.component';
import { InventoryAdminService } from './admin/inventory-admin/inventory-admin.service';
import { ClothingComponent } from './clothing/clothing.component';
import { HeartService } from './heart.service';
import { HeartComponent } from './clothing/heart/heart.component';
import { EventComponent } from './event/event.component';
import { RsvpEventService } from './rsvp-event.service';
import { RsvpComponent } from './event/rsvp/rsvp.component';
import { EventService } from './event/event.service';
import { LocationComponent } from './location/location.component';

import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps';
import { LocationsInputAdminComponent } from './admin/locations-admin/locations-input-admin/locations-input-admin.component';
import { LocationsListAdminComponent } from './admin/locations-admin/locations-list-admin/locations-list-admin.component';
import { LocationsService } from './admin/locations-admin/locations.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    EventsAdminComponent,
    LocationsAdminComponent,
    EventsListAdminComponent,
    EventsInputAdminComponent,
    MenuComponent,
    UsersAdminComponent,
    AccountComponent,
    SettingsComponent,
    InventoryInputComponent,
    InventoryListComponent,
    ClothingComponent,
    HeartComponent,
    EventComponent,
    RsvpComponent,
    CalendarComponent,
    LocationComponent,
    LocationsInputAdminComponent,
    LocationsListAdminComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UiModule,
    NotesModule,
    AngularFireModule.initializeApp(firebaseConfig),
      AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    }),
    AngularFireDatabaseModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    DemoUtilsModule,
    HttpClientModule,
    //Angular Materials
    CdkTableModule, 
    MatAutocompleteModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatChipsModule, 
    MatStepperModule, 
    MatDatepickerModule, 
    MatDialogModule, 
    MatExpansionModule, 
    MatGridListModule, 
    MatIconModule, 
    MatInputModule, 
    MatListModule, 
    MatMenuModule, 
    MatNativeDateModule, 
    MatPaginatorModule, 
    MatProgressBarModule, 
    MatProgressSpinnerModule, 
    MatRadioModule, 
    MatRippleModule, 
    MatSelectModule, 
    MatSidenavModule, 
    MatSliderModule, 
    MatSlideToggleModule, 
    MatSnackBarModule, 
    MatSortModule, 
    MatTableModule, 
    MatTabsModule, 
    MatToolbarModule, 
    MatTooltipModule, 
    //END of Angular Materials
  ],
  providers:[
  UploadService,
  UserService,
  InventoryAdminService,
  HeartService,
  RsvpEventService,
  EventService,
  LocationsService
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
