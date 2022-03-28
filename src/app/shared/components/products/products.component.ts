import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  count: number = 0;
  total: number = 0;
  products: Product[] = [
    {
      id: '1',
      name: 'Mandarina',
      price: 15.50,
      image: 'https://www.hola.com/imagenes/estar-bien/20200204159612/mandarina-ayuda-adelgazar-perder-grasa/0-777-594/mandarina-perder-grasa-t.jpg'
    },
    {
      id: '2',
      name: 'Uva roja',
      price: 42.80,
      image: 'https://www.campusdelvino.com/media/k2/items/cache/39a27618f1dc54b80987c6706135e6b7_XL.jpg'
    },
    {
      id: '3',
      name: 'Piña',
      price: 25,
      image: 'https://www.cocinayvino.com/wp-content/uploads/2021/10/www.cocinayvino.com-este-truco-puede-ayudar-a-reducir-el-picor-de-la-pina-vidaysaludcom.jpg'
    },
    {
      id: '4',
      name: 'Melón',
      price: 9,
      image: 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/styles/bi_1860/public/media/image/2021/06/melon-2380543.jpg?itok=Nn_FpBfY'
    },
    {
      id: '5',
      name: 'Mango',
      price: 23.90,
      image: 'https://okdiario.com/img/2018/11/22/como-pelar-un-mango.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addToShoppingCart(product: Product) {
    this.myShoppingCart.push(product)
    this.count = this.myShoppingCart.length;
    // Calcular el monto total de la compra, con base a los productos agregados al carrito - acumulador
    this.total = this.myShoppingCart.reduce((sum, product) => sum + product.price, 0);
  }
}
