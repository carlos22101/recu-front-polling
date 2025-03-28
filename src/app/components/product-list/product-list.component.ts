// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [ReactiveFormsModule,CommonModule]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  discountProducts$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
    this.discountProducts$ = this.productService.getDiscountProducts();
  }

  ngOnInit() {}
}