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
        PersonalModule
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