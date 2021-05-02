import { Directive } from '@angular/core';
import { Validator } from '@angular/forms';
import {AbstractControl, NG_VALIDATORS,ValidationErrors} from '@angular/forms'

@Directive({
  selector: '[appEqualValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }]
})

export class EqualValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors {
    console.log(equalVal(control))
    return equalVal(control);
  }
  

}

 function equalVal(control:AbstractControl):{[key:string]:boolean}| null {
  console.log("works")
  const password=control.get('password')
  const repeatPassword=control.get("repeatpassword")
  return password && repeatPassword && password.value !== repeatPassword.value ?
    {'mismatch': true}:
    null;

}