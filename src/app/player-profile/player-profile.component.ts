import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { StatApiService } from '../stat-api.service';
import { HttpClient } from '@angular/common/http';
import { Player } from '../model/player.interface';
import { Stat } from '../model/stat.interface';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  totalStatList$!:Observable<any[]>;
  statList$!:Observable<any[]>;
  teamsList$!:Observable<any[]>;
  playersList$!:Observable<any[]>;
  playerStatsList$!: Observable<any[]>;
  teamsList:any=[];
  playersList:any=[];

  // playerData:any;

  private playerId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  player$: Observable<Player> = this.playerId$.pipe(
    switchMap((playerId: number) => this.service.findOne(playerId))
  )

  teamsMap:Map<number, string> = new Map()

  playersMap:Map<number, string> = new Map()

  displayedColumns = ['playerId', 'gamesPlayed', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'feildGoalsAttempted', 'feildGoalsMade',
  'customColumn1', 'threePointersAttempted', 'threePointerMade', 'customColumn2', 'freeThrowsAttempted', 'freeThrowsMade', 'customColumn3'];

  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  // private playerStatId$: Observable<number> = this.activatedRoute.params.pipe(
  //   map((params: Params) => parseInt(params['id']))
  // )

  // playerStat$: Observable<Stat> = this.playerStatId$.pipe(
  //   switchMap((playerStatId: number) => this.service.getPlayerStat(playerStatId))
  // )

  playerStats$: Observable<Stat> = this.playerId$.pipe(
    switchMap((playerId: number) => this.service.getPlayerStat(playerId))
  )

  constructor(private service:StatApiService, private http: HttpClient, private activatedRoute: ActivatedRoute) {

  }



  ngOnInit(): void {
    // this.service.getPlayerStat(1).subscribe((data)=>{
    //   this.playerData = data;
    // })
    this.totalStatList$ = this.service.getTotalStatList();
    this.statList$ = this.service.getStatList();
    this.teamsList$ = this.service.getTeamsList();
    // this.playerStatsList$ = this.service.getPlayerStat(1);
    this.refreshTeamMap();
    this.refreshPlayerMap();

    // this.service.getTotalStatList().subscribe((response:any) => {
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.matSort;
    //   console.log('response is ', response);
    // })


    // this.service.getStatList().subscribe((response:any) => {
    //   this.dataSource = new MatTableDataSource(response);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.matSort;
    //   console.log('response is ', response);
    // })

    this.service.getPlayerStat(1).subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      console.log('response is ', response);
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
