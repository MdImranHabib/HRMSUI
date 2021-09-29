import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { FlatDetailsComponent } from './flat-details/flat-details.component';
import { FlatDetailFormComponent } from './flat-details/flat-detail-form/flat-detail-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ResidentDetailsComponent } from './resident-details/resident-details.component';
import { ResidentDetailFormComponent } from './resident-details/resident-detail-form/resident-detail-form.component';
import { RentDetailsComponent } from './rent-details/rent-details.component';
import { RentDetailFormComponent } from './rent-details/rent-detail-form/rent-detail-form.component';
import { ResidentFlatDetailsComponent } from './resident-flat-details/resident-flat-details.component';
import { ResidentFlatDetailFormComponent } from './resident-flat-details/resident-flat-detail-form/resident-flat-detail-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'flat-details', component: FlatDetailsComponent },
  { path: 'resident-details', component: ResidentDetailsComponent },
  { path: 'resident-flat-details', component: ResidentFlatDetailsComponent },
  { path: 'rent-details', component: RentDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FlatDetailsComponent,
    FlatDetailFormComponent,
    ResidentDetailsComponent,
    ResidentDetailFormComponent,
    RentDetailsComponent,
    RentDetailFormComponent,
    ResidentFlatDetailsComponent,
    ResidentFlatDetailFormComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
