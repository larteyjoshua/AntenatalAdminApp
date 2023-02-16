import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransferService {
  public buttonClick = new Subject()

  constructor() { }
}
