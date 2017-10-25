import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Observable } from "rxjs/Observable";
import User from "../models/user/user.model";
@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  constructor(
    // private _appContext: AppContextService,
    // private _userService: UserService,
  ) { }
  ngOnInit() {
    let adminDom = document.getElementById("admin-id")
    let admin;
    if (adminDom) {
      admin.id = adminDom.getAttribute("data-user-id");
    }
    // this._userService.GetUserInfoById(10002).subscribe(
    //   rspd => {
    //     this._userService.currentAdmin = <User>rspd;
    //     console.log("current user: ", this._userService.currentAdmin);
    //   },
    //   error => { console.error("error:", error) }
    // )
  }
}
