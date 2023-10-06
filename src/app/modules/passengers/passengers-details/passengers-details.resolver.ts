import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { PassengersService } from '../passengers.service';
import { Passenger } from "src/app/models/titanic-model";
import { TitanicService } from "../../titanic.service";


export const passengerDetailResolver: ResolveFn<Passenger[]> = (route: ActivatedRouteSnapshot) => {
  const passengersService = inject(TitanicService);
  const id = Number(route.paramMap.get('id'));
  return passengersService.getPassenger(id);
}