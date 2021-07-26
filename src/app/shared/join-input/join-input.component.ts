import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {GlobalService} from '../../services/GlobalService/global.service';
import {ERROR_CODE, USER_TYPE} from '../../constants';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {EventService} from '../services/EventService/event.service';

@Component({
  selector: 'app-join-input',
  templateUrl: './join-input.component.html',
  styleUrls: ['./join-input.component.less', '../custom-select/custom-select.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class JoinInputComponent implements OnInit, OnDestroy {
  @Input() class: string;
  @Input() options: any;
  @Input() virtualRoom: any;
  @Input() name: any;
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
  private clickEvent: any;


  constructor(public authorizationService: AuthorizationService,
              public globalService: GlobalService,
              private eventService: EventService) {
  }

  ngOnInit(): void {
    if (this.key === undefined || this.value === undefined) {
      this.key = 'number';
      this.value = 'name';
    }

    if(this.virtualRoom === undefined) {
      this.virtualRoom = [];
    }

    this.joinForm = new FormGroup({
      name: new FormControl(this.name, [Validators.maxLength(5), Validators.required]),
      meetingId: new FormControl(this.meetingId, [Validators.pattern(this.meetingIdPattern), Validators.maxLength(35)])
    });

    if(this.virtualRoom){
      this.joinForm.get('meetingId').patchValue(this.virtualRoom.number);
    }
    // this.setUserName();

    // this.joinForm.valueChanges.subscribe(val => {
    //   if(val.name === '' && val.meetingId === '') {
    //   }
    //   console.log('hello form', this.joinForm);
    // });


    this.eventService.on(ERROR_CODE.JOIN.WRONG_MEETING_ID, () => {
      this.isConferenceExists = false;
    });

    if(this.options.length !== 0) {
      document.addEventListener('click', this.onClick);
    }
  }

  meetingIdChanged(){
    this.isConferenceExists = true;
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
    this.joinForm.get('meetingId').patchValue(option.number);
    this.toggled = false;
  }

  private onClick = (e) => {
    // @ts-ignore
    if(!$(e.target).hasClass('default-select')){
      this.toggled = false;
    }
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onClick);
  }
}
