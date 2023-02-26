import { Component, OnInit } from '@angular/core';
import { ExpectedMother } from '../models';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../services/api.service';
import { ToastNoticeService } from '../services/toast-notice.service';

@Component({
  selector: 'app-send-text-message',
  templateUrl: './send-text-message.component.html',
  styleUrls: ['./send-text-message.component.scss']
})
export class SendTextMessageComponent implements OnInit  {

  message: string = '';
  mothersList: ExpectedMother[] = [];
  selectedMother: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService
  ){}
  ngOnInit(): void {
  this.getData()
  console.log(this.selectedMother)
  }


  getData() {
    this.apiService.getExpectedMothers().subscribe(
      (res: any) => {
        console.log('mothers', res.body);
        this.mothersList = res.body.map((x: any) => {
          return {
            'id': x.ExpectedMother.id,
            'name': x.ExpectedMother.first_name + ' ' +  x.ExpectedMother.surname ,
            'telephone': '233'+ x.ExpectedMother.telephone.substring(1),
          };
        });
        console.log('m', this.mothersList);
      },
      (err) => {
        console.log('error', err);
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  sendTextMessage(){
    console.log(this.message)
    console.log(this.selectedMother)
    const phone_numbers = this.selectedMother?.map((mother:any) => mother.telephone)

    if (phone_numbers.length <= 0)
    {
      this.noticeService.noticePopup(
        'error',
        'Failure',
        "Please Select Phone Numbers"
      );
    }

    if (this.message.length === 0)
    {
      this.noticeService.noticePopup(
        'error',
        'Failure',
        "Please Enter Your Message"
      );
    }

    const data = {
      'message': this.message,
      'phone_numbers': phone_numbers
    }

    this.apiService.sendTextMessage(data).subscribe(
      (res: any) => {
        console.log('res', res.body);
        this.getData();
        this.noticeService.noticePopup(
          'success',
          'Successful',
          'Message send'
        );
      },
      (err) => {
        console.log('error', err.error.detail);
        this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );

  }

}
