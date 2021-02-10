import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charReplace'
})
export class CharReplacePipe implements PipeTransform {

  transform(value: string, chrToReplace: string, replacementChr: string): string {
    if (!value || !chrToReplace || !replacementChr) {
      return value;
    }
    return value.replace(new RegExp(chrToReplace, 'g'), replacementChr);
  }

}
