import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Type } from '../models/type.enum';

@Injectable()
export class NameService {

    private sub: BehaviorSubject<Type> = BehaviorSubject.create(Type.DOLLAR);

    constructor() { }

    public newType(t: Type) {
        this.sub.next(t);
    }

    public getType(): Observable<Type> {
        return this.sub.asObservable();
    }
}
