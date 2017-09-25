import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal.component';
import {
    MdInputModule,
    MdIconModule,
    MdButtonModule
} from '@angular/material';

const personalRoutes: Routes = [
    {
        path: "personal",
        component: PersonalComponent
    },
];
@NgModule({
    imports: [
        MdInputModule,
        MdIconModule,
        MdButtonModule,
        CommonModule,
        RouterModule.forChild(personalRoutes)
    ],
    declarations: [
        PersonalComponent
    ]
})
export class PersonalModule { }