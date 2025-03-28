// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject = new BehaviorSubject<Product[]>([]);
  private discountProductsSubject = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.startPolling();
    this.startDiscountPolling();
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product);
  }

  private startPolling() {
    interval(5000).pipe(
      startWith(0),
      switchMap(() => this.http.get<Product[]>(`${environment.apiUrl}/polling`))
    ).subscribe(products => {
      this.productSubject.next(products);
    });
  }

  private startDiscountPolling() {
    interval(5000).pipe(
      startWith(0),
      switchMap(() => this.http.get<Product[]>(`${environment.apiUrl}/discount-polling`))
    ).subscribe(discountProducts => {
      this.discountProductsSubject.next(discountProducts);
    });
  }

  getProducts(): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  getDiscountProducts(): Observable<Product[]> {
    return this.discountProductsSubject.asObservable();
  }
}