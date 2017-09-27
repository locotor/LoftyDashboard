import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './root/app.module';
import "./commons/styles/init.css";

require("expose-loader?$!jquery");
require("expose-loader?echarts!echarts")

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));