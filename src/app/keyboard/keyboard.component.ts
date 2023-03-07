import { Component } from '@angular/core';
import { KeyDetectService } from '../key-detect.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css'],
})
export class KeyboardComponent {
  constructor(private keyDetectService: KeyDetectService) {}

  keyDown(event: KeyboardEvent) {
    event.preventDefault();
    console.log(`KeyDown: ${event.code}`);
    this.keyDetectService.publishKeydownEvent(event);
  }

  keyUp(event: KeyboardEvent) {
    event.preventDefault();
    console.log(`KeyUp: ${event.code}`);
    this.keyDetectService.publishKeyupEvent(event);
  }
}
