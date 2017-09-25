import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
} from '@angular/material';


const todoRoutes: Routes = [
    {
        path: 'todo',
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdListModule,
        MdToolbarModule,
        MdMenuModule,
        MdIconModule,
        MdButtonModule,
        MdInputModule,
        RouterModule.forChild(todoRoutes),
    ],
    declarations: [
    ]
})
export class TodoModule { }