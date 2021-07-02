import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators{
  constructor() {
  }

  static passwordsMatch(...arg): ValidatorFn {

    return (control: FormGroup): ValidationErrors | null => {
      if(control.value.newPassword === ''){
        return null;
      } else if(control.value.newPassword !== '' &&
        (control.value.newPassword !== control.value.confirmPassword || control.value.confirmPassword === '')){
        return {passDoNotMatch: true};
      }

      return null;
    };
  }

  static isPinContainsSequentialOrRepeatedSymbols(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      return null;
    };
  }
}

export function passwordsMatch(...arg): ValidatorFn {

  return (control: FormGroup): ValidationErrors | null => {
    if(control.value.newPassword === '' && control.value.confirmPassword === ''){
      return null;
    } else if((control.value.newPassword !== '' && control.value.newPassword !== control.value.confirmPassword) ||
      (control.value.newPassword !== '' && control.value.confirmPassword === '')) {
      return {passDoNotMatch: true};
    }

    return null;
  };

}
