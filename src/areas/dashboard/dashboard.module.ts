import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MdListModule,
  MdToolbarModule,
  MdMenuModule,
  MdIconModule,
  MdButtonModule,
  MdInputModule,
  MdSnackBarModule,
  MdTabsModule,
  MdCardModule,
  MdGridListModule,
  MdTableModule
} from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ChartComponent } from './chart/chart.component';
import { MessageTableComponent } from './message-table/message-table.component';
import { DataTableComponent } from './data-table/data-table.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    MdListModule,
    MdToolbarModule,
    MdMenuModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdSnackBarModule,
    MdTabsModule,
    MdCardModule,
    MdGridListModule,
    MdTableModule,
    NgxChartsModule,
    NgxDatatableModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  declarations: [
    DashboardPageComponent,
    ChartComponent
    ,
    MessageTableComponent,
    DataTableComponent
  ]
})
export class DashboardModule { }