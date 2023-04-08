import { Component } from '@angular/core';
import { CodeGeneratorService } from '../code-generator.service';
import { KeyDetectService } from '../key-detect.service';
import { AngularCode } from '../types/AngularCode';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.css'],
})
export class CodeGeneratorComponent {
  private static angularTemplate = `
  <input type="text" (keydown)=
  `;
  htmlCode?: string;
  typescriptCode?: string;

  constructor(
    private keyDetectService: KeyDetectService,
    private codeGeneratorService: CodeGeneratorService
  ) {}

  ngOnInit(): void {
    this.keyDetectService.keydownSubject.subscribe((keyboardEvent) => {
      const isAltPressed = keyboardEvent.altKey;
      const isCtrlPressed = keyboardEvent.ctrlKey;
      const isMetaPressed = keyboardEvent.metaKey;
      console.log(`Alt ${isAltPressed}`);
      console.log(`Ctrl ${isCtrlPressed}`);
      console.log(`Meta ${isMetaPressed}`);
      const angularCode =
        this.codeGeneratorService.generateAngularCode(keyboardEvent);
      this._setCode(angularCode);
    });
  }

  private _setCode(angularCode: AngularCode) {
    this.htmlCode = hljs.highlight(angularCode.htmlCode, {
      language: 'html',
    }).value;
    this.typescriptCode = hljs.highlight(angularCode.typescriptCode, {
      language: 'typescript',
    }).value;
  }
}
