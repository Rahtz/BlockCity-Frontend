import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StatApiService } from 'src/app/stat-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { Stat } from 'src/app/model/stat.interface';

@Component({
  selector: 'app-show-stat',
  templateUrl: './show-stat.component.html',
  styleUrls: ['./show-stat.component.css']
})
export class ShowStatComponent implements OnInit {
  @Input() itemData: Stat | null = null;

  statList$!:Observable<any[]>;
  teamsList$!:Observable<any[]>;
  playersList$!:Observable<any[]>;
  teamsList:any=[];
  playersList:any=[];
  dataSource!:MatTableDataSource<any>;

  //Map to display data associated with foreign keys
  teamsMap:Map<number, string> = new Map()
  playersMap:Map<number, string> = new Map()




  displayedColumns = ['playerId', 'teamId', 'yourDate', 'points', 'rebounds', 'assists', 'steals', 'blocks', 'feildGoalsAttempted', 'feildGoalsMade',
  'customColumn1', 'threePointersAttempted', 'threePointerMade', 'customColumn2', 'freeThrowsAttempted', 'freeThrowsMade', 'customColumn3','customColumn4'];




  @ViewChild('paginator') paginator! : MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;




  constructor(private service:StatApiService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.statList$ = this.service.getStatList();
    this.teamsList$ = this.service.getTeamsList();
    this.refreshTeamMap();
    this.refreshPlayerMap();

    this.service.getStatList().subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;


//Determines what is being sorted on by default
      const sortState: Sort = {active: 'yourDate', direction: 'desc'};
      this.matSort.active = sortState.active;
      this.matSort.direction = sortState.direction;
      this.matSort.sortChange.emit(sortState);
    })
  }

  //Variables (properties)
  modalTitle:string ='';
  activateAddEditStatComponent:boolean = false;
  stat:any;

  modalAdd(){
    this.stat = {
     id:0,
     playerId:null,
     teamId:null,
     YourDate:null,
     points:null,
     rebounds:null,
     assists:null,
     steals:null,
     blocks:null,
     FeildGoalsAttempted:null,
     FeildGoalsMade:null,
     ThreePointersAttempted:null,
     ThreePointerMade:null,
     FreeThrowsAttempted:null,
     FreeThrowsMade:null
    }
    this.modalTitle = "Add Stat";
    this.activateAddEditStatComponent = true;
  }

  modalEdit(item:any) {
    this.stat = item;
    this.modalTitle = "Edit Stat";
    this.activateAddEditStatComponent = true;
  }

  delete(item:any){
    if(confirm(`Are you sure you want to delete stat ${item.id}`)){
      this.service.deleteStat(item.id).subscribe(res =>{
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
        this.statList$ = this.service.getStatList();
      })
    }
  }

  modalClose(){
    this.activateAddEditStatComponent = false;
    this.statList$ = this.service.getStatList();
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
