import {Injectable} from '@angular/core';
import {from, map, Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    private readonly STORE_BASE_URL: string = 'https://fakestoreapi.com';

    getAllProducts(limit: string = "12", sort: string = "desc"): Observable<Array<Product>> {
        const url = `${this.STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`;

        // Use the fetch API and convert the result to an observable
        return from(fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            }))
            .pipe(
                map((data: Array<Product>) => data) // Cast the fetched data to an array of Product
            );
    }

    getAllCategories(): Observable<Array<string>> {
        const url = `${this.STORE_BASE_URL}/products/categories`;

        // Use the fetch API and convert the result to an observable
        return from(fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            }))
            .pipe(
                // Since the endpoint returns an array of strings, we can directly cast it.
                map((data: Array<string>) => data)
            );
    }
}
