import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {StoreService} from "../../../../service/store.service";

@Component({
    selector: 'app-filters',
    standalone: true,
    imports: [
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelHeader,
        MatSelectionList,
        MatListOption,
        NgIf,
        NgForOf,
        MatButton,
        AsyncPipe
    ],
    template: `
        <mat-expansion-panel *ngIf="categories$ | async as categories">
            <mat-expansion-panel-header>
                <mat-panel-title> CATEGORIES</mat-panel-title>
            </mat-expansion-panel-header>
            <mat-selection-list [multiple]="false">
                <mat-list-option *ngFor="let category of categories" [value]="category">
                    <button (click)="onShowCategory(category)" mat-button>{{ category }}</button>
                </mat-list-option>
            </mat-selection-list>
        </mat-expansion-panel>
    `,
    styles: ``
})
export class FiltersComponent implements OnInit {
    @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();
    categories$: Observable<Array<string>> | undefined;

    constructor(private storeService: StoreService) {
    }

    onShowCategory(category: string): void {
        this.showCategory.emit(category);
    }

    ngOnInit(): void {
        this.categories$ = this.storeService.getAllCategories();
    }
}