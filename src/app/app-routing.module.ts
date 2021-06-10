import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JoinComponent} from './components/join/join.component';
import {RecordingsComponent} from './components/recordings/recordings.component';
import {ScheduleComponent} from './components/schedule/schedule.component';

const routes: Routes = [
  {path: '', component: JoinComponent},
  {path: 'recording', component: RecordingsComponent},
  {path: 'schedule', component: ScheduleComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
