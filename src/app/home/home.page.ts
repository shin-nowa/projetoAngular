import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../services/product.service';
import { HighlightCardDirective } from '../diretivas/highlight-card.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, HighlightCardDirective],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    this.loading = true;
    this.products = await firstValueFrom(this.productService.getProducts());
    this.loading = false;
  }

  imageFor(p: any) {
    // adapta vários formatos (images array, image string)
    if (p.images && Array.isArray(p.images) && p.images.length)
      return p.images[0];
    // alguns JSONs usam 'image'
    // @ts-ignore
    if ((p as any).image) return (p as any).image;
    return 'assets/placeholder.png';
  }
}
