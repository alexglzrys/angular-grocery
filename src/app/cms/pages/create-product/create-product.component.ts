import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  formProduct!: FormGroup;

  constructor(private fb: FormBuilder,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  createProduct() {
    if (this.formProduct.valid) {
      let data = {
        ...this.formProduct.value,
        images: this.formProduct.get('images')?.value.split(',').map((image: string) => image.trim())
      }
      //console.log(data);
      this.productService.create(data).subscribe(product => {
        this.formProduct.reset();
        Swal.fire({
          title: 'Felicidades',
          text: 'Producto registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
    }
  }

}
