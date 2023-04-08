import { Injectable } from '@angular/core';
import { AngularCode } from './types/AngularCode';
import { AngularCodeGenerator } from './types/AngularCodeGenerator';

@Injectable({
  providedIn: 'root',
})
export class CodeGeneratorService {
  constructor() {}

  generateAngularCode(keyboardEvent: KeyboardEvent
  ): AngularCode {
    const codeGenerator = new AngularCodeGenerator(keyboardEvent);

    return {
      htmlCode: codeGenerator.htmlCode(),
      typescriptCode: codeGenerator.typescriptCode(),
    };
  }
}
