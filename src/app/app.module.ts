import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StatComponent } from './stat/stat.component';
import { ShowStatComponent } from './stat/show-stat/show-stat.component';
import { AddEditStatComponent } from './stat/add-edit-stat/add-edit-stat.component';
import { StatApiService } from './stat-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MatTableModule } from '@angular/material/table';
import { AverageStatsComponent } from './average-stats/average-stats.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PlayersComponent } from './players/players.component';
import { PlayerProfileComponent } from './player-profile/player-profile.component';
import {MatCardModule} from '@angular/material/card';
import { OrderByPipe } from './orderby.pipe';
import { MatTabsModule } from '@angular/material/tabs';
import { RecordsComponent } from './records/records.component'; 


@NgModule({
  declarations: [
    AppComponent,
    StatComponent,
    ShowStatComponent,
    AddEditStatComponent,
    routingComponents,
    HomeComponent,
    AverageStatsComponent,
    PlayersComponent,
    PlayerProfileComponent,
    OrderByPipe,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [StatApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
