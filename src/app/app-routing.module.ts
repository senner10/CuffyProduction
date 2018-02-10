import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserLoginComponent } from './ui/user-login/user-login.component';
import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { AuthGuard } from './core/auth.guard';
import { AdminGuard } from './core/admin.guard';
import { CoreModule } from './core/core.module';
import { AdminComponent } from './admin/admin.component';
import { ClothingComponent } from './clothing/clothing.component';
import { EventComponent } from './event/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LocationComponent } from './location/location.component';
import { LocationsInputAdminComponent } from './admin/locations-admin/locations-input-admin/locations-input-admin.component';
import { LocationsListAdminComponent } from './admin/locations-admin/locations-list-admin/locations-list-admin.component';

const routes: Routes = [
  { path: '', component: ReadmePageComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
    { path: 'events', component: EventComponent,  canActivate: [AuthGuard] },
  { path: 'products', component: ClothingComponent,  canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent,  canActivate: [AuthGuard] },
  { path: 'locations', component: LocationComponent,  canActivate: [AuthGuard] },
  { path: 'admin', redirectTo: 'admin/events/create'},
  { path: 'admin/locations', component: AdminComponent},
  { path: 'admin/events/manage', component: AdminComponent},
  { path: 'admin/events/create', component: AdminComponent},
  { path: 'admin/users', component: AdminComponent},
  { path: 'admin/inventory/manage', component: AdminComponent},
  { path: 'admin/inventory/create', component: AdminComponent},
  { path: 'admin/locations/create', component: AdminComponent},
  { path: 'admin/locations/manage', component: AdminComponent},
  //all other admins gets directed to first
  { path: 'admin/*', redirectTo: 'admin/events/create'},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'account/settings', component: SettingsComponent, canActivate: [AuthGuard]},

  { path: '**', redirectTo: 'login' },

  // uploads are lazy loaded
  { path: 'uploads', loadChildren: './uploads/shared/upload.module#UploadModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
