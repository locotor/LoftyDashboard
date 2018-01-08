import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ChatPageComponent } from "areas/chat/chat-page/chat-page.component";
import { MessagePageComponent } from "areas/message/message-page/message-page.component";
import { RoomManagementComponent } from "areas/roomManagement/roomManagement.component";
import { OrderManagementComponent } from "areas/orderManagement/orderManagement.component";
import { RefundManagementComponent } from "areas/refundManagement/refundManagement.component";
import { RoomManagementResolver } from "areas/roomManagement/roomManagement.resolver.service";
import { OrderManagementResolver } from "areas/orderManagement/orderManagement.resolver.service";


const appRoutes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "room" },
  { path: "chat", component: ChatPageComponent },
  { path: "message", component: MessagePageComponent },
  {
    path: "room",
    component: RoomManagementComponent,
    resolve: {
      configsAndDistricts: RoomManagementResolver
    }
  },
  {
    path: "order",
    component: OrderManagementComponent,
    resolve: {
      rooms: OrderManagementResolver
    }
  },
  { path: "refund", component: RefundManagementComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    RoomManagementResolver,
    OrderManagementResolver
  ]
})
export class AppRoutingModule { }