import { Component, OnInit } from '@angular/core';
import { ExpectedMother } from '../models';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastNoticeService } from '../services/toast-notice.service';

@Component({
  selector: 'app-send-text-message',
  templateUrl: './send-text-message.component.html',
  styleUrls: ['./send-text-message.component.scss'],
})
export class SendTextMessageComponent implements OnInit {
  message: string = '';
  mothersList: ExpectedMother[] = [];
  selectedMother: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private noticeService: ToastNoticeService
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getExpectedMothers().subscribe(
      (res: any) => {
        const filteredMothers = res.body.filter(
          (k: any) =>
            new Date(
              k.ExpectedMother.expected_delivery_date + ' ' + '00:00:00 AM'
            ) > new Date()
        );
        this.mothersList = filteredMothers.map((x: any) => {
          return {
            id: x.ExpectedMother.id,
            name: x.ExpectedMother.first_name + ' ' + x.ExpectedMother.surname,
            telephone: '233' + x.ExpectedMother.telephone.substring(1),
          };
        });
      },
      (err) => {
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  sendTextMessage() {
    const phone_numbers = this.selectedMother?.map(
      (mother: any) => mother.telephone
    );

    if (phone_numbers.length <= 0) {
      this.noticeService.noticePopup(
        'error',
        'Failure',
        'Please Select Phone Numbers'
      );
    }

    if (this.message.length === 0) {
      this.noticeService.noticePopup(
        'error',
        'Failure',
        'Please Enter Your Message'
      );
    }

    const data = {
      message: this.message,
      phone_numbers: phone_numbers,
    };

    this.apiService.sendTextMessage(data).subscribe(
      (res: any) => {
        this.getData();
        this.noticeService.noticePopup('success', 'Successful', 'Message send');
      },
      (err) => {
        this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }
}
