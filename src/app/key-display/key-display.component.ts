import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { KeyDetectService } from '../key-detect.service';

@Component({
  selector: 'app-key-display',
  templateUrl: './key-display.component.html',
  styleUrls: ['./key-display.component.css'],
})
export class KeyDisplayComponent implements OnInit {
  keydownSubscription!: Subscription;
  keyupSubscription!: Subscription;
  isControlPressed: boolean;
  isMetaPressed: boolean;
  isAltPressed: boolean;
  isShiftPressed: boolean;
  keyCode: string;
  charCode: string;

  constructor(private keyDetectService: KeyDetectService) {
    this.isControlPressed = false;
    this.isMetaPressed = false;
    this.isAltPressed = false;
    this.isShiftPressed = false;
    this.keyCode = '—';
    this.charCode = '—';
  }

  ngOnInit(): void {
    this.keydownSubscription = this.keyDetectService.keydownSubject.subscribe(
      (keyboardEvent) => {
        if (
          keyboardEvent.code === 'ControlLeft' ||
          keyboardEvent.code === 'ControlRight'
        )
          this.isControlPressed = true;
        else if (keyboardEvent.code === 'Meta') this.isMetaPressed = true;
        else if (
          keyboardEvent.code === 'AltLeft' ||
          keyboardEvent.code === 'AltRight'
        )
          this.isAltPressed = true;
        else if (
          keyboardEvent.code === 'ShiftLeft' ||
          keyboardEvent.code === 'ShiftRight'
        )
          this.isShiftPressed = true;
        this.keyCode = keyboardEvent.key;
        this.charCode = keyboardEvent.code;
      }
    );
    this.keyupSubscription = this.keyDetectService.keyupSubject.subscribe(
      (keyboardEvent) => {
        if (
          keyboardEvent.code === 'ControlLeft' ||
          keyboardEvent.code === 'ControlRight'
        )
          this.isControlPressed = false;
        else if (keyboardEvent.code === 'Meta') this.isMetaPressed = false;
        else if (
          keyboardEvent.code === 'AltLeft' ||
          keyboardEvent.code === 'AltRight'
        )
          this.isAltPressed = false;
        else if (
          keyboardEvent.code === 'ShiftLeft' ||
          keyboardEvent.code === 'ShiftRight'
        )
          this.isShiftPressed = false;
        this.keyCode = '—';
        this.charCode = '—';
      }
    );
  }
}
