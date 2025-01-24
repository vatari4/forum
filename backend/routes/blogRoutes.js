const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', blogController.getPosts);

router.post('/', authMiddleware, blogController.createPost);

router.delete('/:id', authMiddleware, blogController.deletePost);

router.put('/:id', authMiddleware, blogController.updatePost);  // Добавляем маршрут для PUT запроса

module.exports = router;
