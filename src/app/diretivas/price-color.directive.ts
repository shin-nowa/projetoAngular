import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPriceColor]',
  standalone: true,
})
export class PriceColorDirective implements OnInit {
  // o valor do preço que será passado para a diretiva
  @Input('appPriceColor') priceValue: number = 0;

  // o limite para considerar um preço 'baixo'
  private lowPriceThreshold: number = 50;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    let color: string;

    if (this.priceValue < this.lowPriceThreshold) {
      // preço baixo: cor verde para destacar como "promoção" ou "bom negócio"
      color = '#28a745';
    } else if (this.priceValue > 500) {
      // preço alto: cor azul escura para produtos premium
      color = '#0059ff';
    } else {
      // preço normal: cor padrão
      color = '#1a1a1a';
    }

    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }
}
