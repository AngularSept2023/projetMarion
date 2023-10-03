import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PassengersService } from './passengers.service';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Passenger } from 'src/app/models/titanic-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [{ provide: PassengersService, useClass: PassengersService }],
})
export class PassengersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Nom', 'Sexe', 'Âge', 'Survivant'];
  sortedData!: Passenger[];
  passengersTab!: MatTableDataSource<Passenger>;

  constructor(
    public passengersService: PassengersService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.passengersService.getPassengers();
    this.passengersTab = new MatTableDataSource(
      this.passengersService.passengers
    );
    this.sortedData = this.passengersService.passengers;
  }
  ngAfterViewInit() {
    this.passengersTab.paginator = this.paginator;
    this.passengersTab.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.passengersService.passengers;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.Name, b.Name, isAsc);
        case 'age':
          return compare(a.Age, b.Age, isAsc);
        case 'sex':
          return compare(a.Sex, b.Sex, isAsc);
        case 'survived':
          return compare(a.Survived, b.Survived, isAsc);
        default:
          return 0;
      }
    });

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  ngOnDestroy(): void {}
}
