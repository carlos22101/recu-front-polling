
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      code: ['', Validators.required],
      discount: [false]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        ...this.productForm.value,
        id: '',
        createdAt: new Date()
      };

      this.productService.createProduct(newProduct)
        .subscribe(() => {
          this.productForm.reset({ price: 0, discount: false });
        });
    }
  }
}