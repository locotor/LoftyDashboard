import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { ChartComponent } from './chart/chart.component';
// import { MessageTableComponent } from './message-table/message-table.component';
// import { DataTableComponent } from './data-table/data-table.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardPageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  declarations: [
    DashboardPageComponent,
    ChartComponent,
    // MessageTableComponent,
    // DataTableComponent
  ]
})
export class DashboardModule { }