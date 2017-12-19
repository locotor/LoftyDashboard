import "core-js/es6/symbol";
import "core-js/es6/object";
import "core-js/es6/function";
import "core-js/es6/parse-int";
import "core-js/es6/parse-float";
import "core-js/es6/number";
import "core-js/es6/math";
import "core-js/es6/string";
import "core-js/es6/date";
import "core-js/es6/array";
import "core-js/es6/regexp";
import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/weak-map";
import "core-js/es6/weak-set";
import "core-js/es6/typed";
import "core-js/es6/reflect";
// issue https://github.com/AngularClass/angular2-webpack-starter/issues/709
// import "core-js/es6/promise";

import "core-js/es7/reflect";
import "zone.js/dist/zone";
import "reflect-metadata";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./root/app.module";
import "./commons/styles/init.css";

require("expose-loader?echarts!echarts");
require("expose-loader?$!jQuery");

// declare var $: any;
// console.log("all for test: ",$.connection.LoftyHub);

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));