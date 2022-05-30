import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatApiService } from 'src/app/stat-api.service';

@Component({
  selector: 'app-add-edit-stat',
  templateUrl: './add-edit-stat.component.html',
  styleUrls: ['./add-edit-stat.component.css']
})
export class AddEditStatComponent implements OnInit {

  statList$!: Observable<any[]>;
  playerList$!: Observable<any[]>;
  teamList$!: Observable<any[]>;

  constructor(private service:StatApiService) { }

  @Input() stat:any;
  id: number = 0;
  playerId!: number;
  teamId!: number;
  yourDate: Date = new Date();
  points: number = 0;
  rebounds: number = 0;
  assists: number = 0;
  steals: number = 0;
  blocks: number = 0;
  FeildGoalsAttempted: number = 0;
  FeildGoalsMade: number = 0;
  ThreePointersAttempted: number = 0;
  ThreePointerMade: number = 0;
  FreeThrowsAttempted: number = 0;
  FreeThrowsMade: number = 0;

  ngOnInit(): void {
    this.id = this.stat.id;
    this.playerId = this.stat.playerId;
    this.teamId = this.stat.teamId;
    this.yourDate = this.stat.yourDate;
    this.points = this.stat.points;
    this.rebounds = this.stat.rebounds;
    this.assists = this.stat.assists;
    this.steals = this.stat.steals;
    this.blocks = this.stat.blocks;
    this.FeildGoalsAttempted = this.stat.feildGoalsAttempted;
    this.FeildGoalsMade = this.stat.feildGoalsMade;
    this.ThreePointersAttempted = this.stat.threePointersAttempted;
    this.ThreePointerMade = this.stat.threePointerMade;
    this.FreeThrowsAttempted = this.stat.freeThrowsAttempted;
    this.FreeThrowsMade = this.stat.freeThrowsMade;
    this.statList$ = this.service.getStatList();
    this.playerList$ = this.service.getPlayersList();
    this.teamList$ = this.service.getTeamsList();

  }

  addStat(){
    var stat = {
      playerId: this.playerId,
      teamId: this.teamId,
      yourDate: this.yourDate,
      points:this.points,
      rebounds:this.rebounds,
      assists:this.assists,
      steals:this.steals,
      blocks:this.blocks,
      FeildGoalsAttempted:this.FeildGoalsAttempted,
      FeildGoalsMade:this.FeildGoalsMade,
      ThreePointersAttempted:this.ThreePointersAttempted,
      ThreePointerMade:this.ThreePointerMade,
      FreeThrowsAttempted:this.FreeThrowsAttempted,
      FreeThrowsMade:this.FreeThrowsMade
    }
    this.service.addStat(stat).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);

    })
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  updateStat(){
    var stat = {
      id:this.id,
      playerId: this.playerId,
      teamId: this.teamId,
      yourDate: this.yourDate,
      points:this.points,
      rebounds:this.rebounds,
      assists:this.assists,
      steals:this.steals,
      blocks:this.blocks,
      FeildGoalsAttempted:this.FeildGoalsAttempted,
      FeildGoalsMade:this.FeildGoalsMade,
      ThreePointersAttempted:this.ThreePointersAttempted,
      ThreePointerMade:this.ThreePointerMade,
      FreeThrowsAttempted:this.FreeThrowsAttempted,
      FreeThrowsMade:this.FreeThrowsMade
    }
    var id:number = this.id;
    this.service.updateStat(id,stat).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);

    })
  }

}
