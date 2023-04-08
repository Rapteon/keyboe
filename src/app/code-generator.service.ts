import { Injectable } from '@angular/core';
import { AngularCode } from './types/AngularCode';
import { AngularCodeGenerator } from './types/AngularCodeGenerator';

@Injectable({
  providedIn: 'root',
})
export class CodeGeneratorService {
  constructor() {}

  generateAngularCode(
    keyCodes: string,
    charCodes: string,
    isAltPressed: boolean,
    isCtrlPressed: boolean,
    isMetaPressed: boolean
  ): AngularCode {
    const codeGenerator = new AngularCodeGenerator(keyCodes, charCodes);

    return {
      htmlCode: codeGenerator.htmlCode(),
      typescriptCode: codeGenerator.typescriptCode(isAltPressed, isCtrlPressed, isMetaPressed),
    };
  }
}
