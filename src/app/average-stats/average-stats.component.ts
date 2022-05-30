import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StatApiService } from 'src/app/stat-api.service';

@Component({
  selector: 'app-average-stats',
  templateUrl: './average-stats.component.html',
  styleUrls: ['./average-stats.component.css']
})
export class AverageStatsComponent implements OnInit {

  totalStatList$!:Observable<any[]>;
  averageStatList$!:Observable<any[]>;
  statList$!:Observable<any[]>;
  teamsList$!:Observable<any[]>;
  playersList$!:Observable<any[]>;
  teamsList:any=[];
  playersList:any=[];


  //Map to display data associated with foreign keys
  teamsMap:Map<number, string> = new Map()

  playersMap:Map<number, string> = new Map()

  displayedColumns = ['playerId', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'feildGoalsAttempted', 'feildGoalsMade',
  'customColumn1', 'threePointersAttempted', 'threePointerMade', 'customColumn2', 'freeThrowsAttempted', 'freeThrowsMade', 'customColumn3'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private service:StatApiService) { }

  ngOnInit(): void {
    this.totalStatList$ = this.service.getTotalStatList();
    this.averageStatList$ = this.service.getAverageStatList();
    this.statList$ = this.service.getStatList();
    this.teamsList$ = this.service.getTeamsList();
    this.refreshTeamMap();
    this.refreshPlayerMap();


    this.service.getAverageStatList().subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;


      //Determines what is being sorted on by default
      const sortState: Sort = {active: 'points', direction: 'desc'};
      this.matSort.active = sortState.active;
      this.matSort.direction = sortState.direction;
      this.matSort.sortChange.emit(sortState);
    })
  }

  refreshTeamMap(){
    this.service.getTeamsList().subscribe(data => {
      this.teamsList = data;
      for(let i =0; i < data.length; i++){
        this.teamsMap.set(this.teamsList[i].id, this.teamsList[i].teamName);
      }
    })
  }

  refreshPlayerMap(){
    this.service.getPlayersList().subscribe(data => {
      this.playersList = data;
      for(let i = 0; i < data.length; i++){
        this.playersMap.set(this.playersList[i].id, this.playersList[i].playerName);
      }
    })
  }

}
