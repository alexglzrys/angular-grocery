import { Product } from '../interfaces/product';

// Data Transfer Object
// ? Al crear un producto, su interfaz es similar a Product, pero Omitiendo el id y la category (esta última la asigna automáticamente el Backend a partir del id de categoría enviado)
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
    categoryId: number;
}

// Data Transfer Object
// ? Al actualizar un producto, su interfaz es similar a CreateProductDTO, pero con todos los datos opcionales (para el caso de un método PATCH)
export interface UpdateProductDTO extends Partial<CreateProductDTO> {
    
}
