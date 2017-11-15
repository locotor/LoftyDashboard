import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { DashboardPageComponent } from "./dashboard-page/dashboard-page.component";
import { ChartComponent } from "./chart/chart.component";

const dashboardRoutes: Routes = [
  {
    path: "",
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
    ChartComponent
  ]
})
export class DashboardModule { }