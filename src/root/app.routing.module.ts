import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'personal' },
  { path: "chat", loadChildren: "../areas/chat/chat.module#ChatModule" },
  { path: "message/:status", loadChildren: "../areas/message/message.module#MessageModule" }  ,
  { path: "dashboard", loadChildren: "../areas/dashboard/dashboard.module#DashboardModule" }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }