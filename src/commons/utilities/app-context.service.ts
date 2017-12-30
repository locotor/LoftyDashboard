import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/observable";
import User from "models/user/user.model";

@Injectable()
export class AppContextService implements OnInit {
    constructor() {
        // todo
    }

    ngOnInit(): void {
        let jQuery: any = $;
        this.singlrService = jQuery.connection.LoftyHub;
        this.singlrService.connection.start();
    }

    public singlrService: any;
    public currentUser: User;
}
