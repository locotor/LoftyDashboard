
import { Component } from "@angular/core";
import { Observable } from 'rxjs/Observable';

interface AppState {
    todo: number;
}

@Component({
    template: `
		<button (click)="increment()">Increment</button>
		<div>Current Count: {{ todo | async }}</div>
		<button (click)="decrement()">Decrement</button>
		<button (click)="reset()">Reset Counter</button>
	`
})
export class MyAppComponent {
    todo: Observable<number>;

    constructor() {
        // this.todo = store.select<number>(;
    }

}