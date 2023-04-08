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
}
