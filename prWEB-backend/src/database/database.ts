import { Pool, QueryResult } from 'pg';
import { dbConfig } from './config';

const pool = new Pool(dbConfig);

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params);
};

// Инициализация базы данных
export const initializeDatabase = async () => {
    try {
        await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        console.log('Таблица users создана');

        await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        short_description TEXT,
        price INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL,
        specs JSONB
      )
    `);
        console.log('Таблица products создана');

        // Есть ли товары
        const productsCheck = await query('SELECT COUNT(*) FROM products');
        const productsCount = parseInt(productsCheck.rows[0].count);
        // Добавляю свои товары
        if (productsCount === 0) {
            await query(`
        INSERT INTO products (name, short_description, price, image, specs) VALUES
        ('Видеокарта RTX 5070', 'Краткая характеристика товара: 12 ГБ GDDR7, PCIe 5.0, отличная производительность.', 95000, 'gpu.webp', '{"interface": "PCIe 5.0", "memory": "12 ГБ GDDR7", "bus": "192 бит", "connectors": "3 x DisplayPort, 1 x HDMI", "frequency": "2330–2625 МГц"}'),
        ('Процессор Ryzen 7 7800x3d', 'Краткая характеристика товара: 8 ядер, 16 потоков, L3 кэш 96МБ.', 45000, 'cpu.webp', '{"cores": "8 ядер", "threads": "16 потоков", "cache": "L3 кэш 96МБ", "socket": "AM5"}'),
        ('Материнская плата', 'Краткая характеристика товара: Socket AM5, DDR5, Wi-Fi 6E, USB 4.0.', 28500, 'motherboard.webp', '{"socket": "Socket AM5", "memory": "DDR5", "wifi": "Wi-Fi 6E", "usb": "USB 4.0"}'),
        ('Корпус LIAN LI Vector V100R', 'Краткая характеристика товара: E-ATX, Micro-ATX, Mini-ITX, Standard-ATX, Вентиляторы: 4 x 120 мм', 8300, 'case.webp', '{"formFactor": "E-ATX, Micro-ATX, Mini-ITX, Standard-ATX", "fans": "4 x 120 мм"}')
      `);
            console.log('Стартовые товары добавлены');
        }
    } catch (error) {
        console.error('Ошибка при инициализации БД:', error);
    }
};

export default pool;