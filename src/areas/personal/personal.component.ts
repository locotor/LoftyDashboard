import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'personal',
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PersonalComponent implements OnInit {

  public validateForm: FormGroup;

  constructor(private fb: FormBuilder) { };

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
      telphone: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });
  };

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

}