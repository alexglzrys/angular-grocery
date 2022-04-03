export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: Category;
    images: string[];
    // Estas dos propiedades son opcionales, por lo que pueden venir o no como parte del cuerpo de un Producto
    date?: Date,
    taxes?: number
}

export interface Category {
    id: number;
    name: string;
}