import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengersComponent } from './modules/passengers/passengers.component';
import { StatistiquesComponent } from './modules/statistiques/statistiques.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { PassengersDetailsComponent } from './modules/passengers/passengers-details/passengers-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/passengers', pathMatch: 'full' },
  {
    path: 'passengers',
    component: PassengersComponent,
    // children: [{ path: ':id', component: PassengersDetailsComponent }],
  },
  {
    path: 'passengers/:id',
    component: PassengersDetailsComponent,
  },
  {
    path: 'stats',
    component: StatistiquesComponent,
  },
  // {
  //   path: 'about',
  //   loadChildren: () =>
  //     import('./about/about.module').then((m) => m.AboutModule),
  // },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
