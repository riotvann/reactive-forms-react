


import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {



    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

        // throw new Error('Method not implemented.');
        const email = control.value;

        const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {

            console.log({ email });
            if (email === 'jorge@google.com') {
                subscriber.next({ emailTaken: true });
                subscriber.complete();
                // return;
            }

            subscriber.next(null);
            subscriber.complete();
        }).pipe(
            delay(2000)
        )

        return httpCallObservable;
    }

    // validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    //     // throw new Error('Method not implemented.');
    //     const email = control.value;

    //     return of({
    //         emailTaken: true
    //     })
    // }
    // registerOnValidatorChange?(fn: () => void): void {
    //     throw new Error('Method not implemented.');
    // }


}