export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: Category;
    images: string[];
    date: Date
}

export interface Category {
    id: number;
    name: string;
}