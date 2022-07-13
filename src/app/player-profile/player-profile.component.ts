import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../model/player.interface';
import { Stat } from '../model/stat.interface';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { StatApiService } from '../stat-api.service';



@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.css']
})
export class PlayerProfileComponent implements OnInit {

  stat: Stat | null = null;

  statList: Stat | null = null;

  stats: any=[];

  totalStats: any=[];

  teamsList:any=[];
  playersList:any=[];

  totalPoints:any = 0;
  totalRebounds:any = 0;
  totalAssists:any = 0;
  totalSteals:any = 0;
  totalBlocks:any = 0;

  averagePoints:any = 0;
  averageRebounds:any = 0;
  averageAssists:any = 0;
  averageSteals:any = 0;
  averageBlocks:any = 0;

  mostPoints: any = 0;
  mostRebounds: any = 0;
  mostAssists: any = 0;
  mostSteals: any = 0;
  mostBlocks: any = 0;

  //Map to display data associated with foreign keys
  teamsMap:Map<number, string> = new Map()
  playersMap:Map<number, string> = new Map()

  constructor(private route: ActivatedRoute, private service:StatApiService, private http: HttpClient) {
  }



  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      this.getStat(id);
    });

    this.refreshTeamMap();
    this.refreshPlayerMap();
  }

getStat(id: number | string){
  this.service.getPlayerStat(id).subscribe(statData => {
    this.stats = statData;
    this.stat = statData;
    this.stat = Object.entries(this.stat)[0][1];
    this.statList = statData;
    // console.log(Object.entries(this.stat)[0][1]);
    if(this.statList != null){
      for(let i = 0; i < this.stats.length; i++){
        this.totalPoints += this.stats[i].points;
        this.totalRebounds += this.stats[i].rebounds;
        this.totalAssists += this.stats[i].assists;
        this.totalSteals += this.stats[i].steals;
        this.totalBlocks += this.stats[i].blocks;

        if(this.mostPoints < this.stats[i].points){
          this.mostPoints = this.stats[i].points;
        }
        if(this.mostRebounds < this.stats[i].rebounds){
          this.mostRebounds = this.stats[i].rebounds;
        }
        if(this.mostAssists < this.stats[i].assists){
          this.mostAssists = this.stats[i].assists;
        }
        if(this.mostSteals < this.stats[i].steals){
          this.mostSteals = this.stats[i].steals;
        }
        if(this.mostBlocks < this.stats[i].blocks){
          this.mostBlocks = this.stats[i].blocks;
        }

      }
    }
    else{
      this.totalPoints = 69;
      this.totalRebounds = 69;
      this.totalAssists = 69;
      this.totalSteals = 69;
      this.totalBlocks = 69;
    }

    this.averagePoints += this.totalPoints/this.stats.length;
    this.averageRebounds += this.totalRebounds/this.stats.length;
    this.averageAssists += this.totalAssists/this.stats.length;
    this.averageSteals += this.totalSteals/this.stats.length;
    this.averageBlocks += this.totalBlocks/this.stats.length;
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
