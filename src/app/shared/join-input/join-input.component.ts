import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {GlobalService} from '../../services/GlobalService/global.service';
import {ERROR_CODE, USER_TYPE} from '../../constants';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {EventService} from '../services/EventService/event.service';

@Component({
  selector: 'app-join-input',
  templateUrl: './join-input.component.html',
  styleUrls: ['./join-input.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class JoinInputComponent implements OnInit {
  @Input() class: string;
  @Input() options: any;
  @Input() virtualRoom: any;
  @Input() url: any;
  @Input() meetingId: any;
  @Input() myMeetings: any;
  userName: any;
  isConferenceExists = true;
  toggled = false;

  private meetingIdPattern = /^[0-9]{1,32}(\*\*\*[0-9]{0,16}(\*[0-9]{0,16})?)?$/;
  private itemClicked = true;
  private el;
  joinForm: FormGroup;
  errorTranslate: string;
  key: string;
  value: string;


  constructor(public authorizationService: AuthorizationService,
              public globalService: GlobalService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    if (this.key === undefined || this.value === undefined) {
      this.key = 'id';
      this.value = 'name';
    }

    this.joinForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(5), Validators.required]),
      meetingId: new FormControl('', [Validators.pattern(this.meetingIdPattern), Validators.maxLength(35)])
    });

    this.setUserName();

    this.joinForm.valueChanges.subscribe(val => {
      if(val.name === '' && val.meetingId === '') {
        // this.errorTranslate =
      }
      console.log('hello form', this.options);
    });

    this.eventService.on(ERROR_CODE.JOIN.WRONG_MEETING_ID, () => {
      this.isConferenceExists = false;
    });


  }

  showDropdown() {
    this.itemClicked = true;
    this.toggled = !this.toggled;
  }

  resetField(field: string): void {
    const newValue = {};
    newValue[field] = '';
    this.joinForm.patchValue(newValue);
  }

  selectOption(option): void {

  }

  private setUserName(): void {
    if(this.authorizationService.userType === USER_TYPE.GUEST){
      this.joinForm.get('name').patchValue(localStorage.GUEST_NAME || '');
    } else {
      this.joinForm.get('name').patchValue(this.globalService.user.name);
    }
  }
}
