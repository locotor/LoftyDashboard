import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef
} from "@angular/core";
import User from "models/user/user.model";
import { Observable } from "rxjs/Observable";
import { AppContextService } from "commons/utilities/app-context.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild("trigger") customTrigger: TemplateRef<void>;
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  constructor(private _context: AppContextService) { }
  ngOnInit (): void {
    let adminDom: JQuery<HTMLElement> = $("#admin-id");
    let adminUser: User = new User(
      Number.parseInt(adminDom.data("user-id")),
      adminDom.data("user-account"),
      adminDom.data("user-type"),
      "",
      adminDom.data("user-name"),
      adminDom.data("user-email")
    );
    this._context.currentUser = adminUser;
  }
}
