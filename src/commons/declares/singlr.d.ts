//ts的interface支持扩展的，直接在你的代码文件里就可以对jquery.d.ts里的JQueryStatic和JQuery接口进行扩展：
// interface JQueryStatic{
//     静态方法: () => JQuery; //如果返回类型还是个jq对象
// }
// $.静态方法();

// interface JQuery {
//     类型方法:()=> JQuery;
// }
// $().类型方法();


interface Colorbox {
    (): JQuery;
    (settings: any): JQuery;
}
interface JQueryStatic {
    colorbox: any;
}
interface JQuery {
    colorbox: Colorbox;
}

// 一共没几行，懒的话一行搞定
interface JQuery {
    func: Function;
}