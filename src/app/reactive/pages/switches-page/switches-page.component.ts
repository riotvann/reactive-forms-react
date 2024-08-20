import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css'
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  onSave() {
    if (this.myForm.invalid) {
      console.log('invalid')
      this.myForm.markAllAsTouched();
      return;
    }
    console.log('can save');
  }
}
