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
        <div class="sent-msg-btn">
            <button nz-button nzType="primary" [disabled]="disabled" (click)="handleSubmit($event)">
                <span>发送</span>
            </button>
        </div>
    </div>
    `,
    styleUrls: ["./editor.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
    @Input() disabled: boolean;
    @Output() onOutput = new EventEmitter<string>();
    public editor;
    public editorContent;
    public editorOptions = {
        theme: "snow",
        placeholder: "立即回复，别让客户久等",
        modules: {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ "list": "ordered" }, { "list": "bullet" }],
            ]
        },
        readOnly: this.disabled
    };
    onEditorBlured (quill: any): void {
        // console.log("editor blur!", quill);
    }
    onEditorFocused (quill: any): void {
        // console.log("editor focus!", quill);
    }
    onEditorCreated (quill: any): void {
        this.editor = quill;
    }
    onContentChanged ({ quill, html, text }: any): void {
        // console.log("quill content is changed!", quill, html, text);
    }
    handleSubmit (event: MouseEvent): void {
        this.onOutput.emit(this.editorContent);
        this.editorContent = "";
        event.preventDefault();
    }
}