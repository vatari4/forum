const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); 
const User = require('./User'); // Импорт модели User

const BlogPost = sequelize.define('BlogPost', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'blog_posts', 
    timestamps: false, 
});

// Добавьте ассоциацию с моделью User
BlogPost.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BlogPost;
