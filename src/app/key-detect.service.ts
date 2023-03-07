import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyDetectService {
  keydownSubject: Subject<KeyboardEvent>;
  keyupSubject: Subject<KeyboardEvent>;

  constructor() {
    this.keydownSubject = new Subject<KeyboardEvent>();
	this.keyupSubject = new Subject<KeyboardEvent>();
  }

  publishKeydownEvent(event: KeyboardEvent): void {
    this.keydownSubject.next(event);
  }

  publishKeyupEvent(event: KeyboardEvent): void {
	this.keyupSubject.next(event);
  }
}
