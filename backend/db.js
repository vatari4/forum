const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

// Проверка подключения
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно!');
    } catch (error) {
        console.error('Невозможно подключиться к базе данных:', error);
    }
};

testConnection();

module.exports = { sequelize };
