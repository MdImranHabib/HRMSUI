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

@NgModule({
  declarations: [
    AppComponent,
    FlatDetailsComponent,
    FlatDetailFormComponent,
    ResidentDetailsComponent,
    ResidentDetailFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
