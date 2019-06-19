import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { DisplayItem } from '../models/display-item';

 enum MoveDirectionEnum {
    Right = 1,
    Left = 2,
    Up = 3,
    Down = 4,
    Top = 5,
    Bottom = 6
}

@Component({
  selector: 'app-listbox-selector',
  templateUrl: './listbox-selector.component.html',
  styleUrls: ['./listbox-selector.component.scss']
})

export class ListboxSelectorComponent implements OnChanges {
    @Input('left-list-title') leftListTitle: string = "Items";
    @Input('right-list-title') rightListTitle: string = "Items";
    @Input('lists-scrollable') scrollable: boolean = true;
    @Input('sort-left') sortLeftItems: boolean = true;
    @Input('sort-right') sortRightItems: boolean = true;
    @Input('css-class') cssClass: string = "row";

    @Input() set rightListItems(items: DisplayItem[]) {
        this._rightListItems = items;
        this.checkAllItemsRightFlag = this.areAllItemsChecked(items);
        if (this.sortRightItems)
            this.rightListItems.sort(this.sortItemsFunc);
        this.rightListItemsChange.emit(this.rightListItems);
    }
    get rightListItems(): DisplayItem[] { return this._rightListItems; }

    @Input() set leftListItems(items: DisplayItem[]) {
        this._leftListItems = items;
        this.checkAllItemsLeftFlag = this.areAllItemsChecked(items);
        if (this.sortLeftItems)
            this.leftListItems.sort(this.sortItemsFunc);
        this.leftListItemsChange.emit(this.leftListItems);
    }
    get leftListItems(): DisplayItem[] { return this._leftListItems; }

    @Output() leftListItemsChange: EventEmitter<DisplayItem[]> = new EventEmitter<DisplayItem[]>();
    @Output() rightListItemsChange: EventEmitter<DisplayItem[]> = new EventEmitter<DisplayItem[]>();

    public checkAllItemsLeftFlag: boolean = false;
    public checkAllItemsRightFlag: boolean = false;
    public moveDirection = MoveDirectionEnum;

    private _leftListItems: DisplayItem[] = [];
    private _rightListItems: DisplayItem[] = [];

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        this.leftListItems = changes.leftListItems ? changes.leftListItems.currentValue : this.leftListItems;
        this.rightListItems = changes.rightListItems ? changes.rightListItems.currentValue : this.rightListItems;
    }

    public moveItems(direction: MoveDirectionEnum): void {
        if(direction === MoveDirectionEnum.Right) {
            this.leftListItems = this.performMove(this.leftListItems, this.rightListItems);
            this.rightListItems = this.rightListItems; //trigger setter
            this.checkAllItemsLeftFlag = false;
        }
        else {
            this.rightListItems = this.performMove(this.rightListItems, this.leftListItems);
            this.leftListItems = this.leftListItems; //trigger setter
            this.checkAllItemsRightFlag = false;
        }
    }

    public onListItemClick(displayItems: DisplayItem[], id: number): void {
        const item: DisplayItem = displayItems.find(x => x.id === id);
        item.checked = !item.checked;
        this.checkAllItemsLeftFlag = this.areAllItemsChecked(this.leftListItems);
        this.checkAllItemsRightFlag = this.areAllItemsChecked(this.rightListItems);
    }

    public checkAll = (value: boolean, items: DisplayItem[]): void => items.forEach(x => x.checked = value);

    protected sortItemsFunc = (a: DisplayItem, b: DisplayItem): number => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0);

    private areAllItemsChecked = (items: DisplayItem[]): boolean => items.length > 0 && items.every(x => x.checked);

    private performMove(from: DisplayItem[], to: DisplayItem[]): DisplayItem[] {
        return from.reduce((newLeftItems, oneItem) => {
            if (oneItem.checked) {
                const duplicate = to.find(x => x.id === oneItem.id);
                duplicate ? duplicate.checked = true : to.push(oneItem);
            }
            else
                newLeftItems.push(oneItem);
            return newLeftItems;
        }, []);
    }
}