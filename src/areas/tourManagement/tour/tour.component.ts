import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { FormGroup, FormControl, AbstractControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";

import { TourManagementService } from "../tourManagement.service";
import { TourGroup } from "models/tour/tourGroup.model";
import { Tour } from "models/tour/tour.model";
import { TranspotCost } from "models/tour/transportCost.model";

@Component({
  templateUrl: "./orderManagement.component.html",
  styleUrls: ["./orderManagement.component.scss"]
})
export class TourComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _apiService: TourManagementService,
    private _message: NzMessageService
  ) { }

  ngOnInit (): void {
    throw new Error("Method not implemented.");
  }
}
