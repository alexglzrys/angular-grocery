import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/interfaces/product';
import { ActivatedRoute, Params } from '@angular/router';
import { UpdateProductDTO } from '../../../shared/dtos/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  formProduct!: FormGroup;
  product!: Product;
  id!: string;

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
    this.activatedRouter.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.fetchProduct(this.id);
    })
  }

  fetchProduct(id: string) {
    this.productService.getProduct(id).subscribe(product => {
      const data = {
        ...product,
        categoryId: product.category.id,
        images: product.images.join(',')
      };
      this.formProduct.patchValue(data)
    });
  }

  updateProduct() {
    if (this.formProduct.valid) {
      const data = {
        ...this.formProduct.value,
        images: this.formProduct.get('images')?.value.split(',').map((image: string) => image.trim())
      }
      console.log(data);
      this.productService.update(this.id, data).subscribe(product => {
        Swal.fire({
          title: 'Felicidades',
          text: 'Producto actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
    }
  }

}
