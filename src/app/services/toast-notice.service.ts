import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastNoticeService {

  constructor(
    private messageService: MessageService
  ) { }

  noticePopup(severity: string, summary: string, details: string) {
    this.messageService.add({
      severity:severity,
      summary: summary,
      detail: details,
      life: 3000,
    });

  }
}
