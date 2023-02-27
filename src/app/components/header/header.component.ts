import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TokenService } from '../../services/token.service';
import { TransferService } from '../../services/transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  constructor(private transferService: TransferService,
    private tokenService: TokenService,
    private router: Router){}
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigateByUrl('/layout/profile')

        }
      },

    {
        label: 'logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout()
        }
    }
  ]
}

toggleToShow(){
  this.transferService.buttonClick.next(true)
}

logout(){
  this.tokenService.signOut();
  this.router.navigateByUrl('/')
}

}
