import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective {
  @Input('appHighlightCard') highlightColor: string = '#f0f0f0';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // define o estilo inicial para garantir uma boa transição
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease-in-out'
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor, 'scale(1.02)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null, 'scale(1)'); // remove o estilo ao sair
  }

  private highlight(color: string | null, transform: string) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      // se houver cor, usa uma sombra clara e mais forte
      color
        ? '0 8px 20px rgba(255, 255, 255, 0.2)'
        : // se não houver cor, usa uma sombra clara e mais suave
          '0 4px 12px rgba(255, 255, 255, 0.1)'
    );
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
  }
}
