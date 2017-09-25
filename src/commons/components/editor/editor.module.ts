import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { QuillEditorModule } from 'ngx-quill-editor';
import { MdButtonModule } from "@angular/material";

import { editorComponent } from './editor.component';

@NgModule({
    imports: [
        FormsModule,
        MdButtonModule,
        QuillEditorModule
    ],
    exports: [editorComponent],
    declarations: [editorComponent],
    providers: [],
})
export class EditorModule { }
