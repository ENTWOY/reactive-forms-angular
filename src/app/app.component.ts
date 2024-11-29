import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  fb = inject(FormBuilder);
  form!: FormGroup;

  /* form: FormGroup = this.fb.group({
    model: [''],
    licence: ['']
  }) */

  constructor() {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required], [this.asyncforbiddenNamesValidator]],
      dniorruc: ['', [Validators.required, Validators.pattern('^(\\d{8}|\\d{11})$'), this.forbiddenNamesValidator(['CAT', 'DOG'])]]
    });
  }

  onSubmit() {
    console.log('form:', this.form.value);
  }

  asyncforbiddenNamesValidator: AsyncValidatorFn = (
    control: AbstractControl,
  ): Observable<ValidationErrors | null> => {
    const forbiddenModels = ['SPIDER'];
    return of(control.value).pipe(
      delay(1000),
      map((value) => {
        if(forbiddenModels.includes(value)) {
          return {
            forbiddenModel: 'El nombre o ruc no es válido.',
          };
        }
        return null;
      }),
    );
  };

  forbiddenNamesValidator = (forbiddenLetter:string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const nombreLetters = control.value.slice(-3);

      if(forbiddenLetter.includes(nombreLetters)){
        return {
          forbiddenLetter: 'No es un nombre o razón social adecuado.'
        };
      }
      return null;
    };
  };
}
