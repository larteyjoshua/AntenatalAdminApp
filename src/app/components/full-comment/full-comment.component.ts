import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { CommentWithDetails, Comment } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';
import { exportPdf, exportExcel } from 'src/app/utils/export-utils';

@Component({
  selector: 'app-full-comment',
  templateUrl: './full-comment.component.html',
  styleUrls: ['./full-comment.component.scss']
})
export class FullCommentComponent implements OnInit {

  items: MenuItem[] = [];
  comments: CommentWithDetails[] = [];

  comment: Comment = {};
  columns: any[] = [];
  exportedData:any[] = [];
  id: number = 0;


  constructor(
     private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService,
    private activatedRoute: ActivatedRoute){}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id')!);
    });
    this.getData(this.id);

    this.columns = [
      { header: 'id', dataKey: 'id' },
      { header: 'First Name', dataKey: 'first_name' },
      { header: 'Surname', dataKey: 'surname' },
      { header: 'Commented', dataKey: 'comment' },
      { header: 'Date Commented', dataKey: 'comment_date' },
      { header: 'Appointment Date', dataKey: 'Appointment_date' },
      { header: 'Phone Number', dataKey: 'telephone' },
    ]


    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
         exportPdf(this.exportedData,  this.columns, 'Full Comments')
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

  getData(id:number) {
    this.apiService.getAllCommentsByExpectedMother(id).subscribe((res:any) => {
     this.comments = res.body;
     this.exportedData =this.comments.map(data => {
      return {
       'id': data.Comment.id,
       'comment_date': new Date(data.Comment!.dateAdded!).toLocaleString(),
       'comment': data.Comment.message,
       'first_name': data.ExpectedMother.first_name,
       'surname': data.ExpectedMother.surname,
       'Appointment_date': data.Appointment.appointed_date,
       'telephone': data.ExpectedMother.telephone
     }}
      );
    },
    err => {
      if(err.status === 403 || 401){
        this.router.navigateByUrl('/login')
      }
    });
  }



  deleteComment(comment: Comment) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete Comment ' + comment.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteComment(comment.id).subscribe(
          (res: any) => {
            this.getData(this.id);
            this.noticeService.noticePopup('success', 'Successful', 'Comment Deleted');
          },
          (err) => {
            this.noticeService.noticePopup('error', 'Failure', err.error.detail);
          }
        );
      },
    });
  }

}
