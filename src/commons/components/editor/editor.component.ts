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
            <button>发送</button>
        </div>
    </div>
    `,
    styleUrls: ["./editor.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
    public editor;
    public editorContent;
    public editorOptions = {
        theme: "snow",
        placeholder: "说点什么吧",
        modules: {
            toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ "list": "ordered" }, { "list": "bullet" }],
            ]
        }
    };
    @Output() onOutput = new EventEmitter<string>();
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
    onEnter (event: MouseEvent): void {
        this.onOutput.emit(this.editorContent);
        event.preventDefault();
    }
}