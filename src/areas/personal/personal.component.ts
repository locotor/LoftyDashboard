import {
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {

  public validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // todo
  }

  ngOnInit (): void {
    this.validateForm = this.fb.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
      name: ["", [Validators.required]],
      telphone: ["", [Validators.required]],
      email: ["", [Validators.required]]
    });
  }

  _submitForm (): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
      }
    }
  }
}