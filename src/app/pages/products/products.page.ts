import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LoopOfDirective } from 'src/app/diretivas/loop.directive';
import { HighlightCardDirective } from 'src/app/diretivas/highlight-card.directive';
import { PriceColorDirective } from 'src/app/diretivas/price-color.directive';
import { RatingStarsPipe } from "../../pipes/rating-stars-pipe";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    HighlightCardDirective,
    PriceColorDirective,
    RatingStarsPipe
],
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  error: string = '';
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('api retorna:', res);
        this.products = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Erro ao carregar produtos: ' + err.message;
        this.loading = false;
        console.error('Erro ao carregar produtos:', err);
      },
    });
  }
}
