import { Component } from '@angular/core';
import { KeyDetectService } from './key-detect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'keyboe';
  constructor(private keyDetectService: KeyDetectService) {}

  keyDown(event: Event) {
    event.preventDefault();
    console.log(event);
  }

  print(): void {
    console.log('Pressed');
  }
}
