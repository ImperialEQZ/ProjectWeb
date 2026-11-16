import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Digital Market API',
            version: '1',
            description: 'REST API Лаб. №5',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Локальный сервер',
            },
        ],
        tags: [
            { name: 'Products', description: 'Операции с товарами магазина' },
            { name: 'Auth', description: 'Авторизация и регистрация пользователей' },
        ],
        paths: {
            '/products': {
                get: {
                    summary: 'Получить список всех товаров',
                    tags: ['Products'],
                    responses: {
                        '200': { description: 'Успешное получение списка товаров' },
                        '500': { description: 'Ошибка сервера' },
                    },
                },
                post: {
                    summary: 'Создать новый товар',
                    tags: ['Products'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name', 'price'],
                                    properties: {
                                        name: { type: 'string', example: 'Видеокарта RTX 4090' },
                                        price: { type: 'integer', example: 1500000 },
                                        short_description: { type: 'string', example: 'Недосягаемый уровень' },
                                        image: { type: 'string', example: 'gpu_4090.webp' },
                                        category_id: { type: 'integer', example: 1 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '201': { description: 'Товар успешно создан' },
                        '400': { description: 'Не заполнены обязательные поля' },
                    },
                },
            },
            '/products/{id}': {
                get: {
                    summary: 'Получить товар по ID',
                    tags: ['Products'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '200': { description: 'Товар найден' },
                        '404': { description: 'Товар не найден' },
                    },
                },
                put: {
                    summary: 'Обновить товар',
                    tags: ['Products'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string', example: 'Обновлённая видеокарта' },
                                        price: { type: 'integer', example: 140000 },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Товар обновлён' },
                        '404': { description: 'Товар не найден' },
                    },
                },
                delete: {
                    summary: 'Удалить товар',
                    tags: ['Products'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '200': { description: 'Товар удалён' },
                        '404': { description: 'Товар не найден' },
                    },
                },
            },
            '/auth/register': {
                post: {
                    summary: 'Регистрация пользователя',
                    tags: ['Auth'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['username', 'password'],
                                    properties: {
                                        username: { type: 'string', example: 'newusertest' },
                                        password: { type: 'string', example: '123456' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '201': { description: 'Пользователь зарегистрирован' },
                        '400': { description: 'Ошибка валидации' },
                    },
                },
            },
            '/auth/login': {
                post: {
                    summary: 'Вход в систему',
                    tags: ['Auth'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['username', 'password'],
                                    properties: {
                                        username: { type: 'string', example: 'newusertest' },
                                        password: { type: 'string', example: '123456' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Вход выполнен успешно' },
                        '401': { description: 'Неверный логин или пароль' },
                    },
                },
            },
        },
    },
    apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);