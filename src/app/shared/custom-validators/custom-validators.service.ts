import { Injectable } from '@angular/core';
import {UserSettingsService} from '../../services/UserSettingsService/user-settings.service';
import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor(private userSettingsService: UserSettingsService) {
  }

  passwordsMatch(...arg): ValidatorFn {

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

  isPinContainsSequentialOrRepeatedSymbols(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if(control.value){
        let separatedPassword;

        if(control.value.length <= 1){
          return null;
        }
        if(this.userSettingsService.portalResources.disallowSequentialAndRepeatedDigits){
          if(control.value){
            separatedPassword = control.value.split('').map((numb) => {
              return +numb;
            });
            if(this.isNumberInOrder(separatedPassword) || this.isNumberRepeat(separatedPassword)){
              return {pinContainsSequentialOrRepeatedSymbols: true};
            }
            return null;
          } else {
            return null;
          }
        }
      } else {
        return null;
      }
    };
  }

  private isNumberInOrder(numbers: number[]): boolean {
    let isIncreasing = true;
    for(let i = 0; i < numbers.length - 1; i++){
      if(numbers[i + 1] - numbers[i] !== 1){
        isIncreasing = false;
        break;
      }
    }

    let isDecreasing = true;
    for(let j = 0; j < numbers.length - 1; j++){
      if(numbers[j + 1] - numbers[j] !== -1){
        isDecreasing =  false;
        break;
      }
    }
    return isIncreasing || isDecreasing;
  }

  private isNumberRepeat = (numbers: number[]): boolean => {
    for(let i = 0; i < numbers.length - 1; i++){
      if(numbers[i + 1] !== numbers[i]){
        return false;
      }
    }

    return true;
  }
}
