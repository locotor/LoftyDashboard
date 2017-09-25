import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

interface IInfoOperation extends Function {
  (infos: string[]): string[];
}

@Component({
  selector: 'personal',
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {
  isEditingPasswords: boolean = false;
  isEditingUsername:boolean = false;

  constructor() { };
  ngOnInit() {
  };
  changePassword() {
    this.isEditingPasswords = !this.isEditingPasswords;
  }
  editUsername(){
    this.isEditingUsername = true;
  }
}