import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {

    if (!value || order === '' || !order) { return value; } // if its not an array...
    if (value.length <= 1) { return value; } // if the array has only one item, i don't need to order it
    if (!column || column === '') {
      if (order==='asc') { return value.sort(); }
      if (order==='desc') { return value.sort().reverse(); }
      else { return value; }
    } // sort 1d array

    return orderBy(value, [column], [order]);
  }

}
