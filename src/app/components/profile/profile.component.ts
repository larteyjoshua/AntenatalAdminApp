import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Admin } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  admin: Admin = {};
  submitted: boolean = false;
  avatarLetter: string = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService
  ) {}

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.apiService.getAdminProfile().subscribe(
      (res: any) => {
        this.admin = res.body;
        this.avatarLetter = this.admin.email![0]!
      },
      (err) => {
        console.log('error', err);
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  saveAdmin() {
    console.log(this.admin);
    this.submitted = true;

    if (this.admin.id) {
      console.log(this.admin);
      this.apiService.updateAdmin(this.admin).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Admin Updated'
          );
        },
        (err) => {
          console.log('error', err.error.detail);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    }

    this.admin = {};
  }
}
