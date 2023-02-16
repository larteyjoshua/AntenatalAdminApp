import { CommentComponent } from './components/comment/comment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { ExpectedMotherComponent } from './components/expected-mother/expected-mother.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

    { path: '',
     redirectTo: 'login',
     pathMatch: 'full'
    },
    {
      path: 'password-reset',
      component: PasswordResetComponent
    },
    {
      path: 'otp-verification',
      component: OtpVerificationComponent
    },
    {
      path: 'new-password-form',
      component: NewPasswordFormComponent
    },

    {
      path: 'layout',
      component: LayoutComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'admin',
          component: AdminComponent
        },
        {
          path: 'expected-mother',
          component: ExpectedMotherComponent
        },
        {
          path: 'appointment',
          component: AppointmentComponent
        },
        {
          path: 'comment',
          component: CommentComponent,
        },
        {
          path: 'profile',
          component: ProfileComponent
        }

      ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
