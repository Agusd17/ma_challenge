import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  /**
   * Recibe un array de objetos, un orden ascendente o descendente y opcionalmente, una columna. Devuelve el array ordenado.
   * @param value array a ordenar.
  * @param order 'asc' para orden ascendente o 'desc' para orden descendente.
   * @param column (opcional) columna por la cual ordenar.
   */
  transform(value: any[], order = '', column: string = ''): any[] {

    if (!value || order === '' || !order) { return value; }
    if (value.length <= 1) { return value; }
    if (!column || column === '') {
      if (order==='asc') { return value.sort(); }
      if (order==='desc') { return value.sort().reverse(); }
      else { return value; }
    }

    return orderBy(value, [column], [order]);
  }

}
