export class Summary {

  public nombre: string = '';
  public apellido: string = '';
  public documento: number = 0;
  public nacimiento: string = '';
  public email: string = '';

  public numMobile: number = 0;
  public numPhone: number = 0;
  public provincia: any = {'id': 0, 'nombre': ''};
  public ciudad: any = {'id': 0, 'nombre': ''};
  public direccion: string = '';
  public usuario: string = '';

  public marca: any = {'codigo': 0, 'desc': ''};
  public year: number = 0;
  public modelo: string = '';
  public version: any = {'codigo': 0, 'desc': ''};

  public poliza: string = '';
  public granizo: boolean = false;
  public franquicia: number = 0;
  public costo: string = '';

  constructor() { }
}
