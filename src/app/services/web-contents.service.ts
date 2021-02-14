import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebContentsService {

  advantagesList: any[] = [
    {icon: 'assets/icons/done-24px.svg', content: 'Ventaja 1 sobre la competencia, ¡la mas importante!'},
    {icon: 'assets/icons/done-24px.svg', content: 'Ventaja 2, bastante importante'},
    {icon: 'assets/icons/done-24px.svg', content: 'Ventaja 3, destacable e innovadora'},
    {icon: 'assets/icons/done-24px.svg', content: 'Ventaja 4, muy práctica'}
  ];

  constructor() { }

  /**
   * Recibe una lista de objetos representando el path a un ícono y el contenido (texto) del item, que luego se mostrará en una lista.
   * @param itemList objeto de formato {icon: string, content: string}.
   */
  setList(itemList: any[]) {

    this.advantagesList = itemList;
  }

  /**
   * Devuelve la lista almacenada en el servicio
   */
  getAdvantages():any[] {

    return this.advantagesList;
  }
}
