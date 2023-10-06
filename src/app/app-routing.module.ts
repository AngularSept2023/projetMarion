import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from './modules/passengers/passengers.component';
import { StatistiquesComponent } from './modules/statistiques/statistiques.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PassengersDetailsComponent } from './modules/passengers/passengers-details/passengers-details.component';
import { passengerDetailResolver } from './modules/passengers/passengers-details/passengers-details.resolver';
import { InscriptionComponent } from './modules/authentification/inscription/inscription.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthentificationGuard } from './modules/authentification/authentification.guard';

const routes: Routes = [
  { path: '', redirectTo: '/passengers', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'passengers',
    component: PassengersComponent,
    // canActivate: [AuthentificationGuard],
    // canDeactivate: [checkoutGuard],
  },
  {
    path: 'passengers/:id',
    component: PassengersDetailsComponent,
    resolve: {
      product: passengerDetailResolver,
    },
    // canActivate: [AuthentificationGuard],
    // canDeactivate: [checkoutGuard],
  },
  {
    path: 'stats',
    component: StatistiquesComponent,
    // canActivate: [AuthentificationGuard],
    // canDeactivate: [checkoutGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
