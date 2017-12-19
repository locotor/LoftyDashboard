import {
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { Observable } from "rxjs/Observable";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isCollapsed = true;
  ngOnInit (): void {
    let adminDom: HTMLElement = document.getElementById("admin-id");
    let admin: any;
    if (adminDom) {
      admin.id = adminDom.getAttribute("data-user-id");
    }
  }
}
