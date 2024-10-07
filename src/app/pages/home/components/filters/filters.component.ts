import {Component, EventEmitter, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

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
        MatButton
    ],
    template: `
        <mat-expansion-panel *ngIf="categories">
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
export class FiltersComponent {
    @Output() showCategory: EventEmitter<string> = new EventEmitter<string>();

    categories: string[] = ["shoes", "sports"];

    onShowCategory(category: string): void {
        this.showCategory.emit(category);
    }
}
