import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charReplace'
})
export class CharReplacePipe implements PipeTransform {

  /**
   * Recibe un string, un caracter a reemplazar y un caracter de reemplazo. Devuelve el string con los caracteres reemplazados.
   * @param value string a evaluar
   * @param chrToReplace caracter que se quiere reemplazar
   * @param replacementChr caracter por el cual se quiere reemplazar
   */
  transform(value: string, chrToReplace: string, replacementChr: string): string {

    if (!value || !chrToReplace || !replacementChr) {
      return value;
    }
    return value.replace(new RegExp(chrToReplace, 'g'), replacementChr);
  }

}
