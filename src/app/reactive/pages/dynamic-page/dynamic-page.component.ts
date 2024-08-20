import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css'
})
export class DynamicPageComponent {

  // public myForm2 = new FormGroup



  constructor(
    private fb: FormBuilder
  ) {

  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required])

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
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

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }

  onAddToFavorites(): void {
    console.log('here')
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.newFavorite.push( new FormControl( newGame, ))
    this.favoriteGames.push(
      this.fb.control(newGame, Validators.required)
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }


  onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();
  }

}
