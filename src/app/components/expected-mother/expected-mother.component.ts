import { ExpectedMother } from './../../models/index';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { exportPdf, exportExcel } from 'src/app/utils/export-utils';
import { ExpectedMotherWithDetails } from '../../models/index';


@Component({
  selector: 'app-expected-mother',
  templateUrl: './expected-mother.component.html',
  styleUrls: ['./expected-mother.component.scss']
})
export class ExpectedMotherComponent {


  items: MenuItem[] = [];
  mothers: ExpectedMotherWithDetails[] = [];
  editingMother: boolean =true;

  motherDialog: boolean = false;

  mother: ExpectedMother = {};
  submitted: boolean = false;
  columns: any[] = [];
  exportedData:any[] = [];

  constructor( private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService){}
  ngOnInit(): void {
    this.getData();

    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'Full Name', dataKey: 'name' },
      { header: 'Telephone', dataKey: 'telephone' },
      { header: 'Date Added', dataKey: 'dateAdded' },
    ]



    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
         exportPdf(this.exportedData,  this.columns, 'Expected-Mothers')
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
    this.apiService.getExpectedMothers().subscribe((data:any) => {
      console.log('admin', data);
     this.mothers = data;
     this.exportedData =this.mothers.map(data => { return  data.ExpectedMother})
    },
    err => {
      console.log('error',  err)
      if(err.status === 403 || 401){
        this.router.navigateByUrl('/login')
      }
    });
  }

  openNew() {
    this.mother = {};
    this.submitted = false;
    this.motherDialog = true;
  }

  editMother(mother: ExpectedMotherWithDetails) {
    this.editingMother = false;
    console.log(mother, this.editingMother);
    this.mother = { ...mother.ExpectedMother};
    this.motherDialog = true;
  }


  deleteMother(mother: ExpectedMotherWithDetails) {
    console.log(mother);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + mother.ExpectedMother.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteExpectedMother(mother.ExpectedMother.id).subscribe(
          (data: any) => {
            console.log('res', data);
            this.getData();
            this.noticeService.noticePopup('success', 'Successful', 'Expected Mother Deleted');
          },
          (err) => {
            console.log('error', err.error.detail);
            this.noticeService.noticePopup('error', 'Failure', err.error.detail);
          }
        );
      },
    });
  }

  hideDialog() {
    this.editingMother = true;
    this.motherDialog = false;
    this.submitted = false;
  }

  saveMother() {
    this.editingMother = true;
    console.log(this.mother);
    this.submitted = true;

    if (this.mother.id) {
      console.log(this.mother);
      const expectedMother = (({
        id,
        name,
        telephone,
      }) => ({
        id,
        name,
        telephone,
      }))(this.mother);
      this.apiService.updateExpectedMother(expectedMother).subscribe(
        (data: any) => {
          console.log('res', data);
          this.getData();
          this.noticeService.noticePopup('success', 'Successful', 'Expected Mother Updated');
        },
        (err) => {
          console.log('error', err.error.detail);
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    } else {
      const newMother = (({
        name,
        telephone,
      }) => ({
        name,
        telephone,
      }))(this.mother);
      console.log(newMother)
      this.apiService.addExpectedMother(newMother).subscribe(
        (data: any) => {
          console.log('res', data);
        this.getData();
          this.noticeService.noticePopup('success', 'Successful', 'Expected Mother Added');
        },
        (err) => {
          console.log(err)
          this.noticeService.noticePopup('error', 'Failure', err.error.detail);
        }
      );
    }
    this.motherDialog = false;
    this.mother = {};
  }



}
