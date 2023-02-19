import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormService } from 'src/app/services/form.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss'],
})
export class NewPasswordFormComponent implements OnInit {
  username: string = '';
  constructor(
    public formService: FormService,
    private apiService: ApiService,
    private router: Router,
    private noticeService: ToastNoticeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.username = paramMap.get('email')!;
    });
  }

  onNewPassword() {
    if (this.formService.recoverPasswordForm.valid) {
      console.log(this.formService.recoverPasswordForm.value);
      if (this.formService.recoverPasswordForm.value.password ===
        this.formService.recoverPasswordForm.value.password1){

      const newPassword = {
        'username': this.username,
        'new_password': this.formService.recoverPasswordForm.value.password
      }
      this.apiService
        .newPassword(newPassword)
        .subscribe(
          (res: any) => {
            if (res.status === 200) {
              const message = "New Password Set for " + res.body.email
              this.router.navigateByUrl('/login');
              this.noticeService.noticePopup(
                'success',
                'Successful',
                message
              );
              this.formService.recoverPasswordForm.reset();
              this.formService.initialRecoverPasswordForm();
            } else {
              console.log('error', res);
              this.noticeService.noticePopup(
                'error',
                'Failure',
                res.error.detail
              );
            }
          },
          (err) => {
            console.log('error', err);
            this.noticeService.noticePopup(
              'error',
              'Failure',
              err.error.detail
            );
          }
        );
      }
    }
  }
}
