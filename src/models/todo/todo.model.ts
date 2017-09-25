import uuid from "../../commons/utilities/uuid";
export default class Todo {
    id: string;
    description: string;
    constructor(description:string,id?:string){
        this.description = description;
        this.id = id || uuid();
    }
}
