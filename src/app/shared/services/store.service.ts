import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  /**
   * La reactividad permite a la vez que varios componentes se suscriban para estar
   * atentos a ciertos cambios de estado y poder actualizarse o desencadenar
   * cierta lógica en particular (diferente para cada uno de ellos).
   * 
   * Esto evita el tener que pasar datos por @Input y @Output de forma profunda o burbujearlos
   * hasta elementos padres de niveles altos.
   * 
   * Facilita la comunicación de información entre componentes no relacionados
   * 
   * Otra forma de hacerlo es a través de un servicio, pero en este caso la lógica se tendría declarda en el mismo
   */

  // Generar un Observable para nuestro carrito de compras, el cual transmitirá un listado de productos actualizado
  // Se pueden generar tantos Observables como queramos, todo depende de lo que queramos comunicar
  private myShoppingCartSource = new BehaviorSubject<Product[]>([]);
  myShoppingCart$ = this.myShoppingCartSource.asObservable();

  constructor() { }

  getMyShoppingCart(): Product[] {
    return this.myShoppingCart;
  }

  getTotal(): number {
    // Calcular el monto total de la compra, con base a los productos agregados al carrito - acumulador
   return this.myShoppingCart.reduce((sum, product) => sum + product.price, 0);
  }

  getNumberProducts(): number {
    return this.myShoppingCart.length;
  }

  addToShoppingCart(product: Product): void {
    this.myShoppingCart.push(product);
    // Cada vez que se agregue un nuevo producto al carrito, debo informar (trasmitir) a todos mis suscriptores que hay nuevos cambios en el carrito
    // Por tanto, transmito el listado de productos actualizado
    this.myShoppingCartSource.next(this.myShoppingCart);
  }
}
