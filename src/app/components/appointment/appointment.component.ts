import { Component, OnInit } from '@angular/core';
import {
  Appointment,
  AppointmentWithDetails,
  ExpectedMotherWithDetails,
  ExpectedMother,
} from '../../models/index';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { exportPdf, exportExcel } from 'src/app/utils/export-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  items: MenuItem[] = [];
  appointments: AppointmentWithDetails[] = [];
  editingAppointment: boolean = true;

  appointmentDialog: boolean = false;
  appointment: Appointment = {};
  submitted: boolean = false;
  columns: any[] = [];
  exportedData: any[] = [];
  mothers: ExpectedMotherWithDetails[] = [];
  mothersList: ExpectedMother[] = [];
  selectedMother: ExpectedMother = {};
  appointedDate: Date = new Date();
  appointedTime: Date = new Date();
  values: boolean[] = [];
  selectedValue: boolean = false;

  editingExistedAppointment: AppointmentWithDetails;

  minDate: Date = new Date();
  maxDate: Date = new Date();
  mDate: Date = new Date();
  defaultDate: Date = new Date();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService
  ) {
    this.editingExistedAppointment = {
      ExpectedMother: {
        name: '',
        id: 0,
      },
      Appointment: { attended: false, appointed_date: '' },
    };
  }

  ngOnInit(): void {
    this.getData();
    this.values = [true, false];
    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'Full Name', dataKey: 'name' },
      { header: 'Telephone', dataKey: 'telephone' },
      { header: 'Antenatal Date', dataKey: 'appointed_date' },
      { header: 'Antenatal Time', dataKey: 'appointed_time' },
      { header: 'Attended', dataKey: 'attended' },
      { header: 'Date Added', dataKey: 'dateAdded' },
    ];

    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
          exportPdf(this.exportedData, this.columns, 'Antenatal Appointment');
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: () => {
          exportExcel(this.exportedData, 'Antenatal Appointment');
        },
      },
    ];
    console.log(new Date("10:38:39"))
  }

  getData() {
    this.apiService.getAppointments().subscribe(
      (res: any) => {
        console.log('appointment', res.body);
        this.appointments = res.body;
        this.exportedData = this.appointments.map((data) => {
          return data;
        });
      },
      (err) => {
        console.log('error', err);
        if (err.status === 403 || 401) {
          this.router.navigateByUrl('/login');
        }
      }
    );

    this.apiService.getExpectedMothers().subscribe(
      (res: any) => {
        console.log('mothers', res.body);
        this.mothersList = res.body.map((x: any) => {
          return x.ExpectedMother;
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

  openNew() {
    this.appointment = {};
    this.editingExistedAppointment = {
      Admin: {},
      Appointment: {},
      ExpectedMother: {},
    };
    this.submitted = false;
    this.appointmentDialog = true;
  }

  editAppointment(appointment: AppointmentWithDetails) {
    this.editingAppointment = false;
    console.log(appointment, this.editingAppointment);
    this.editingExistedAppointment = { ...appointment };
    this.appointedDate = new Date(
      this.editingExistedAppointment.Appointment!.appointed_date!
    );
    this.appointedTime = new Date(
      this.editingExistedAppointment.Appointment!.appointed_date! + ' ' +
        this.editingExistedAppointment.Appointment!.appointed_time!
    );
    console.log(this.appointedTime);
    this.appointmentDialog = true;
  }

  deleteAppointment(appointment: Appointment) {
    console.log(appointment);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + appointment.appointed_date + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteAppointment(appointment.id).subscribe(
          (res: any) => {
            console.log('res', res.body);
            this.getData();
            this.noticeService.noticePopup(
              'success',
              'Successful',
              'Antenatal Deleted'
            );
          },
          (err) => {
            console.log('error', err.error.detail);
            this.noticeService.noticePopup(
              'error',
              'Failure',
              err.error.detail
            );
          }
        );
      },
    });
  }

  hideDialog() {
    this.editingAppointment = true;
    this.appointmentDialog = false;
    this.submitted = false;
    this.appointedDate = new Date();
    this.appointedTime = new Date();
  }

  saveAppointment() {
    this.editingAppointment = true;
    this.editingExistedAppointment.Appointment!.appointed_date =
      this.appointedDate.toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    this.editingExistedAppointment.Appointment!.appointed_time =
      this.appointedTime.toLocaleTimeString('en-us');
    this.submitted = true;
    const newAppointment: Appointment = {
      expected_mother_id: this.selectedMother?.id,
      appointed_date:
        this.editingExistedAppointment?.Appointment?.appointed_date,
      appointed_time:
        this.editingExistedAppointment?.Appointment?.appointed_time,
      appointment_note:
        this.editingExistedAppointment?.Appointment?.appointment_note,
    };

    const updateAppointment: Appointment = {
      id: this.editingExistedAppointment?.Appointment?.id,
      appointed_date:
        this.editingExistedAppointment?.Appointment?.appointed_date,
      appointed_time:
        this.editingExistedAppointment?.Appointment?.appointed_time,
      attended: this.editingExistedAppointment?.Appointment?.attended,
      appointment_note:
        this.editingExistedAppointment?.Appointment?.appointment_note,
    };
    console.log('newAppointment', newAppointment);

    if (updateAppointment.id) {
      this.apiService.updateAppointment(updateAppointment).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Appointment Updated'
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
    } else {
      this.apiService.addAppointment(newAppointment).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Appointment Created'
          );
        },
        (err) => {
          console.log(err);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
          if (err.status === 403) {
            this.router.navigateByUrl('/login');
          }
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
    }

    this.appointmentDialog = false;
    this.appointedDate = new Date();
    this.appointedTime = new Date();
    this.selectedMother = {};
    this.editingExistedAppointment = {
      Admin: {},
      Appointment: {},
      ExpectedMother: {},
    };
  }
}
