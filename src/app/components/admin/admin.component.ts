import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Admin } from 'src/app/models';
import { ApiService } from '../../services/api.service';
import { exportExcel, exportPdf } from '../../utils/export-utils';
import { ToastNoticeService } from '../../services/toast-notice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  items: MenuItem[] = [];
  admins: Admin[] = [];
  adminsData: Admin[] = [];
  editingAdmin: boolean = true;
  adminDialog: boolean = false;

  admin: Admin = {};
  submitted: boolean = false;
  columns: any[] = [];
  exportedData: any[] = [];
  values: boolean[] = [];
  selectedValue: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.values = [true, false];
    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'Full Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Telephone', dataKey: 'telephone' },
      { header: 'Date Added', dataKey: 'dateAdded' },
      { header: 'Status', dataKey: 'isActive' },
    ];

    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
          exportPdf(this.exportedData, this.columns, 'Admins');
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: () => {
          exportExcel(this.exportedData, 'Admins');
        },
      },
    ];
  }

  getData() {
    this.apiService.getAdmins().subscribe(
      (res: any) => {
        console.log('admin', res.body);
        this.exportedData = this.admins.map((data) => {
          return data;
        });
        this.adminsData = res.body;
        this.admins = this.adminsData;
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
    this.admin = {};
    this.submitted = false;
    this.adminDialog = true;
  }

  editAdmin(admin: Admin) {
    this.editingAdmin = false;
    console.log(admin, this.editingAdmin);
    this.admin = { ...admin };
    this.adminDialog = true;
    if (admin.isActive) {
      this.selectedValue = this.values[0];
    }
  }

  deleteAdmin(admin: Admin) {
    console.log(admin);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + admin.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteAdmin(admin.id).subscribe(
          (res: any) => {
            console.log('res', res.body);
            this.getData();
            this.noticeService.noticePopup(
              'success',
              'Successful',
              'Admin Deleted'
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
    this.editingAdmin = true;
    this.adminDialog = false;
    this.submitted = false;
  }

  saveAdmin() {
    this.editingAdmin = true;
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
    } else {
      console.log(this.admin);
      const newAdmin = (({ name, email, telephone, password }) => ({
        name,
        email,
        telephone,
        password,
      }))(this.admin);
      console.log(newAdmin);
      this.apiService.addAdmin(newAdmin).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Admin Created'
          );
        },
        (err) => {
          console.log(err);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    }
    this.adminDialog = false;
    this.admin = {};
  }

  searchData = (param: any) => {
    const searchValue = param.target.value;
    if (searchValue.length >= 1) {
      this.admins = this.adminsData.filter(
        (item) =>
          item.name?.toLocaleLowerCase().includes(searchValue) ||
          item.id === Number(searchValue) ||
          item.email?.toLocaleLowerCase().includes(searchValue) ||
          item.telephone?.toLocaleLowerCase().includes(searchValue)
      );
      this.exportedData = this.admins.map((data) => {
        return data;
      });
    } else {
      this.admins = this.adminsData;
      this.exportedData = this.admins.map((data) => {
        return data;
      });
    }
  };
}
