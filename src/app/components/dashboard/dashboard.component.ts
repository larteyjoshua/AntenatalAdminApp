import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CommentWithDetails, DashboardSummary, Summaries, GroupAppointment } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { ToastNoticeService } from 'src/app/services/toast-notice.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardSummary: DashboardSummary = {};
  summary: Summaries[] = [];
  today: Date = new Date;
  basicData: any;
  basicOptions: any;
  comments: CommentWithDetails[] = [];
  groupAppointment: GroupAppointment = {};
  labels: any[] = [];
  data: any[] = [];
  public innerWidth: any;
  chartWith: string = '800px';

  constructor( private apiService: ApiService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private noticeService: ToastNoticeService){}

    @HostListener('window:resize', ['$event'])
  onResize() {
  this.innerWidth = window.innerWidth;
}

  ngOnInit(): void {
  this.getData();
  this.innerWidth = window.innerWidth;

   if (this.innerWidth <= 480){
    this.chartWith  = '300px'
   }  else if (this.innerWidth >= 480 && this.innerWidth <= 1024) {
    this.chartWith = '600px'
   }
    else {
    this.chartWith = '800px'
   }
  }

  getData() {
    this.apiService.getDashboardSummaries().subscribe((res:any) => {
     this.dashboardSummary = res.body;
     this.summary = this.dashboardSummary.summaries!;
     this.labels = this.dashboardSummary.groupedAppointment?.date!;
     this.data = this.dashboardSummary.groupedAppointment?.totalAttended!;
     this.labels = this.labels.slice(0,4);
     this.data = this.data.slice(0,4);

     this.basicData = {
      labels: this.labels,
      datasets: [
          {
              label: 'Attendance',
              backgroundColor: '#42A5F5',
              data: this.data
          },

      ]
  };

    },
    err => {
      if(err.status === 403 || 401){
        this.router.navigateByUrl('/login')
      }
    });

    this.apiService.getAllComments().subscribe((res:any) => {
     this.comments = res.body.slice(0,4);

    },
    err => {
      if(err.status === 403 || 401){
        this.router.navigateByUrl('/login')
      }
    });
  }



}
