import { Injectable } from '@angular/core';
import { Observable } from "rxjs/observable"
import User from "../models/user/user.model";

@Injectable()
export class AppContextService {
    constructor() { }
    public currentUser:Observable<User>
}
