import { Component, Input, Output, EventEmitter,ViewEncapsulation } from "@angular/core"

@Component({
    selector: "editor",
    template: `
    <div class="editor-group">
        <quill-editor [(ngModel)]="this.editorContent" [options]="editorOptions" (blur)="onEditorBlured($event)" (focus)="onEditorFocused($event)" (ready)="onEditorCreated($event)" (change)="onContentChanged($event)"></quill-editor>
        <div class="sent-msg-btn">
            <button md-fab (click)="onEnter($event)">发送</button>
        </div>
    </div>
    `,
    styleUrls: ["./editor.component.scss"],
    encapsulation:ViewEncapsulation.None
})
export class editorComponent {
    public editor;
    public editorContent;
    public editorOptions = {
        theme: 'snow',
        placeholder: "说点什么吧",
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ]
        }
    };
    @Output() onOutput = new EventEmitter<string>()
    onEditorBlured(quill) {
        //console.log('editor blur!', quill);
    }
    onEditorFocused(quill) {
        //console.log('editor focus!', quill);
    }
    onEditorCreated(quill) {
        this.editor = quill;
        console.log('quill is ready! this is current quill instance object', quill);
    }
    onContentChanged({ quill, html, text }) {
        //console.log('quill content is changed!', quill, html, text);
    }
    onEnter(event:MouseEvent){
        this.onOutput.emit(this.editorContent);
        event.preventDefault()
    }
}