import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStars',
})
export class RatingStarsPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || value === 0){ // se o valor não exisstir, retorna sem avaliação
      return 'Sem avaliação';
    }

    const rounded = Math.round(value); // arredonda para a estrela cheia mais proxima

    let stars = ''

    for (let i = 0; i<5; i++){
      if (i < rounded){
        stars += '★' // adiciona uma sestrela xcheia
      } else{
        stars += '☆' // adiciona uma estrela vazia
      }
    }
    return `${stars} (${value})`;
  }
}


