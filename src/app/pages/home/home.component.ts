import {Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductBoxComponent} from "./components/product-box/product-box.component";
import {Product} from "../../models/product.model";
import {CartService} from "../../service/cart.service";

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
        MatGridTile,
        ProductBoxComponent
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
                        <app-product-box
                                class="w-full"
                                [fullWidthMode]="cols==1"
                                (addToCart)="onAddToCart($event)"></app-product-box>
                    </mat-grid-tile>
                </mat-grid-list>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    styles: ``
})
export class HomeComponent implements OnInit {
    cols: number = 3;
    rowHeight: number = ROWS_HEIGHT[this.cols];
    category: string | undefined;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
    }

    onColumnsCountChange(colsNumber: number): void {
        this.cols = colsNumber;
    }

    onShowCategory(newCategory: string): void {
        this.category = newCategory;
        this.rowHeight = ROWS_HEIGHT[this.cols];
    }

    onAddToCart(product: Product): void {
        this.cartService.addToCart({
            product: product.image,
            name: product.title,
            price: product.price,
            quantity: 1,
            id: product.id
        });
    }
}
