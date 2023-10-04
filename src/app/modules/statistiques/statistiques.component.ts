import { Component, OnInit, forwardRef } from '@angular/core';
import { Passenger } from 'src/app/models/titanic-model';
import { TitanicService } from '../titanic.service';
import {
  FormGroup,
  FormControl,
  Validators,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
})
export class StatistiquesComponent implements OnInit {
  passengers!: Passenger[];
  passengersFiltered!: Passenger[];
  passengersTab!: MatTableDataSource<Passenger>;
  displayedColumns = ['Nom', 'Sexe', 'Âge', 'Survivant'];
  criteresForm!: FormGroup;

  constructor(private titanicService: TitanicService) {
    this.titanicService.getPassengers().subscribe((passengers) => {
      this.passengers = passengers;
      this.passengersFiltered = passengers;
      this.passengersTab = new MatTableDataSource(passengers);
    });
  }

  ngOnInit(): void {
    this.initCriteresForm();
    this.handleSexCritere();
    this.handleAgeCritere();
    this.handleSurvivedCritere();
  }

  private initCriteresForm() {
    this.criteresForm = new FormGroup({
      sex: new FormControl('all', Validators.required),
      ageMin: new FormControl(0),
      ageMax: new FormControl(100),
      survived: new FormControl('all', Validators.required),
    });
  }

  private handleSexCritere() {
    this.criteresForm.controls['sex'].valueChanges.subscribe((value) => {
      switch (value) {
        case 'all':
          this.passengersFiltered = this.passengers;
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        case 'female':
          this.passengersFiltered = this.passengers.filter(
            (passenger) => passenger.Sex === 'female'
          );
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        case 'male':
          this.passengersFiltered = this.passengers.filter(
            (passenger) => passenger.Sex === 'male'
          );
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        default:
          this.passengersFiltered = this.passengers;
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
      }
      console.log(this.passengersFiltered);
    });
  }

  private handleAgeCritere() {
    this.criteresForm.controls['ageMin'].valueChanges.subscribe((value) => {
      this.passengersFiltered = this.passengers.filter(
        (passenger) => passenger.Age && passenger.Age >= value
      );
      this.passengersTab = new MatTableDataSource(this.passengersFiltered);
      console.log(this.passengersFiltered);
    });
    this.criteresForm.controls['ageMax'].valueChanges.subscribe((value) => {
      this.passengersFiltered = this.passengers.filter(
        (passenger) => passenger.Age && passenger.Age <= value
      );
      this.passengersTab = new MatTableDataSource(this.passengersFiltered);
      console.log(this.passengersFiltered);
    });
  }

  private handleSurvivedCritere() {
    this.criteresForm.controls['survived'].valueChanges.subscribe((value) => {
      switch (value) {
        case 'all':
          this.passengersFiltered = this.passengers;
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        case 'survivant':
          this.passengersFiltered = this.passengers.filter(
            (passenger) => passenger.Survived === '1'
          );
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        case 'mort':
          this.passengersFiltered = this.passengers.filter(
            (passenger) => passenger.Survived === '0'
          );
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
        default:
          this.passengersFiltered = this.passengers;
          this.passengersTab = new MatTableDataSource(this.passengersFiltered);
          break;
      }
      console.log(this.passengersFiltered);
    });
  }

  /**
   * Filtre le tableau par nom via la value d'un input
   * @param event
   */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.passengersTab.filter = filterValue.trim().toLowerCase();
    if (this.passengersTab.paginator) {
      this.passengersTab.paginator.firstPage();
    }
  }
}
