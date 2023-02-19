import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestPasswordResponse } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { FormService } from 'src/app/services/form.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  confirmDialog: boolean = false;
  enterOTP: boolean =false
  submitted: boolean = false;
  resetPasswordResponse: RestPasswordResponse = {};
  telephone: string = '';
  otpCode: string = '';
  username: string = '';
  replaceString: string = '';

  constructor(
    public formService: FormService,
    private apiService: ApiService,
    private router: Router,
    private noticeService: ToastNoticeService
  ) {}

  onResetPassword() {
    console.log(this.formService.resetPasswordForm.value.username);
    this.username = this.formService.resetPasswordForm.value.username;
    if (this.formService.resetPasswordForm.valid) {
      this.apiService.passwordReset(this.formService.resetPasswordForm.value).subscribe((res:any) => {
          if(res.status === 200){
            this.resetPasswordResponse = res.body;
            this.telephone = res.body.telephone;
            this.replaceString = this.resetPasswordResponse.telephone?.slice(0,6)!;
            this.resetPasswordResponse.telephone = this.resetPasswordResponse.telephone?.replace(this.replaceString,"******")
            this.confirmDialog = true;

        }
        else {
          console.log('error', res)
          this.noticeService.noticePopup('error', 'Failure', res.error.detail)
        }
      },
      err =>{
        console.log('error', err)
        this.noticeService.noticePopup('error', 'Failure', err.error.detail)

      });

  }

}

hideDialog() {
  this.confirmDialog = false;
  this.enterOTP = false;
  this.submitted = false;
}

requestOTP(){
  if (this.telephone){
  this.confirmDialog = false;
      const data ={'phone_number': '233'+this.telephone.slice(1)}
  this.apiService.generateOTP(data).subscribe(
          (res: any) => {
            console.log('res', res.body);
            if (res.status === 200 && res.body.code === '1000'){
              this.enterOTP = true;
              this.formService.resetPasswordForm.reset();
              this.formService.initialResetPasswordForm();
            }

          },
          (err) => {
            console.log('error', err.error.detail);
            this.noticeService.noticePopup('error', 'Failure', err.error.detail);
          }
        );
  }

}

submitOTP(){
  const data = {
    'phone_number':'233'+this.telephone.slice(1),
    'code': this.otpCode
  }
  console.log(data)

  if (data.code && data.code){
    this.confirmDialog = false;
    this.apiService.verifyOTP(data).subscribe(
            (res: any) => {
              console.log('res', res.body);
              if (res.status === 200 && res.body.code === '1100'){
                this.enterOTP = false;
                // this.router.navigateByUrl('['/password-recovery', 3]');
                this.router.navigate(
                  ['new-password', this.username]);
                }

                if (res.status === 200 && res.body.code === '1104'){
                  this.noticeService.noticePopup('error', 'Failure', res.body.message);
                }

            },
            (err) => {
              console.log('error', err.error.detail);
              this.noticeService.noticePopup('error', 'Failure', err.error.detail);
            }
          );
    }

}


}
