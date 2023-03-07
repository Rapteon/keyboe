import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyDisplayComponent } from './key-display/key-display.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, KeyboardComponent, KeyDisplayComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
