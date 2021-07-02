import { Injectable } from '@angular/core';
import {UserSettingsService} from '../../../services/UserSettingsService/user-settings.service';
import {PIN_MAX_LENGTH, PIN_TYPE} from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(private userSettingsService: UserSettingsService) { }

  public setModeratorPinVariables(scope: any, moderatorPin?: string): void {
    scope.moderatorPinMinLength = this.userSettingsService.portalResources.moderatorPINMinimumLength || 0;
    scope.moderatorPinMaxLength = PIN_MAX_LENGTH.MODERATOR_PIN;
  }

  public setMeetingPinVariables(scope: any, b?: boolean, permanentPin?: string): void {

    scope.meetingPinMinLength = this.userSettingsService.portalResources.meetingPINMinimumLength || 0;
    scope.meetingPinMaxLength = PIN_MAX_LENGTH.MEETING_PIN;
  }

  public setBroadcastAndRecordingPinVariables(scope: any): void {
    scope.recordingAndBroadcastPinMinLength = this.userSettingsService.portalResources.recordingAndBroadcastPINMinimumLength || 0;
    scope.recordingAndBroadcastPinMaxLength = PIN_MAX_LENGTH.RECORDING_AND_BROADCAST_PIN;
  }

  public isPinEmpty(pin: string):boolean {
    return pin === undefined || pin === null || pin === '';
  }

  public isPinCorrect(pin: string, PINType: string, scope: any, isFromMeetingCreator?: boolean): void {
    switch (PINType) {
      case PIN_TYPE.MODERATOR_PIN:
        scope.isModeratorPinPatternCorrect = this.isPinPatternCorrect(pin,
          this.getPinPattern(this.userSettingsService.portalResources.moderatorPINMinimumLength || 0, PIN_MAX_LENGTH.MODERATOR_PIN));
        scope.isModeratorPinContainsSequentialOrRepeatedSymbols = this.isPinContainsSequentialOrRepeatedSymbols(pin);
        break;
      case PIN_TYPE.MEETING_PIN:
        if(isFromMeetingCreator){
          if(scope.isItOneTimePin){
            scope.isMeetingPinContainsSequentialOrRepeatedSymbols = false;
            scope.isMeetingPinPatternCorrect = true;
          } else {
            scope.isMeetingPinPatternCorrect = this.isPinPatternCorrect(pin,
              this.getPinPattern(this.userSettingsService.portalResources.meetingPINMinimumLength || 0, PIN_MAX_LENGTH.MEETING_PIN));
            scope.isMeetingPinContainsSequentialOrRepeatedSymbols = this.isPinContainsSequentialOrRepeatedSymbols(pin);
          }
        } else {
          scope.isMeetingPinPatternCorrect = this.isPinPatternCorrect(pin,
            this.getPinPattern(this.userSettingsService.portalResources.meetingPINMinimumLength || 0, PIN_MAX_LENGTH.MEETING_PIN));
          scope.isMeetingPinContainsSequentialOrRepeatedSymbols = this.isPinContainsSequentialOrRepeatedSymbols(pin);
        }
        break;
      case PIN_TYPE.RECORDING_AND_BROADCAST_PIN:
        if(isFromMeetingCreator){
          if(!scope.isBroadcastAvailable || !scope.broadcast.allowStreaming){
            scope.isRecordingAndBroadcastPinPatternCorrect = true;
            scope.isRecordingAndBroadcastPinContainsSequentialOrRepeatedSymbols = false;
          } else {
            scope.isRecordingAndBroadcastPinPatternCorrect = this.isPinPatternCorrect(pin,
              this.getPinPattern(this.userSettingsService.portalResources.recordingAndBroadcastPINMinimumLength || 0,
                PIN_MAX_LENGTH.RECORDING_AND_BROADCAST_PIN));
            scope.isRecordingAndBroadcastPinContainsSequentialOrRepeatedSymbols = this.isPinContainsSequentialOrRepeatedSymbols(pin);
          }
        } else {

          scope.isRecordingAndBroadcastPinPatternCorrect = this.isPinPatternCorrect(pin,
            this.getPinPattern(this.userSettingsService.portalResources.recordingAndBroadcastPINMinimumLength || 0,
              PIN_MAX_LENGTH.RECORDING_AND_BROADCAST_PIN));
          scope.isRecordingAndBroadcastPinContainsSequentialOrRepeatedSymbols = this.isPinContainsSequentialOrRepeatedSymbols(pin);
        }
        break;
    }
  }

  private isPinPatternCorrect(pin: string, pinPatter: object): boolean{
    if(pin === undefined){
      pin = '';
    }
    // @ts-ignore
    if(pinPatter.exec){
      // @ts-ignore
      return pinPatter.exec(pin) !== null;
    } else {
      return true;
    }
  }

  private getPinPattern (minLength: number, maxLength: number): object {
    return  new RegExp('^[0-9]{' + minLength + ',' + maxLength + '}$');
  }

  isPinContainsSequentialOrRepeatedSymbols(pass: string): boolean {
    if(pass){
      let separatedPassword;

      if(pass.length <= 1){
        return false;
      }
      if(this.userSettingsService.portalResources.disallowSequentialAndRepeatedDigits){
        if(pass){
          separatedPassword = pass.split('').map((numb) => {
            return +numb;
          });
          return this.isNumberInOrder(separatedPassword) || this.isNumberRepeat(separatedPassword);
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  isNumberInOrder(numbers: number[]): boolean {
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
