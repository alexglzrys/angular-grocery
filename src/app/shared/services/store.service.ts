import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];

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
  }
}
