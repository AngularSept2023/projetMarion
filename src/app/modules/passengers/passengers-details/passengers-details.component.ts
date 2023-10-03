import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from 'src/app/models/titanic-model';
import { PassengersService } from '../passengers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passengers-details',
  templateUrl: './passengers-details.component.html',
  styleUrls: ['./passengers-details.component.scss'],
  providers: [{ provide: PassengersService, useClass: PassengersService }],
})
export class PassengersDetailsComponent implements OnInit {
  passenger$: Observable<Passenger> | undefined;
  id!: number;
  constructor(
    public passengersService: PassengersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.passengersService.getPassenger(this.id);
    this.passenger$ = this.passengersService.passenger;
  }
}
