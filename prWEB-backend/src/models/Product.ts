import { query } from '../database/database';

// Модель товара
export class Product {
    id?: number;
    name: string;
    short_description: string;
    price: number;
    image: string;
    specs: any;
    category_id?: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.short_description = data.short_description;
        this.price = data.price;
        this.image = data.image;
        this.specs = data.specs;
        this.category_id = data.category_id;
    }

    // Получение всех товаров
    static async findAll(): Promise<Product[]> {
        const result = await query('SELECT * FROM products ORDER BY id');
        return result.rows.map(row => new Product(row));
    }

    // Получение товара по ID
    static async findById(id: number): Promise<Product | undefined> {
        const result = await query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rows.length === 0) return undefined;
        return new Product(result.rows[0]);
    }

    // Получение товаров по категории (пусть будет)
    static async findByCategory(categoryId: number): Promise<Product[]> {
        const result = await query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
        return result.rows.map(row => new Product(row));
    }
}