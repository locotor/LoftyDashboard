import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from "ngx-quill-editor";

import { EditorComponent } from "./editor.component";

@NgModule({
    imports: [
        FormsModule,
        QuillEditorModule
    ],
    exports: [EditorComponent],
    declarations: [EditorComponent],
    providers: [],
})
export class EditorModule { }
