import { Component } from '@angular/core';
import { DisplayItem } from './models/display-item';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent  {
  name = 'List Box Selector';
  lItems: DisplayItem[] = [
    {
      id: 1,
      description: "Test",
      checked: false,
      disabled: false
    },
    {
      id: 2,
      description: "Test2",
      checked: false,
      disabled: false
    }
  ]
  rItems = [
    {
      id: 3,
      description: "Test3",
      checked: false,
      disabled: false
    },
    {
      id: 4,
      description: "Test4",
      checked: false,
      disabled: false
    },
  ]
}
