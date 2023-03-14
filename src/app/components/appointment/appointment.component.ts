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
  appointmentsData: AppointmentWithDetails[] = [];
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
  values: any[] = [];
  selectedValue: any;

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
        first_name: '',
        surname: '',
        id: 0,
      },
      Appointment: { attended: false, appointed_date: '' },
    };
  }

  ngOnInit(): void {
    this.getData();
    this.values = [{name: 'Yes', value: true}, {name: 'No', value: false}];
    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'First Name', dataKey: 'first_name' },
      { header: 'Surname', dataKey: 'surname' },
      { header: 'Telephone', dataKey: 'phone_number' },
      { header: 'Location', dataKey: 'location' },
      { header: 'Antenatal Date', dataKey: 'appointment_date' },
      { header: 'Antenatal Time', dataKey: 'appointment_time' },
      { header: 'Attended', dataKey: 'attended' },
      { header: 'Antenatal Notes', dataKey: 'appointment_note' },
      { header: 'Date Created', dataKey: 'date_created' },
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
  }

  getData() {
    this.apiService.getAppointments().subscribe(
      (res: any) => {
        this.appointmentsData = res.body;
        this.appointments = this.appointmentsData;
        this.exportedData = this.appointmentsData.map((data) => {
          return {
            'id':data.Appointment?.id,
            'first_name':data.ExpectedMother?.first_name,
            'surname':data.ExpectedMother?.surname,
            'phone_number':data.ExpectedMother?.telephone,
            'location':data.ExpectedMother?.location,
            'appointment_time':data.Appointment?.appointed_time,
            'appointment_date':data.Appointment?.appointed_date,
            'appointment_note':data.Appointment?.appointment_note,
            'attended':data.Appointment?.attended,
            'date_created': new Date(data.Appointment!.dateAdded!).toLocaleString(),
        };
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
        this.mothersList = res.body.map((x: any) => {
          return x.ExpectedMother;
        });
      },
      (err) => {
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
    this.editingExistedAppointment = { ...appointment };
    this.appointedDate = new Date(
      this.editingExistedAppointment.Appointment!.appointed_date!
    );
    this.appointedTime = new Date(
      this.editingExistedAppointment.Appointment!.appointed_date! + ' ' +
        this.editingExistedAppointment.Appointment!.appointed_time!
    );
    this.selectedValue = this.values.find(item => item.value === this.editingExistedAppointment.Appointment?.attended);
    console.log('va', this.selectedValue)
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
      attended: this.selectedValue.value,
      appointment_note:
        this.editingExistedAppointment?.Appointment?.appointment_note,
    };


    if (updateAppointment.id) {

      this.apiService.updateAppointment(updateAppointment).subscribe(
        (res: any) => {
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
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Appointment Created'
          );
        },
        (err) => {
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


  searchData = (param: any) => {
    const searchValue = param.target.value;
    if (searchValue.length >= 1) {
      this.appointments = this.appointmentsData.filter(
        (item) =>
          item.ExpectedMother?.first_name
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.Appointment?.id === Number(searchValue) ||
          item.ExpectedMother?.surname
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother?.telephone
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.Appointment?.appointed_date
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.Appointment?.appointment_note
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.Appointment?.attended == searchValue ||
          item.Admin?.name?.toLocaleLowerCase().includes(searchValue)
      );
      this.exportedData = this.appointments.map((data) => {
        return {
          'id':data.Appointment?.id,
          'first_name':data.ExpectedMother?.first_name,
          'surname':data.ExpectedMother?.surname,
          'phone_number':data.ExpectedMother?.telephone,
          'location':data.ExpectedMother?.location,
          'appointment_time':data.Appointment?.appointed_time,
          'appointment_date':data.Appointment?.appointed_date,
          'appointment_note':data.Appointment?.appointment_note,
          'attended':data.Appointment?.attended,
          'date_created': new Date(data.Appointment!.dateAdded!).toLocaleString(),
      };
      });
    } else {
      this.appointments = this.appointmentsData;
      this.exportedData = this.appointments.map((data) => {
        return {
          'id':data.Appointment?.id,
          'first_name':data.ExpectedMother?.first_name,
          'surname':data.ExpectedMother?.surname,
          'phone_number':data.ExpectedMother?.telephone,
          'location':data.ExpectedMother?.location,
          'appointment_time':data.Appointment?.appointed_time,
          'appointment_date':data.Appointment?.appointed_date,
          'appointment_note':data.Appointment?.appointment_note,
          'attended':data.Appointment?.attended,
          'date_created': new Date(data.Appointment!.dateAdded!).toLocaleString(),
      };
      });
    }
  };
}
