import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { QuillEditorModule } from "ngx-quill-editor";

import { EditorComponent } from "./editor.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        QuillEditorModule,
        NgZorroAntdModule
    ],
    exports: [EditorComponent],
    declarations: [EditorComponent],
    providers: [],
})
export class EditorModule { }
