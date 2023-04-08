export class AngularCodeGenerator {
  private keyCode: string;
  private charCode: string;
  private isAltPressed: boolean;
  private isCtrlPressed: boolean;
  private isShiftPressed: boolean;
  private isMetaPressed: boolean;

  constructor(keyboardEvent: KeyboardEvent) {
    this.keyCode = keyboardEvent.key;
    this.charCode = keyboardEvent.code;
    this.isAltPressed = keyboardEvent.altKey;
    this.isCtrlPressed = keyboardEvent.ctrlKey;
    this.isShiftPressed = keyboardEvent.shiftKey;
    this.isMetaPressed = keyboardEvent.metaKey;
  }

  htmlCode(): string {
    const HTML_MARKUP = `
<input type="text" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)"/>
`;
    return HTML_MARKUP;
  }

  public typescriptCode(): string {
    const handleKeydown = this._generateHandler();
    const handleKeyup = this._generateHandler();

    const typescriptCode = `
import { Component } from '@angular/core';

@Component({
  selector: 'key-component',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css'],
})
export class KeyComponent {
  constructor() {}

  onKeydown(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Handle keydown event here.');
    ${handleKeydown}
  }

  onKeyup(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Handle keyup event here.');
    ${handleKeyup}
  }
}
`;
    return typescriptCode;
  }

  private _generateHandler(): string {
    const specialHandlerStart = this._generateSpecialHandlerStart();
    const specialHandlerEnd = this._generateSpecialHandlerEnd();
    const basicHandlerCode = `
      if (event.key === '${this.keyCode}') {
        // Do something
      }
      if (event.code === '${this.charCode}') {
        // Do something more.
      }
    `;
    const handlerCode = `
    ${specialHandlerStart}
    ${basicHandlerCode} 
    ${specialHandlerStart !== '' ? specialHandlerEnd : ''}
`;
    return handlerCode;
  }

  private _generateSpecialHandlerStart() {
    const altCondition = 'event.altKey';
    const ctrlCondition = 'event.ctrlKey';
    const shiftCondition = 'event.shiftKey';
    const metaCondition = 'event.metaKey';

    if (
      this.isAltPressed ||
      this.isCtrlPressed ||
      this.isShiftPressed ||
      this.isMetaPressed
    ) {
      let conditions = [];
      if (this.isAltPressed) conditions.push(altCondition);
      if (this.isCtrlPressed) conditions.push(ctrlCondition);
      if (this.isShiftPressed) conditions.push(shiftCondition);
      if (this.isMetaPressed) conditions.push(metaCondition);

      return `if(${conditions.join(' && ')}){`;
    } else {
      return '';
    }
  }

  private _generateSpecialHandlerEnd() {
    return '}'.padStart(4, '');
  }
}
