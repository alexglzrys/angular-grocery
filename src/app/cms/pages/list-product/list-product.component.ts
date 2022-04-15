import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from '../../../shared/interfaces/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Hey!',
      text: '¿Estas seguro de querer eliminar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe(deletedProduct => {
          Swal.fire({
            title: 'Felicidades',
            text: 'Producto eliminado con éxito',
            icon: 'success'
          });
          const index = this.products.findIndex(product => product.id === id);
          this.products.splice(index, 1);
        });
      }
    })

  }

}
