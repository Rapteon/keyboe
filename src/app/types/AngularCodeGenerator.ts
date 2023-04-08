export class AngularCodeGenerator {
  private keyCode: string;
  private charCode: string;

  constructor(keyCode: string, charCode: string) {
    this.keyCode = keyCode;
    this.charCode = charCode;
  }

  htmlCode(): string {
    const HTML_MARKUP = `
<input type="text" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)"/>
`;
    return HTML_MARKUP;
  }

  public typescriptCode(
    isAltPressed: boolean,
    isCtrlPressed: boolean,
    isMetaPressed: boolean
  ): string {
    const handleKeydown = this._generateHandler(
      isAltPressed,
      isCtrlPressed,
      isMetaPressed
    );
    const handleKeyup = this._generateHandler(
      isAltPressed,
      isCtrlPressed,
      isMetaPressed
    );

    const typescriptCode = `
import { Component } from '@angular/core';

@Component({
  selector: 'key-component',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css'],
})
export class KeyComponent {
  constructor() {}

  keyDown(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Handle keydown event here.');
    ${handleKeydown}
  }

  keyUp(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();
    console.log('Handle keyup event here.');
    ${handleKeyup}
  }
}
`;
    return typescriptCode;
  }

  private _generateHandler(
    isAltPressed: boolean,
    isCtrlPressed: boolean,
    isMetaPressed: boolean
  ): string {
    const handlerCode = `
    ${this._generateSpecialHandler(isAltPressed, isCtrlPressed, isMetaPressed)}
    if (event.code === '${this.keyCode}') {
      // Do something
    }
    if (event.code === '${this.charCode}') {
      // Do something else.
    }
`;
    return handlerCode;
  }

  private _generateSpecialHandler(
    isAltPressed: boolean,
    isCtrlPressed: boolean,
    isMetaPressed: boolean
  ) {
    const altHandler = 'event.altKey';
    const ctrlHandler = 'event.ctrlKey';
    const metaHandler = 'event.metaKey';

    if (isAltPressed || isCtrlPressed || isMetaPressed) {
      let conditions = []
      if (isAltPressed)
        conditions.push(altHandler);
      if (isCtrlPressed)
        conditions.push(ctrlHandler);
      if (isMetaPressed)
        conditions.push(metaHandler);

      return `if(${conditions.join(' && ')}){
      // Do your stuff here.
    }`
    }
    else {
      return '';
    }
  }
}
