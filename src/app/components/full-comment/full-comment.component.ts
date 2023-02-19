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
      { header: 'Full Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Telephone', dataKey: 'telephone' },
      { header: 'Date Added', dataKey: 'dateAdded' },
      { header: 'Status', dataKey: 'isActive' },
    ]


    this.items = [
      {
        label: 'PDF',
        icon: 'pi pi-file-pdf',
        command: () => {
         exportPdf(this.exportedData,  this.columns, 'Admins')
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
      console.log('comment', res.body);
     this.comments = res.body;
     this.exportedData =this.comments.map(data => { return  data})
    },
    err => {
      console.log('error',  err)
      if(err.status === 403 || 401){
        this.router.navigateByUrl('/login')
      }
    });
  }



  deleteComment(comment: Comment) {
    console.log(comment);
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete Comment ' + comment.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteComment(comment.id).subscribe(
          (res: any) => {
            console.log('res', res.body);
            this.getData(this.id);
            this.noticeService.noticePopup('success', 'Successful', 'Comment Deleted');
          },
          (err) => {
            console.log('error', err.error.detail);
            this.noticeService.noticePopup('error', 'Failure', err.error.detail);
          }
        );
      },
    });
  }

}
