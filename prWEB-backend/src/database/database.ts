import { Pool, QueryResult } from 'pg';
import { dbConfig } from './config';

const pool = new Pool(dbConfig);

export const query = (text: string, params?: any[]): Promise<QueryResult> => {
    return pool.query(text, params);
};

// Инициализация базы данных
export const initializeDatabase = async () => {
    try {
        // Пользователи
        await query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
        `);
        console.log('Таблица users создана');

        // Категории
        await query(`
            CREATE TABLE IF NOT EXISTS categories (
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(255) UNIQUE NOT NULL
                )
        `);
        console.log('Таблица categories создана');

        // Таблица товаров со ссылкой на категорию
        await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        short_description TEXT,
        price INTEGER NOT NULL,
        image VARCHAR(255) NOT NULL,
        specs JSONB,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
        console.log('Таблица products создана');

        // Есть ли категории
        const categoriesCheck = await query('SELECT COUNT(*) FROM categories');
        const categoriesCount = parseInt(categoriesCheck.rows[0].count);

        if (categoriesCount === 0) {
            // Добавляем категории
            await query(`
                INSERT INTO categories (name) VALUES
                  ('Видеокарты'),
                  ('Процессоры'),
                  ('Материнские платы'),
                  ('Корпуса')
            `);
            console.log('Категории добавлены');

            // Добавляем товары с привязкой к категориям
            await query(`
        INSERT INTO products (name, short_description, price, image, specs, category_id) VALUES
        ('Видеокарта RTX 5070', 'Краткая характеристика товара: 12 ГБ GDDR7, PCIe 5.0, отличная производительность.', 95000, 'gpu.webp', '{"Интерфейс": "PCIe 5.0", "Объем памяти": "12 ГБ GDDR7", "Шина памяти": "192 бит", "Разъемы": "3 x DisplayPort, 1 x HDMI", "Частота": "2330–2625 МГц"}', 1),
        ('Процессор Ryzen 7 7800x3d', 'Краткая характеристика товара: 8 ядер, 16 потоков, L3 кэш 96МБ.', 45000, 'cpu.webp', '{"Ядра": "8 ядер", "Потоки": "16 потоков", "Кэш": "L3 кэш 96МБ", "Сокет": "AM5"}', 2),
        ('Материнская плата', 'Краткая характеристика товара: Socket AM5, DDR5, Wi-Fi 6E, USB 4.0.', 28500, 'motherboard.webp', '{"Сокет": "Socket AM5", "Память": "DDR5", "Wi-Fi": "Wi-Fi 6E", "USB": "USB 4.0"}', 3),
        ('Корпус LIAN LI Vector V100R', 'Краткая характеристика товара: E-ATX, Micro-ATX, Mini-ITX, Standard-ATX, Вентиляторы: 4 x 120 мм', 8300, 'case.webp', '{"Форм-фактор": "E-ATX, Micro-ATX, Mini-ITX, Standard-ATX", "Вентиляторы": "4 x 120 мм"}', 4)
      `);
            console.log('Стартовые товары добавлены');
        }
    } catch (error) {
        console.error('Ошибка при инициализации БД:', error);
    }
};

export default pool;