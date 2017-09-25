import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import User from "../models/user/user.model";
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from "@angular/material";
import { AppContextService } from "./app-context.service";
import { UserService } from "./user.service";
@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(
    private _appContext: AppContextService,
    private _userService: UserService,
    private _iconRegistry: MdIconRegistry,
    private _sanitizer: DomSanitizer,
  ) { }
  ngOnInit() {
    this._iconRegistry.addSvgIconSet(this._sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
    let adminId = document.getElementById("admin-id").getAttribute("data-user-id");
    console.log(adminId);
    // this._userService.GetUserInfoById(Number.parseInt(adminId)).subscribe(
    this._userService.GetUserInfoById(10002).subscribe(
      rspd => {
        this._userService.currentAdmin = <User>rspd;
        console.log("current user: ", this._userService.currentAdmin);
      },
      error => { console.error("error:", error) }
    )
  }
}
