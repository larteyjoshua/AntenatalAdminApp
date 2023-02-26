import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  visibleSidebar: boolean = false;
  items: MenuItem[] = [];
  constructor(
    private transferService: TransferService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.transferService.buttonClick.subscribe((option: any) => {
      this.visibleSidebar = option;
    });
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigateByUrl('/layout/dashboard');
          this.visibleSidebar = false;
        },
      },
      {
        label: 'Appointments',
        icon: 'pi pi-calendar-plus',
        command: () => {
          this.router.navigateByUrl('/layout/appointment');
          this.visibleSidebar = false;
        },
      },
      {
        label: 'Expected Mothers',
        icon: 'pi pi-users',
        command: () => {
          this.router.navigateByUrl('/layout/expected-mother');
          this.visibleSidebar = false;
        },
      },
      {
        label: 'Comments',
        icon: 'pi pi-whatsapp',
        command: () => {
          this.router.navigateByUrl('/layout/comment');
          this.visibleSidebar = false;
        },
      },
      {
        label: 'Send Message',
        icon: 'pi pi-send',
        command: () => {
          this.router.navigateByUrl('/layout/send-text-message');
          this.visibleSidebar = false;
        },
      },
      {
        label: 'Admins',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigateByUrl('/layout/admin');
          this.visibleSidebar = false;
        },
      },
    ];
  }
}
