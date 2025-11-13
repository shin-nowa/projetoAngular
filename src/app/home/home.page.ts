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
    try {
      this.products = await firstValueFrom(this.productService.getProducts());
    } catch (error) {
      console.error('Erro ao carregar produtos', error);
      // Aqui você poderia adicionar um Toast de erro para o usuário
    } finally {
      this.loading = false;
    }
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

  // --- MÉTODOS ADICIONADOS PARA CONTROLE DE VÍDEO ---

  /**
   * Inicia a reprodução de um elemento de vídeo.
   * @param video O elemento HTMLVideoElement a ser reproduzido.
   */
  playVideo(video: HTMLVideoElement) {
    // Garante que o vídeo está mudo (necessário para autoplay)
    video.muted = true; 
    
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Log de aviso caso o navegador bloqueie o autoplay
        console.warn('Autoplay do vídeo foi prevenido:', error);
      });
    }
  }

  /**
   * Pausa o vídeo e reseta seu tempo para o início.
   * @param video O elemento HTMLVideoElement a ser parado.
   */
  stopVideo(video: HTMLVideoElement) {
    video.pause();
    video.currentTime = 0; // Faz o vídeo voltar para o começo
  }
}

