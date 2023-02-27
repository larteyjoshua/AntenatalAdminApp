import { ExpectedMother } from './../../models/index';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { exportPdf, exportExcel } from 'src/app/utils/export-utils';
import { ExpectedMotherWithDetails } from '../../models/index';

@Component({
  selector: 'app-expected-mother',
  templateUrl: './expected-mother.component.html',
  styleUrls: ['./expected-mother.component.scss'],
})
export class ExpectedMotherComponent implements OnInit {
  items: MenuItem[] = [];
  mothers: ExpectedMotherWithDetails[] = [];
  motherData: ExpectedMotherWithDetails[] = [];
  editingMother: boolean = true;

  motherDialog: boolean = false;

  mother: ExpectedMother = {};
  submitted: boolean = false;
  columns: any[] = [];
  exportedData: any[] = [];
  firstAntenatalVisit: Date = new Date();
  expectedDelivery: Date = new Date();
  birthDate: Date = new Date();
  defaultDate: Date = new Date();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService
  ) {}
  ngOnInit(): void {
    this.getData();

    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'First Name', dataKey: 'first_name' },
      { header: 'Surname', dataKey: 'surname' },
      { header: 'Telephone', dataKey: 'telephone' },
      { header: 'Location', dataKey: 'location' },
      { header: 'Height', dataKey: 'height' },
      { header: 'Weight', dataKey: 'weight' },
      {
        header: 'First Antenatal Visit',
        dataKey: 'first_antenatal_visit_date',
      },
      { header: 'Expected Delivery Date', dataKey: 'expected_delivery_date' },
      { header: 'Date of Birth', dataKey: 'birth_date' },
      { header: 'Date Added', dataKey: 'dateAdded' },
    ];

    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
          exportPdf(this.exportedData, this.columns, 'Expected-Mothers');
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        command: () => {
          exportExcel(this.exportedData, 'Expected-Mothers');
        },
      },
    ];
  }

  getData() {
    this.apiService.getExpectedMothers().subscribe(
      (res: any) => {
        console.log('mothers', res.body);
        this.motherData = res.body;
        this.mothers = this.motherData;
        this.exportedData = this.motherData.map((data) => {
          return data.ExpectedMother;
        });
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
    this.mother = {};
    this.submitted = false;
    this.motherDialog = true;
  }

  editMother(mother: ExpectedMotherWithDetails) {
    this.editingMother = false;
    this.firstAntenatalVisit = new Date(
      mother!.ExpectedMother!.first_antenatal_visit_date!
    );
    this.expectedDelivery = new Date(
      mother!.ExpectedMother!.expected_delivery_date!
    );
    this.birthDate = new Date(mother!.ExpectedMother!.birth_date!);
    console.log(mother, this.editingMother);
    this.mother = { ...mother.ExpectedMother };
    this.motherDialog = true;
  }

  deleteMother(mother: ExpectedMotherWithDetails) {
    console.log(mother);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' +
        mother.ExpectedMother.first_name +
        ' ' +
        mother.ExpectedMother.surname +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService
          .deleteExpectedMother(mother.ExpectedMother.id)
          .subscribe(
            (res: any) => {
              console.log('res', res.body);
              this.getData();
              this.noticeService.noticePopup(
                'success',
                'Successful',
                'Expected Mother Deleted'
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
    this.editingMother = true;
    this.motherDialog = false;
    this.submitted = false;
    this.firstAntenatalVisit = new Date();
    this.expectedDelivery = new Date();
    this.birthDate = new Date();
  }

  saveMother() {
    this.editingMother = true;
    console.log(this.mother);
    this.submitted = true;
    this.mother.first_antenatal_visit_date =
      this.firstAntenatalVisit.toLocaleDateString();
    this.mother.expected_delivery_date =
      this.expectedDelivery.toLocaleDateString();
    this.mother.birth_date = this.birthDate.toLocaleDateString();

    if (this.mother.id) {
      console.log(this.mother);
      const expectedMother = (({
        id,
        first_name,
        surname,
        weight,
        height,
        location,
        first_antenatal_visit_date,
        expected_delivery_date,
        birth_date,
        telephone,
      }) => ({
        id,
        first_name,
        surname,
        telephone,
        weight,
        height,
        location,
        first_antenatal_visit_date,
        expected_delivery_date,
        birth_date,
      }))(this.mother);
      this.apiService.updateExpectedMother(expectedMother).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Expected Mother Updated'
          );
        },
        (err) => {
          console.log('error', err.error.detail);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    } else {
      const newMother = (({
        first_name,
        surname,
        weight,
        height,
        location,
        first_antenatal_visit_date,
        expected_delivery_date,
        birth_date,
        telephone,
      }) => ({
        first_name,
        surname,
        weight,
        height,
        location,
        first_antenatal_visit_date,
        expected_delivery_date,
        birth_date,
        telephone,
      }))(this.mother);
      console.log(newMother);
      this.apiService.addExpectedMother(newMother).subscribe(
        (res: any) => {
          console.log('res', res.body);
          this.getData();
          this.noticeService.noticePopup(
            'success',
            'Successful',
            'Expected Mother Added'
          );
        },
        (err) => {
          console.log(err);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    }
    this.motherDialog = false;
    this.mother = {};
    this.firstAntenatalVisit = new Date();
    this.expectedDelivery = new Date();
    this.birthDate = new Date();
  }

  searchData = (param: any) => {
    const searchValue = param.target.value;
    if (searchValue.length >= 1) {
      this.mothers = this.motherData.filter(
        (item) =>
          item.ExpectedMother.first_name
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.id === Number(searchValue) ||
          item.ExpectedMother.surname
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.telephone
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.birth_date
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.weight === Number(searchValue) ||
          item.ExpectedMother.height === Number(searchValue) ||
          item.ExpectedMother.location
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.first_name
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.ExpectedMother.expected_delivery_date
            ?.toLocaleLowerCase()
            .includes(searchValue) ||
          item.Admin.name?.toLocaleLowerCase().includes(searchValue)
      );
      this.exportedData = this.motherData.map((data) => {
        return data;
      });
    } else {
      this.mothers = this.motherData;
      this.exportedData = this.motherData.map((data) => {
        return data;
      });
    }
  };
}
