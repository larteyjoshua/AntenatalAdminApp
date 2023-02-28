import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { ExpectedMotherComponent } from './components/expected-mother/expected-mother.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { CommentComponent } from './components/comment/comment.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { NewPasswordFormComponent } from './components/new-password-form/new-password-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import {KeyFilterModule} from 'primeng/keyfilter';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {SplitterModule} from 'primeng/splitter';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {StepsModule} from 'primeng/steps';
import {ChartModule} from 'primeng/chart';
import {ToastModule} from 'primeng/toast';
import {ImageModule} from 'primeng/image';
import {AvatarModule} from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ButtonModule} from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {ListboxModule} from 'primeng/listbox';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {EditorModule} from 'primeng/editor';
import {MultiSelectModule} from 'primeng/multiselect';




import { ApiService } from './services/api.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { authInterceptorProviders } from './auth/auth.interceptor';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { FullCommentComponent } from './components/full-comment/full-comment.component';
import { SendTextMessageComponent } from './send-text-message/send-text-message.component';
import { TokenService } from './services/token.service';
import { AuthGuard } from './auth/auth.guard';



const materialModules = [
  AutoCompleteModule,
  CalendarModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DropdownModule,
  KeyFilterModule,
  CardModule,
  PasswordModule,
  DividerModule,
  SplitterModule,
  ToolbarModule,
  ConfirmDialogModule,
  DynamicDialogModule,
  SidebarModule,
  MenubarModule,
  StepsModule,
  ChartModule,
  ToastModule,
  ImageModule,
  AvatarModule,
  ChipModule,
  ProgressSpinnerModule,
  ScrollTopModule,
  ButtonModule,
  MenuModule,
  FileUploadModule,
  TableModule,
  ProgressBarModule,
  DialogModule,
  RadioButtonModule,
  SlideMenuModule,
  ListboxModule,
  OverlayPanelModule,
  EditorModule,
  MultiSelectModule
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    AdminComponent,
    ExpectedMotherComponent,
    AppointmentComponent,
    CommentComponent,
    PasswordResetComponent,
    NewPasswordFormComponent,
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    SummaryCardComponent,
    FullCommentComponent,
    SendTextMessageComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...materialModules,
  ],
  providers: [ApiService,MessageService, ConfirmationService, authInterceptorProviders, TokenService, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
