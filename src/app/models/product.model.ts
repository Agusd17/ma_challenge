export class Product {
  constructor(
    public numero: number,
    public costo: number,
    public producto: string,
    public texto: string,
    public franquicia: number,
    public codigoProducto: number,
    public titulo: string,
    public descripcion: string,
    public puntaje: number,
    public granizo: boolean
  ) {
    this.numero = numero;
    this.costo = costo;
    this.producto = producto;
    this.texto = texto;
    this.franquicia = franquicia;
    this.codigoProducto = codigoProducto;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.puntaje = puntaje;
    this.granizo = granizo;
  }
}
