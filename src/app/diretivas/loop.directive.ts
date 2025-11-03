import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// Definindo o contexto que será exposto ao template (o item e o índice)
interface LoopOfContext<T> {
  $implicit: T; // O item atual na iteração (usado com 'let item')
  index: number; // O índice da iteração (usado com 'let i = index')
}

@Directive({
  selector: '[appLoopOf]',
  standalone: true,
})
export class LoopOfDirective<T> {
  constructor(
    private templateRef: TemplateRef<LoopOfContext<T>>, // O template a ser repetido
    private viewContainer: ViewContainerRef // O container onde as instâncias serão criadas
  ) {}

  // Recebe o array no qual a iteração ocorrerá: *appLoopOf="let item of items"
  @Input() set appLoopOf(items: T[] | null | undefined) {
    this.viewContainer.clear(); // 1. Limpa todas as views existentes

    if (!items || items.length === 0) {
      return; // 2. Não faz nada se o array for nulo ou vazio
    }

    // 3. Itera sobre o array e cria uma view para cada item
    items.forEach((item, index) => {
      // Cria a view e passa o CONTEXTO: o item e o índice
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: index,
      });
    });
  }

  // Permite inferência de tipo (sintaxe 'let item of items')
  static ngTemplateContextGuard<T>(
    dir: LoopOfDirective<T>,
    ctx: any
  ): ctx is LoopOfContext<T> {
    return true;
  }
}
