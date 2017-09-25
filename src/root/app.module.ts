import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { AppContextService } from "./app-context.service";
import { WebBaseService } from "./web-base.service";
import { UserService } from "./user.service";

//area modules
import { PersonalModule } from "../areas/personal/personal.module";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        NgZorroAntdModule.forRoot(),
        PersonalModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AppContextService,
        WebBaseService,
        UserService
    ]
})
export class AppModule { }