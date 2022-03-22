import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit {

  @Input() image!: string;
  @Input() title!: string;
  @Output() onLoaded: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // Método que se ejecuta si la imagen no es válida (una url que ya no existe y por tanto la imagen no puede cargarse)
  imageError() {
    this.image = 'assets/images/default.jpg'
  }

  // Método que se ejecuta si la imagen se cargó correctamente
  imageLoaded() {
    this.onLoaded.emit(this.image);
  }

}
