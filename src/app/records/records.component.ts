import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatApiService } from '../stat-api.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  stats: any=[];

  teamsList:any=[];
  playersList:any=[];

  recordPoints: any = 0;
  recordRebounds: any = 0;
  recordAssists: any = 0;
  recordSteals: any = 0;
  recordBlocks: any = 0;
  record3pm: any = 0;

  pointsPerson: any = '';
  reboundsPerson: any = '';
  assistsPerson: any = '';
  stealsPerson: any = '';
  blocksPerson: any = '';
  tpmPerson: any = '';

  //Map to display data associated with foreign keys
  teamsMap:Map<number, string> = new Map()
  playersMap:Map<number, string> = new Map()

  constructor(private route: ActivatedRoute, private service:StatApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getStat();

    this.refreshTeamMap();
    this.refreshPlayerMap();
  }

getStat(){
  this.service.getStatList().subscribe(statData => {
    this.stats = statData;

    if(this.stats != null){
      for(let i = 0; i < this.stats.length; i++){
        if(this.recordPoints < this.stats[i].points){
          this.recordPoints = this.stats[i].points;
          this.pointsPerson = this.stats[i].playerId;
        }
        if(this.recordRebounds < this.stats[i].rebounds){
          this.recordRebounds = this.stats[i].rebounds;
          this.reboundsPerson = this.stats[i].playerId;
        }
        if(this.recordAssists < this.stats[i].assists){
          this.recordAssists = this.stats[i].assists;
          this.assistsPerson = this.stats[i].playerId;
        }
        if(this.recordSteals < this.stats[i].steals){
          this.recordSteals = this.stats[i].steals;
          this.stealsPerson = this.stats[i].playerId;
        }
        if(this.recordBlocks < this.stats[i].blocks){
          this.recordBlocks = this.stats[i].blocks;
          this.blocksPerson = this.stats[i].playerId;
        }
        if(this.record3pm < this.stats[i].threePointerMade){
          this.record3pm = this.stats[i].threePointerMade;
          this.tpmPerson = this.stats[i].playerId;
        }
      }
    }


    });
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
