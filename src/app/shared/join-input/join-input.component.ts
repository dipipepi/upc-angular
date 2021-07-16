import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AuthorizationService} from '../../services/AuthorizationService/authorization.service';
import {GlobalService} from '../../services/GlobalService/global.service';
import {USER_TYPE} from '../../constants';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-join-input',
  templateUrl: './join-input.component.html',
  styleUrls: ['./join-input.component.less']
})
export class JoinInputComponent implements OnInit, AfterViewInit {
  @ViewChild('joinForm') joinForm: NgForm;
  @Input() class: string;
  @Input() options: any;
  @Input() virtualRoom: any;
  @Input() url: any;
  @Input() meetingId: any;
  userName: any;


  constructor(public authorizationService: AuthorizationService,
              public globalService: GlobalService) { }

  ngOnInit(): void {
    if(this.authorizationService.userType === USER_TYPE.GUEST){
      this.userName = localStorage.GUEST_NAME || '';
      console.log('hello form', this.joinForm);
    }
  }

  changeName(userName) {
    this.userName = userName;
  }

  ngAfterViewInit(): void {
    console.log('hello form', this.joinForm);
    this.joinForm
  }

}
