import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./root/app.module";
import "./commons/styles/init.css";

require("expose-loader?echarts!echarts");

declare var $: any;
console.log("all for test: ",$.connection.LoftyHub);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));