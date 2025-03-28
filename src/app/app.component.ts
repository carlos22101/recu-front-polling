import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    ProductFormComponent, 
    ProductListComponent
  ],
  providers: [ProductService]
})
export class AppComponent {
  title = 'Gestión de Productos';
}