import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './root/app.module';

require("expose-loader?$!jquery");
import "./commons/styles/init.css";
import "./commons/styles/teal-gray-theme.scss"
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));