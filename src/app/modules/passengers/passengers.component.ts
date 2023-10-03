import {
  AfterViewInit,
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
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [{ provide: PassengersService, useClass: PassengersService }],
})
export class PassengersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  displayedColumns = ['Nom', 'Sexe', 'Âge', 'Survivant'];
  sortedData!: Passenger[];
  passengers!: Passenger[];
  passengersTab!: MatTableDataSource<Passenger>;
  isInit = false;

  constructor(public titanicService: TitanicService) {
    this.titanicService.getPassengers().subscribe((passengers) => {
      this.passengersTab = new MatTableDataSource(passengers);
      console.log(this.passengersTab.data);
    });
  }

  ngOnInit(): void {
    this.isInit = true;
  }

  ngAfterViewInit() {
    if (this.passengersTab.data.length) {
      console.log(this.passengersTab.data);
      this.passengersTab.paginator = this.paginator;
      this.passengersTab.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.passengersTab.filter = filterValue.trim().toLowerCase();
    if (this.passengersTab.paginator) {
      this.passengersTab.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {}
}
