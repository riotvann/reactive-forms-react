import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 200,
  inStorage: 5
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css'
})
export class BasicPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    // this.myForm.reset(
    //   rtx5090
    // )
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return ' Este campo es requerido'
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} characters`
      }
      console.log(key);
    }

    return null
  }

  public myForm: FormGroup = this.fb.group({
    //first array can be a single validation or an array of validations
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      name: '',
      price: 0,
      inStorage: 0
    });
  }
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // })
}
