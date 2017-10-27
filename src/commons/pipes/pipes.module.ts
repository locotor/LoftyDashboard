
import { NgModule } from "@angular/core";

import { FromNowPipe } from "./from-now.pipe";

@NgModule({
    declarations: [
        FromNowPipe
    ],
    exports: [
        FromNowPipe
    ]
})
export class PipesModule { }