import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {CurrencyPipe, NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Product} from "../../../../models/product.model";

@Component({
    selector: 'app-product-box',
    standalone: true,
    imports: [
        MatCard,
        NgOptimizedImage,
        CurrencyPipe,
        MatIconButton,
        MatIcon,
        NgClass,
        NgIf
    ],
    template: `
        <mat-card [ngClass]="{'text-center': !fullWidthMode}">
            <div [ngClass]="{'flex': fullWidthMode}" class="ml-">
                <img class="mb-1 mx-auto h-1/4"
                     [ngClass]="{'h-1/4': !fullWidthMode, 'h-full': fullWidthMode}"
                     src="https://via.placeholder.com/150" alt="product img">
                <div class="w-full"
                     [ngClass]="{'px-8 flex flex-col justify-between':fullWidthMode}">
                    <div>
                        <h5>Shoes</h5>
                        <p class="truncate hover:whitespace-normal">Snickers</p>
                        <p *ngIf="fullWidthMode">Description</p>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="text-red-400">{{ '150' | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}</span>
                        <button mat-icon-button (click)="onAddToCart()">
                            <mat-icon class="text-gray-500">shopping_cart</mat-icon>
                        </button>
                    </div>
                </div>
            </div>
        </mat-card>
    `,
    styles: ``
})
export class ProductBoxComponent {
    @Input() fullWidthMode: boolean = false;
    @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();
    product: Product | undefined = {
        id: 1,
        title: "Snickers",
        price: 150,
        category: "Shoes",
        description: "Description",
        image: "https://via.placeholder.com/150",
    };

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}
