import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation
} from "@angular/core";

@Component({
    selector: "editor",
    template: `
    <div class="editor-group">
        <quill-editor
            [(ngModel)]="this.editorContent"
            [options]="editorOptions"
            (blur)="onEditorBlured($event)"
            (focus)="onEditorFocused($event)"
            (ready)="onEditorCreated($event)"
            (change)="onContentChanged($event)">
        </quill-editor>
        <div class="sent-msg-btn" *ngIf="this.isEmitOnChange">
            <button nz-button nzType="primary" [disabled]="isReadOnly" (click)="handleSubmit($event)">
                <span>发送</span>
            </button>
        </div>
    </div>
    `,
    styleUrls: ["./editor.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
    @Input() isReadOnly: boolean;
    @Input() isEmitOnChange: boolean;
    @Input() placeholder: string;
    @Input() content: string;
    @Output() onOutput = new EventEmitter<string>();
    public editor;
    public editorContent: string = this.content || "";
    public editorOptions = {
        theme: "snow",
        placeholder: this.placeholder,
        modules: {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ "list": "ordered" }, { "list": "bullet" }],
            ]
        },
        readOnly: this.isReadOnly
    };
    onEditorBlured(quill: any): void {
        // console.log("editor blur!", quill);
    }
    onEditorFocused(quill: any): void {
        // console.log("editor focus!", quill);
    }
    onEditorCreated(quill: any): void {
        this.editor = quill;
    }
    onContentChanged({ quill, html, text }: any): void {
        console.log("quill content is changed!", quill, html, text);
        if (this.isEmitOnChange) {
            this.onOutput.emit(this.editorContent);
        }
    }
    handleSubmit(event: MouseEvent): void {
        this.onOutput.emit(this.editorContent);
        this.editorContent = "";
        event.preventDefault();
    }
}