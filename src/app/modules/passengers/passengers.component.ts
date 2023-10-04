import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PassengersService } from './passengers.service';
import { MatSort } from '@angular/material/sort';
import { Passenger } from 'src/app/models/titanic-model';
import { MatPaginator } from '@angular/material/paginator';
import { TitanicService } from '../titanic.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [{ provide: PassengersService, useClass: PassengersService }],
})
export class PassengersComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns = ['Nom', 'Sexe', 'Âge', 'Survivant'];
  sortedData!: Passenger[];
  passengers!: Passenger[];
  passengersTab!: MatTableDataSource<Passenger>;

  constructor(
    public titanicService: TitanicService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.titanicService.getPassengers().subscribe((passengers) => {
      this.passengersTab = new MatTableDataSource(passengers);
      this.passengers = passengers;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.passengersTab?.data);
    this.passengersTab = new MatTableDataSource(this.passengers);
    this.passengersTab.paginator = this.paginator;
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {}
}
