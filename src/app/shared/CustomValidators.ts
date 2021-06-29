import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

// export class CustomValidators{
//   static customValid(control: AbstractControl, newPass: any): ValidatorFn {
//     return this.passwordsMatch(control, newPass);
//   }
//
//   private static passwordsMatch(control: AbstractControl, newPass: any) {
//     if (true){
//       return {passDoNotMatch: true};
//     }
//     return null;
//   }
// }

export function passwordsMatch(...arg): ValidatorFn {

  return (control: FormGroup): ValidationErrors | null => {
    if(control.value.newPassword === '' && control.value.confirmPassword === ''){
      return {passDoNotMatch: false};
    } else if((control.value.newPassword !== '' && control.value.newPassword !== control.value.confirmPassword) ||
      (control.value.newPassword !== '' && control.value.confirmPassword === '')) {
      return {passDoNotMatch: true};
    }

    return {passDoNotMatch: false};
  };

}
