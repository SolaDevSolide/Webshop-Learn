import {Component} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

const ROWS_HEIGHT: { [id: number]: number } = {1: 400, 3: 335, 4: 350};

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        ProductsHeaderComponent,
        MatDrawerContent,
        FiltersComponent,
        MatGridList,
        MatGridTile
    ],
    template: `
        <mat-drawer-container [autosize]="true" class="min-h-full max-w-7xl mx-auto border-x">
            <mat-drawer mode="side" opened="true" class="p-6">
                <app-filters (showCategory)="onShowCategory($event)"></app-filters>
            </mat-drawer>
            <mat-drawer-content class="p-6">
                <app-products-header (columnsCountChange)="onColumnsCountChange($event)">
                </app-products-header>
                <mat-grid-list
                        gutterSize="16"
                        [cols]="cols"
                        [rowHeight]="rowHeight"
                >
                    <mat-grid-tile>
            
                    </mat-grid-tile>
                </mat-grid-list>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    styles: ``
})
export class HomeComponent {
    cols: number = 3;
    rowHeight: number = ROWS_HEIGHT[this.cols];
    category: string | undefined;

    onColumnsCountChange(colsNumber: number): void {
        this.cols = colsNumber;
    }

    onShowCategory(newCategory: string): void {
        this.category = newCategory;
        this.rowHeight = ROWS_HEIGHT[this.cols];
    }
}
