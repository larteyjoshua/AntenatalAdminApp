import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public formService: FormService,
    private apiService: ApiService,
    private router: Router,
    private tokenService: TokenService,
    private noticeService: ToastNoticeService
  ) {}

  onLogin() {
    if (this.formService.loginForm.valid) {
      console.log(this.formService.loginForm.value);
      this.apiService.login(this.formService.loginForm.value).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.tokenService.saveToken(res.body.access_token);
            this.tokenService.saveUser(res);
            this.tokenService.saveUserName(
              this.formService.loginForm.value.username
            );
            this.router.navigateByUrl('/layout/dashboard');
            this.formService.loginForm.reset();
            this.formService.initialLoginForm();
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
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    }
  }
}
