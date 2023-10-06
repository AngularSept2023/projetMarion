import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PassengersComponent } from './modules/passengers/passengers.component';
import { StatistiquesComponent } from './modules/statistiques/statistiques.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { PassengersDetailsComponent } from './modules/passengers/passengers-details/passengers-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/authentification/login/login.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    PassengersComponent,
    StatistiquesComponent,
    PageNotFoundComponent,
    PassengersDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatRadioModule,
    MatSliderModule,
    LoginComponent,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
