import {
    Component,
    OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ThreadService } from '../../../models/thread/thread.service';
import Thread from '../../../models/thread/thread.model';

@Component({
    selector: 'chat-thread',
    templateUrl: "./chat-thread.component.html",
    styleUrls: ["./chat-thread.component.scss"]
})
export class ChatThreadComponent implements OnInit {
    threads: Observable<Thread[]>;
    currentTread: Thread;
    selected: boolean = false;
    constructor(public threadService: ThreadService) {
    }

    ngOnInit() {
        this.threads = this.threadService.orderedThreads;
        this.threadService.currentThread.subscribe((currentThread: Thread) => {
            this.selected = currentThread && this.currentTread && (currentThread.id === this.currentTread.id);
        });
    }

    onThreadClicked(thread: Thread, event: MouseEvent): void {
        this.threadService.setCurrentThread(thread);
        event.preventDefault();
    }
}