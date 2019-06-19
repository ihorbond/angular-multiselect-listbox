import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ListboxSelectorComponent } from './listbox-selector/listbox-selector.component';
import { ListboxComponent } from './listbox/listbox.component';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule
  ],
  declarations: [ AppComponent, HelloComponent, ListboxSelectorComponent, ListboxComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
