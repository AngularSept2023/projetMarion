import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/titanic-model';
import { TitanicService } from '../titanic.service';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss'],
})
export class StatistiquesComponent implements OnInit {
  passengers!: Passenger[];
  passengersFiltered!: Passenger[];
  sexFilter!: Passenger[];
  nameFilter!: Passenger[];
  ageFilter!: Passenger[];
  survivedFilter!: Passenger[];
  passengersTab!: MatTableDataSource<Passenger>;
  displayedColumns = ['Nom', 'Sexe', 'Âge', 'Survivant'];
  criteresForm!: FormGroup;

  constructor(private titanicService: TitanicService) {
    this.titanicService.getPassengers().subscribe((passengers) => {
      this.passengers = passengers;
      this.nameFilter = this.passengers;
      this.sexFilter = this.passengers;
      this.ageFilter = this.passengers;
      this.survivedFilter = this.passengers;
      this.passengersTab = new MatTableDataSource(passengers);
    });
  }

  ngOnInit(): void {
    this.initCriteresForm();
    this.handleSexCritere();
    this.handleAgeCritere();
    this.handleSurvivedCritere();
  }

  private initCriteresForm(): void {
    this.criteresForm = new FormGroup({
      sex: new FormControl('all', Validators.required),
      ageMin: new FormControl(0),
      ageMax: new FormControl(100),
      survived: new FormControl('all', Validators.required),
    });
  }

  private handleSexCritere(): void {
    this.criteresForm.controls['sex'].valueChanges.subscribe((value) => {
      switch (value) {
        case 'all':
          this.sexFilter = this.passengers;
          this.updateTable();
          break;
        case 'female':
          this.sexFilter = this.passengers.filter(
            (passenger) => passenger.Sex === 'female'
          );
          this.updateTable();
          break;
        case 'male':
          this.sexFilter = this.passengers.filter(
            (passenger) => passenger.Sex === 'male'
          );
          this.updateTable();
          break;
        default:
          this.sexFilter = this.passengers;
          this.updateTable();
          break;
      }
    });
  }

  private handleAgeCritere(): void {
    this.criteresForm.controls['ageMin'].valueChanges.subscribe((value) => {
      this.ageFilter = this.passengers.filter(
        (passenger) => passenger.Age && passenger.Age >= value
      );
      this.updateTable();
    });
    this.criteresForm.controls['ageMax'].valueChanges.subscribe((value) => {
      this.ageFilter = this.passengers.filter(
        (passenger) => passenger.Age && passenger.Age <= value
      );
      this.updateTable();
    });
  }

  private handleSurvivedCritere(): void {
    this.criteresForm.controls['survived'].valueChanges.subscribe((value) => {
      switch (value) {
        case 'all':
          this.survivedFilter = this.passengers;
          this.updateTable();
          break;
        case 'survivant':
          this.survivedFilter = this.passengers.filter(
            (passenger) => passenger.Survived === '1'
          );
          this.updateTable();
          break;
        case 'mort':
          this.survivedFilter = this.passengers.filter(
            (passenger) => passenger.Survived === '0'
          );
          this.updateTable();
          break;
        default:
          this.survivedFilter = this.passengers;
          this.updateTable();
          break;
      }
    });
  }

  private updateTable(): void {
    this.passengersFiltered = this.passengers?.filter(
      (passenger) =>
        this.sexFilter.includes(passenger) &&
        this.ageFilter.includes(passenger) &&
        this.survivedFilter.includes(passenger) &&
        this.nameFilter.includes(passenger)
    );
    this.passengersTab = new MatTableDataSource(this.passengersFiltered);
  }

  /**
   * Filtre le tableau par nom via la value d'un input
   * @param event
   */
  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nameFilter = this.passengers.filter((passenger) =>
      ((passenger.Name).toLowerCase()).includes(filterValue.trim().toLowerCase())
    );
    this.updateTable();
    // this.passengersTab.filter = filterValue.trim().toLowerCase();
    // if (this.passengersTab.paginator) {
    //   this.passengersTab.paginator.firstPage();
    // }
  }
}
