import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChatPageComponent } from "areas/chat/chat-page/chat-page.component";
import { MessagePageComponent } from "areas/message/message-page/message-page.component";
import { RoomManagementComponent } from "areas/roomManagement/roomManagement.component";


const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "room" },
  { path: "chat", component: ChatPageComponent },
  { path: "message", component: MessagePageComponent },
  { path: "room", component: RoomManagementComponent }
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