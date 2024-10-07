import {Component, OnInit} from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {MatCard} from "@angular/material/card";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {CurrencyPipe, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {CartService} from "../../service/cart.service";

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [
        MatCard,
        MatButton,
        RouterLink,
        NgIf,
        MatTable,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatFooterRow,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatFooterCell,
        MatFooterCellDef,
        MatRowDef,
        MatFooterRowDef,
        CurrencyPipe,
        MatMiniFabButton,
        MatIcon,
        MatIconButton
    ],
    template: `
        <mat-card *ngIf="cart.items.length" class="max-w-7xl mx-auto">
            <table mat-table [dataSource]="dataSource"
                   class="mat-elevation-z8 w-full">
                <ng-container matColumnDef="product">
                    <th mat-header-cell *matHeaderCellDef>Product</th>
                    <td mat-cell *matCellDef="let element">
                        <img src="{{element.product}}" alt="product" class="w-[100px] my-5"/>
                    </td>
                    <td mat-footer-cell *matFooterCellDef>
                        <button mat-raised-button routerLink="/home">Continue shopping</button>
                    </td>
                </ng-container>
                <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Name</th>
                    <td mat-cell *matCellDef="let element">
                        <span class="truncate max-w-xs block">{{ element.name }}</span>
                    </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>
                <ng-container matColumnDef="price">
                    <th mat-header-cell *matHeaderCellDef>Price</th>
                    <td mat-cell *matCellDef="let element">
                        <span class="truncate max-w-xs block">{{ element.price | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}</span>
                    </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>
                <ng-container matColumnDef="quantity">
                    <th mat-header-cell *matHeaderCellDef>Quantity</th>
                    <td mat-cell *matCellDef="let element">
                        <div class="items-center justify-start flex">
                            <button mat-icon-button (click)="onRemoveQuantity(element)">
                                <mat-icon>remove</mat-icon>
                            </button>
                            <span class="truncate max-w-xs">{{ element.quantity }}</span>
                            <button mat-icon-button (click)="onAddQuantity(element)">
                                <mat-icon>add</mat-icon>
                            </button>
                        </div>
                    </td>
                    <td mat-footer-cell *matFooterCellDef></td>
                </ng-container>
                <ng-container matColumnDef="total">
                    <th mat-header-cell *matHeaderCellDef>Total</th>
                    <td mat-cell *matCellDef="let element">
                        <span class="truncate max-w-xs block">{{ element.price * element.quantity | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}</span>
                    </td>
                    <td mat-footer-cell *matFooterCellDef>
            <span class="font-bold py-5 block">
              {{ getTotal(cart.items) | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}
            </span>
                    </td>
                </ng-container>
                <ng-container matColumnDef="action">
                    <th mat-header-cell *matHeaderCellDef>
                        <button mat-raised-button (click)="onClearCart()" class="float-right">Clear All</button>
                    </th>
                    <td mat-cell *matCellDef="let element">
                        <button mat-mini-fab (click)="onRemoveFromCart(element)" class="float-right">
                            <mat-icon>close</mat-icon>
                        </button>
                    </td>
                    <td mat-footer-cell *matFooterCellDef>
                        <button mat-raised-button color="primary" class="float-right">
                            Proceed To Checkout
                        </button>
                    </td>
                </ng-container>


                <tr mat-header-row *matHeaderRowDef="displayColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayColumns"></tr>
                <tr mat-footer-row *matFooterRowDef="displayColumns"></tr>
            </table>
        </mat-card>
        <mat-card *ngIf="!cart.items.length" class="max-w-7xl mx-auto">
            <p>
                Your cart is empty.
                <button mat-raised-button routerLink="/home">Start shopping</button>
            </p>
        </mat-card>
    `,
    styles: ``
})
export class CartComponent implements OnInit {
    cart: Cart = {
        items: [
            {
                product: "https://via.placeholder.com/150",
                name: "snickers",
                price: 150,
                quantity: 1,
                id: 1,
            }
        ]
    };
    dataSource: Array<CartItem> = [];
    displayColumns: Array<string> = [
        'product',
        'name',
        'price',
        'quantity',
        'total',
        'action'
    ];

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.dataSource = this.cart.items;
        this.cartService.cart.subscribe((_cart: Cart): void => {
            this.cart = _cart;
            this.dataSource = this.cart.items;
        });
    }

    getTotal(items: Array<CartItem>): number {
        return this.cartService.getTotal(items);
    }

    onClearCart(): void {
        this.cartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
        this.cartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem): void {
        this.cartService.addToCart(item);
    }

    onRemoveQuantity(item: CartItem): void {
        this.cartService.removeQuantity(item);
    }
}