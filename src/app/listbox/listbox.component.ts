import { Component, Input } from '@angular/core';
import { DisplayItem } from '../models/display-item';

@Component({
  selector: 'app-listbox',
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
})

export class ListboxComponent {
  @Input() items: DisplayItem[];
  @Input() onClickCallback: (items: DisplayItem[], id: number) => void;
  constructor() { }

}