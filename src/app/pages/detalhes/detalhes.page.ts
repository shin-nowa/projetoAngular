import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonImg,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { PriceColorDirective } from 'src/app/diretivas/price-color.directive';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonImg,
    CommonModule,
    FormsModule,
    PriceColorDirective,
  ],
})
export class DetalhesPage implements OnInit {
  product?: Product;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar produto: ' + err.message;
          this.loading = false;
          console.error('Erro ao carregar produto:', err);
        },
      });
    }
  }
}
