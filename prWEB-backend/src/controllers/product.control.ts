import { Request, Response } from 'express';
import { query } from '../database/database';
import { Product } from '../models/Product';

// Получить все товары
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll();
        res.json({ success: true, data: products, count: products.length });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при получении товаров' });
    }
};

// Получить товар по ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Товар не найден' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при получении товара' });
    }
};

// Создать новый товар
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, short_description, price, image, specs, category_id } = req.body;

        if (!name || !price) {
            return res.status(400).json({ success: false, message: 'Поля name и price обязательны' });
        }

        const result = await query(
            `INSERT INTO products (name, short_description, price, image, specs, category_id) 
                  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, short_description, price, image, JSON.stringify(specs || {}), category_id]
        );

        res.status(201).json({ success: true, message: 'Товар успешно создан', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при создании товара' });
    }
};

// Обновить товар
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const { name, short_description, price, image, specs, category_id } = req.body;

        const result = await query(
            `UPDATE products SET name = $1, short_description = $2, price = $3, image = $4, specs = $5, category_id = $6 
             WHERE id = $7 RETURNING *`,
            [name, short_description, price, image, JSON.stringify(specs || {}), category_id, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Товар не найден' });
        }

        res.json({ success: true, message: 'Товар успешно обновлён', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при обновлении товара' });
    }
};

// Удалить товар
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const result = await query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Товар не найден' });
        }

        res.json({ success: true, message: 'Товар успешно удалён', data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Ошибка при удалении товара' });
    }
};