import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonalComponent } from "./personal.component";
import { NgZorroAntdModule } from "ng-zorro-antd";

const personalRoutes: Routes = [
    {
        path: "personal",
        component: PersonalComponent
    },
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(personalRoutes),
        NgZorroAntdModule
    ],
    declarations: [
        PersonalComponent
    ]
})
export class PersonalModule { }