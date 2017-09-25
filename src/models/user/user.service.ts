import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import User from './user.model';

@Injectable()
export class UserService {
    currentUser: Subject<User> = new BehaviorSubject<User>(null);

    public setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }
}