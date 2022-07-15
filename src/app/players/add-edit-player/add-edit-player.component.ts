import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatApiService } from 'src/app/stat-api.service';

@Component({
  selector: 'app-add-edit-player',
  templateUrl: './add-edit-player.component.html',
  styleUrls: ['./add-edit-player.component.css']
})
export class AddEditPlayerComponent implements OnInit {

  statList$!: Observable<any[]>;
  playerList$!: Observable<any[]>;
  teamList$!: Observable<any[]>;

  constructor(private service:StatApiService) { }

  @Input() player:any;
  id: number = 0;
  playerName!: string;

  ngOnInit(): void {
    this.id = this.player.id;
    this.playerName = this.player.playName;
    this.statList$ = this.service.getStatList();
    this.playerList$ = this.service.getPlayersList();
    this.teamList$ = this.service.getTeamsList();
  }

  addPlayer(){
    var player = {
      id: this.id,
      playerName: this.playerName
    }
    this.service.addPlayers(player).subscribe(res =>{
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

  updatePlayer(){
    var player = {
      id: this.id,
      playerName: this.playerName
    }
    var id:number = this.id;
    this.service.updatePlayers(id,player).subscribe(res =>{
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
