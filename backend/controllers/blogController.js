const BlogPost = require('../models/BlogPost');
const User = require('../models/User');

const getPosts = async (req, res) => {
    try {
        const posts = await BlogPost.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            }],
            attributes: ['id', 'title', 'content', 'created_at', 'updated_at', 'user_id'],
        });

        res.json(posts);
    } catch (err) {
        console.error('Ошибка при загрузке постов:', err);
        res.status(500).json({ message: 'Ошибка при загрузке постов' });
    }
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const { userId } = req.user;
    try {
        const newPost = await BlogPost.create({ title, content, user_id: userId });
        res.json(newPost);
    } catch (err) {
        console.error('Ошибка при создании поста:', err);
        res.status(500).json({ message: 'Ошибка при создании поста' });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params; 
    try {
        await BlogPost.destroy({ where: { id } });
        res.json({ message: 'Пост удалён' });
    } catch (err) {
        console.error('Ошибка при удалении поста:', err);
        res.status(500).json({ message: 'Ошибка при удалении поста' });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req.user;

    try {
        const post = await BlogPost.findOne({ where: { id } });
        
        if (!post) {
            return res.status(404).json({ message: 'Пост не найден' });
        }

        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'У вас нет прав на редактирование этого поста' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        res.json(post);
    } catch (err) {
        console.error('Ошибка при обновлении поста:', err);
        res.status(500).json({ message: 'Ошибка при обновлении поста' });
    }
};

module.exports = { getPosts, createPost, deletePost, updatePost };
