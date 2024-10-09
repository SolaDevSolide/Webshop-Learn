import {Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ProductsHeaderComponent} from "./components/products-header/products-header.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {ProductBoxComponent} from "./components/product-box/product-box.component";
import {Product} from "../../models/product.model";
import {CartService} from "../../service/cart.service";
import {BehaviorSubject, combineLatest, Observable, switchMap} from "rxjs";
import {StoreService} from "../../service/store.service";
import {AsyncPipe, NgForOf} from "@angular/common";

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
        ProductBoxComponent,
        NgForOf,
        AsyncPipe

    ],
    template: `
        <mat-drawer-container [autosize]="true" class="min-h-full max-w-7xl mx-auto border-x">
            <mat-drawer mode="side" opened="true" class="p-6">
                <app-filters (showCategory)="onShowCategory($event)"></app-filters>
            </mat-drawer>
            <mat-drawer-content class="p-6">
                <app-products-header (columnsCountChange)="onColumnsCountChange($event)"
                                     (itemsCountChange)="onItemsCountChange($event)"
                                     (sortChange)="onSortChange($event)">
                </app-products-header>
                <mat-grid-list
                        gutterSize="16"
                        [cols]="cols"
                        [rowHeight]="rowHeight"
                >
                    <mat-grid-tile *ngFor="let product of products$ | async">
                        <app-product-box
                                [product]="product"
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
    products$: Observable<Array<Product>> | undefined;
    sortSubject: BehaviorSubject<string> = new BehaviorSubject<string>('desc');
    countSubject: BehaviorSubject<string> = new BehaviorSubject<string>('12');
    categorySubject: BehaviorSubject<string> = new BehaviorSubject<string>('All')

    constructor(
        private cartService: CartService,
        private storeService: StoreService
    ) {
    }

    ngOnInit(): void {
        this.products$ = combineLatest([
            this.countSubject,
            this.sortSubject,
            this.categorySubject
        ])
            .pipe(
                switchMap(([count, sort, category]) => {
                    if (category === 'All' || !category) {
                        return this.storeService.getAllProducts(count, sort);
                    } else {
                        return this.storeService.getProductsByCategory(category, count, sort);
                    }
                })
            );
    }

    onColumnsCountChange(colsNum: number): void {
        this.cols = colsNum;
        this.rowHeight = ROWS_HEIGHT[colsNum];
    }

    onItemsCountChange(count: number): void {
        this.countSubject.next(count.toString());
    }

    onSortChange(sort: string): void {
        this.sortSubject.next(sort);
    }

    onShowCategory(newCategory: string): void {
        this.categorySubject.next(newCategory);
    }

    onAddToCart(product: Product): void {
        this.cartService.addToCart({
            product: product.image,
            name: product.title,
            price: product.price,
            quantity: 1,
            id: product.id,
        });
    }
}