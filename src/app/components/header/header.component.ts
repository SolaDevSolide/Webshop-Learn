import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatBadge} from "@angular/material/badge";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {CurrencyPipe, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';


// Register the locale data for 'fr-FR'
registerLocaleData(localeFr);

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbar,
        RouterLink,
        MatIcon,
        MatBadge,
        MatIconButton,
        MatMenuTrigger,
        MatMenu,
        CurrencyPipe
    ],
    template: `
        <mat-toolbar>
            <div class="max-w-7xl mx-auto border-x justify-between">

            </div>
            <a routerLink="home"> The only store you will need</a>

            <span class="flex-1"></span>

            <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon
                        [matBadge]="1"
                        matBadgeColor="warn"
                        aria-hidden="false"
                        aria-label="Shopping Cart with 1 item"
                >shopping_cart
                </mat-icon>
            </button>
            <mat-menu #menu="matMenu">
                <div class="p-3 divide-y divide-solid">
                    <div class="pb-3 flex justify-between">
                        <span class="mr-16">1 items</span>
                        <a routerLink="cart">View Cart</a>
                    </div>
                    <div class="py-3">
                        <div class="flex justify-between font-light mb-2">
                            Keyboard x 1
                            <span class="font-bold">{{ '150' | currency:'EUR':'symbol':'1.0-0':'fr-FR' }}</span>
                        </div>
                        <div class="pt-3 flex justify-between">
                            <button class="bg-rose-600 text-white rounded-full w-9 h-9">
                                <mat-icon>remove_shopping_cart</mat-icon>
                            </button>
                            <button
                                    routerLink="cart"
                                    class="bg-green-600 text-white rounded-full w-9 h-9">
                                <mat-icon>shopping_cart</mat-icon>
                            </button>
                        </div>
                    </div>
                </div>

            </mat-menu>

        </mat-toolbar>
    `,
    styles: ``
})
export class HeaderComponent {

}
