import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

@Component({
    selector: 'app-products-header',
    standalone: true,
    imports: [
        MatCard,
        MatButton,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        MatIcon,
        MatIconButton
    ],
    template: `
        <mat-card class="mb-4">
            <div class="flex justify-between">
                <div>
                    <button mat-button [matMenuTriggerFor]="sortByMenu">
                        Sort by {{ sort }}
                        <mat-icon>expand_more</mat-icon>
                    </button>
                    <mat-menu #sortByMenu="matMenu">
                        <button (click)="onSortUpdated('desc')" mat-menu-item>desc</button>
                        <button (click)="onSortUpdated('asc')" mat-menu-item>asc</button>
                    </mat-menu>
                </div>
                <div class="flex items-center">
                    <div>
                        <button mat-button [matMenuTriggerFor]="menu">
                            Show {{ itemsShowCount }}
                            <mat-icon>expand_more</mat-icon>
                        </button>
                        <mat-menu #menu="matMenu">
                            <button (click)="onItemsUpdated(12)" mat-menu-item>12</button>
                            <button (click)="onItemsUpdated(24)" mat-menu-item>24</button>
                            <button (click)="onItemsUpdated(36)" mat-menu-item>36</button>
                        </mat-menu>
                    </div>
                    <div>
                        <button (click)="onColumnsUpdated(1)" mat-icon-button>
                            <mat-icon>view_list</mat-icon>
                        </button>
                        <button (click)="onColumnsUpdated(3)" mat-icon-button>
                            <mat-icon>view_module</mat-icon>
                        </button>
                        <button (click)="onColumnsUpdated(4)" mat-icon-button>
                            <mat-icon>view_comfy</mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </mat-card>
    `,
    styles: ``
})
export class ProductsHeaderComponent {
    @Output() columnsCountChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() itemsCountChange: EventEmitter<number> = new EventEmitter<number>();
    @Output() sortChange: EventEmitter<string> = new EventEmitter<string>();

    sort: string = "desc";
    itemsShowCount: number = 12;

    onSortUpdated(newSort: string): void {
        this.sort = newSort;
        this.sortChange.emit(this.sort);
    }

    onItemsUpdated(count: number): void {
        this.itemsShowCount = count;
        this.itemsCountChange.emit(this.itemsShowCount);
    }

    onColumnsUpdated(colsNumbers: number): void {
        this.columnsCountChange.emit(colsNumbers);
    }
}
