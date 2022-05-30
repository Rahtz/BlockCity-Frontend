import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatComponent } from './stat/stat.component';
import { TotalStatsComponent } from './total-stats/total-stats.component';
import { HomeComponent } from './home/home.component';
import { AverageStatsComponent } from './average-stats/average-stats.component';
import { PlayersComponent} from './players/players.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'stats', component: StatComponent },
  { path: 'TotalStats', component: TotalStatsComponent },
  { path: 'AverageStats', component: AverageStatsComponent},
  {
    path: 'players',
    children: [
      {
        path: '',
        component: PlayersComponent
      },
      {
        path: ':id',
        component: PlayerProfileComponent
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, StatComponent, TotalStatsComponent, AverageStatsComponent, PlayersComponent, PlayerProfileComponent]
