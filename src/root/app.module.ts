import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgZorroAntdModule } from "ng-zorro-antd";


import { AppRoutingModule } from "./app.routing.module";
import { AppComponent } from "./app.component";
import { UserService } from "./user.service";

// 基类
import { AppContextService } from "commons/utilities/app-context.service";
import { WebBaseService } from "commons/base/web-base.service";
// area modulesl
import { ChatModule } from "areas/chat/chat.module";
import { MessageModule } from "areas/message/message.module";
import { PersonalModule } from "areas/personal/personal.module";
import { RoomManagementModule } from "areas/roomManagement/roomManagement.module";
import { OrderManagementModule } from "areas/orderManagement/orderManagement.module";
import { RefundManagementModule } from "areas/refundManagement/refundManagement.module";
import { TourManagementModule } from "areas/tourManagement/tourManagement.module";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        NgZorroAntdModule.forRoot(),
        AppRoutingModule,
        // project Module
        ChatModule,
        MessageModule,
        PersonalModule,
        RoomManagementModule,
        OrderManagementModule,
        RefundManagementModule,
        TourManagementModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AppContextService,
        WebBaseService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }