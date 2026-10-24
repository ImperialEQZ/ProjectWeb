import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import productsRoutes from './routes/product.routes';
import { initializeDatabase } from './database/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Тестовый первый маршрут
app.get('/', (req, res) => {
    res.json({
        message: 'Digital Market API работает',
        database: 'PostgreSQL',
        version: '1.0.0'
    });
});

// Подключаем маршруты
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);

// Инициализация БД и запуск сервера
const startServer = async () => {
    try {
        await initializeDatabase();
        console.log('База данных инициализирована');

        app.listen(PORT, () => {
            console.log(`\n Сервер запущен на http://localhost:${PORT}`);
            console.log(`API доступно по адресу http://localhost:${PORT}/api`);
            console.log(`Товары: http://localhost:${PORT}/api/products`);
            console.log(`Авторизация: http://localhost:${PORT}/api/auth/login\n`);
        });
    } catch (error) {
        console.error('Не удалось запустить сервер:', error);
        process.exit(1);
    }
};

startServer();