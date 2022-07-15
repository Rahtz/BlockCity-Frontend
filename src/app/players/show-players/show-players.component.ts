import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Player } from 'src/app/model/player.interface';
import { StatApiService } from 'src/app/stat-api.service';

@Component({
  selector: 'app-show-players',
  templateUrl: './show-players.component.html',
  styleUrls: ['./show-players.component.css']
})
export class ShowPlayersComponent implements OnInit {
  @Input() itemData: Player | null = null;

  teamsList$!:Observable<any[]>;
  playersList$!:Observable<any[]>;
  teamsList:any=[];
  playersList:any=[];
  dataSource!:MatTableDataSource<any>;

  //Map to display data associated with foreign keys
  teamsMap:Map<number, string> = new Map()
  playersMap:Map<number, string> = new Map()




  displayedColumns = ['id', 'playerName', 'customColumn4'];




  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private service:StatApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.playersList$ = this.service.getPlayersList();
    this.teamsList$ = this.service.getTeamsList();
    this.refreshTeamMap();
    this.refreshPlayerMap();

    this.service.getPlayersList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;

      const sortState: Sort = {active: 'yourDate', direction: 'desc'};
      this.matSort.active = sortState.active;
      this.matSort.direction = sortState.direction;
      this.matSort.sortChange.emit(sortState);
    })
  }

  //Variables (properties)
  modalTitle:string ='';
  activateAddEditPlayerComponent:boolean = false;
  player:any;

  modalAdd(){
    this.player={
      playerName:null
    }
    this.modalTitle = "Add Player";
    this.activateAddEditPlayerComponent = true;
  }

  modalEdit(item:any){
    this.player = item;
    this.modalTitle = "Edit Stat";
    this.activateAddEditPlayerComponent = true;
  }

  delete(item:any){
    if(confirm(`Are you sure you want to delete stat ${item.id}`)){
      this.service.deletePlayers(item.id).subscribe(res =>{
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if(closeModalBtn) {
          closeModalBtn.click();
        }

        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "block";
        }
        setTimeout(function() {
          if(showDeleteSuccess) {
            showDeleteSuccess.style.display = "none"
          }
        }, 4000);
        this.playersList$ = this.service.getPlayersList();
      })
    }
  }

  modalClose(){
    this.activateAddEditPlayerComponent = false;
    this.playersList$ = this.service.getPlayersList();
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

  navigateToProfile(id: number){
    this.router.navigateByUrl(`/players/${id}`);
    console.log("This is working");
  }

  reloadCurrentPage() {
    window.location.reload();
  }

}
