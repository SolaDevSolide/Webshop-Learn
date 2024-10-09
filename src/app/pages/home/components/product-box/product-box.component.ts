import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
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
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <mat-card [ngClass]="{'text-center': !fullWidthMode}">
            <div [ngClass]="{'flex': fullWidthMode}" class="ml-">
                <img class="mb-1 mx-auto h-[200px]"
                     [ngClass]="{'h-[120px]': !fullWidthMode, 'h-[300px]': fullWidthMode}"
                     [src]="product?.image" alt="product img">
                <div class="w-full"
                     [ngClass]="{'px-8 flex flex-col justify-between':fullWidthMode}">
                    <div>
                        <h5>{{ product?.category }}</h5>
                        <p class="truncate hover:whitespace-normal">{{ product?.title }}</p>
                        <p *ngIf="fullWidthMode">{{ product?.description }}</p>
                    </div>
                    <div class="flex justify-center items-center">
                        <span class="text-red-400">{{ product?.price | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}</span>
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
    @Input() product: Product | undefined;

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}
