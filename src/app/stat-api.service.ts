import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Player } from 'src/app/model/player.interface';
import { Stat } from 'src/app/model/stat.interface';

@Injectable({
  providedIn: 'root'
})
export class StatApiService {

<<<<<<< HEAD
  // readonly statAPIUrl = "https://localhost:7021/api";
=======
>>>>>>> d1ea6ad7601f8ef173ddb92e078b48063b5882e7
  readonly statAPIUrl = "https://blockcity.herokuapp.com/api";

  constructor(private http:HttpClient) { }

  getStatList(): Observable<any[]> {
    return this.http.get<any>(this.statAPIUrl + '/Stats');
  }

  getPlayerStat(id: number|string){
    return this.http.get<Stat>(this.statAPIUrl + `/Stats/${id}`);
  }

  addStat(data:any){
    return this.http.post(this.statAPIUrl + '/Stats', data);
  }

  updateStat(id:number|string, data:any){
    return this.http.put(this.statAPIUrl + `/Stats/${id}`, data);
  }

  deleteStat(id:number|string){
    return this.http.delete(this.statAPIUrl + `/Stats/${id}`);
  }

  //Teams
  getTeamsList(): Observable<any[]> {
    return this.http.get<any>(this.statAPIUrl + '/Teams');
  }

  addTeams(data:any){
    return this.http.post(this.statAPIUrl + '/Teams', data);
  }

  updateTeams(id:number|string, data:any){
    return this.http.put(this.statAPIUrl + `/Teams/${id}`, data);
  }

  deleteTeams(id:number|string){
    return this.http.delete(this.statAPIUrl + `/Teams/${id}`);
  }

  //Players
  getPlayersList(): Observable<any[]> {
    return this.http.get<any>(this.statAPIUrl + '/Players');
  }

  getPlayer(id: number): Observable<any[]> {
    return this.http.get<any>(this.statAPIUrl + '/Players/${id}');
  }

  addPlayers(data:any){
    return this.http.post(this.statAPIUrl + '/Players', data);
  }

  updatePlayers(id:number|string, data:any){
    return this.http.put(this.statAPIUrl + `/Players/${id}`, data);
  }

  deletePlayers(id:number|string){
    return this.http.delete(this.statAPIUrl + `/Players/${id}`);
  }

  //TotalStats
  getTotalStatList(): Observable<any[]> {
    return this.http.get<any>(this.statAPIUrl + '/TotalStats');
  }

  getAverageStatList(): Observable<any[]>{
    return this.http.get<any>(this.statAPIUrl + '/AverageStats');
  }

  getPlayers1(id: number){
    return this.http.get(this.statAPIUrl + '/Players/${id}');
  }

  findOne(id: number): Observable<Player> {
    return this.http.get(this.statAPIUrl + `/Players/` + id).pipe(
      map((user:Player) => user)
    )
  }

  // getPlayerStat(id: number): Observable<Stat> {
  //   return this.http.get(this.statAPIUrl + `/Players/` + id).pipe(
  //     map((user:Stat) => user)
  //   )
  // }



  // getPlayerStat(id: number): Observable<any[]> {
  //   return this.http.get<any>(this.statAPIUrl + '/Players/${id}');
  // }

}

