import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnServiceService {

  private subj: Subject<number> = new Subject();

  constructor() { }

  public newInput(value: number) {
    console.log(value);
    this.subj.next(value);
  }

  public getInputObservable(): Observable<number> {
    return this.subj.asObservable();
  }
}
