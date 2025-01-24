import React, { useState, useEffect } from 'react';
import { List, Modal, Spin, Form, Input, Button } from 'antd'; 
import { LoadingOutlined } from '@ant-design/icons';
import PostItem from './PostItem';
import api from '../../utils/api';
import { getTokenPayload } from '../../utils/auth';  

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);  
    const [isEditing, setIsEditing] = useState(false);  
    const [editingPost, setEditingPost] = useState(null); 
    const [isDeleting, setIsDeleting] = useState(false);  // Добавлено для отслеживания состояния модалки удаления
    const [deleteText, setDeleteText] = useState('');  // Добавлено для отслеживания введённого текста
    const [form] = Form.useForm();  

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data);
            } catch (err) {
                console.error('Ошибка при загрузке постов', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchCurrentUser = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const payload = getTokenPayload(token); 
                setCurrentUser(payload);
            }
        };

        fetchPosts();
        fetchCurrentUser();
    }, []);

    const handleDeletePost = async (id, userId) => {
        if (currentUser?.userId === userId) {
            setIsDeleting(true);  // Показываем модалку для подтверждения удаления
        } else {
            console.log('У вас нет прав на удаление этого поста');
        }
    };

    const confirmDelete = async (id) => {
        if (deleteText === 'Подтвердить') {
            try {
                const response = await api.delete(`/posts/${id}`);
                if (response.status === 200) {
                    setPosts(posts.filter((post) => post.id !== id)); // Удаляем пост из списка
                } else {
                    throw new Error('Ошибка при удалении');
                }
            } catch (err) {
                console.error('Ошибка при удалении поста', err);
            } finally {
                setIsDeleting(false);  // Закрываем модалку
                setDeleteText('');  // Сбрасываем введённый текст
            }
        } else {
            console.log('Пожалуйста, введите "Подтвердить" для удаления');
        }
    };

    const handleEditPost = (post) => {
        setEditingPost(post);  
        form.setFieldsValue({ title: post.title, content: post.content }); 
        setIsEditing(true);  
    };

    const handleSaveEdit = async () => {
        try {
            const values = await form.validateFields(); 
            await api.put(`/posts/${editingPost.id}`, values);  
            setPosts(posts.map(post => post.id === editingPost.id ? { ...post, ...values } : post)); 
            setIsEditing(false);  
            setEditingPost(null); 
        } catch (err) {
            console.error('Ошибка при сохранении изменений', err);
        }
    };

    return (
        <div>
            <h2>Список постов</h2>
            {loading ? (
                <Spin indicator={<LoadingOutlined spin />} size="large" fullscreen />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={posts}
                    renderItem={(post) => (
                        <List.Item>
                            <PostItem
                                post={post}
                                onDelete={() => handleDeletePost(post.id, post.user_id)}  
                                onEdit={() => handleEditPost(post)}  
                                canEdit={currentUser?.userId === post.user_id}  
                                canDelete={currentUser?.userId === post.user_id} 
                            />
                        </List.Item>
                    )}
                />
            )}

            {/* Модалка для подтверждения удаления */}
            <Modal
                title="Подтверждение удаления"
                open={isDeleting}
                onCancel={() => setIsDeleting(false)}  // Закрытие модалки
                footer={[
                    <Button key="cancel" onClick={() => setIsDeleting(false)}>
                        Отменить
                    </Button>,
                    <Button 
                        key="confirm" 
                        type="primary" 
                        onClick={() => confirmDelete(editingPost?.id)} // Подтверждение удаления
                    >
                        Удалить
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item
                        name="confirmation"
                        label="Введите 'Подтвердить' для удаления"
                        rules={[{ required: true, message: 'Пожалуйста, введите "Подтвердить" для удаления' }]}
                    >
                        <Input 
                            value={deleteText}
                            onChange={(e) => setDeleteText(e.target.value)} 
                        />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Модалка для редактирования поста */}
            <Modal
                title="Редактировать пост"
                open={isEditing}
                onCancel={() => setIsEditing(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsEditing(false)}>
                        Отменить
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveEdit}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Заголовок"
                        rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="content"
                        label="Контент"
                        rules={[{ required: true, message: 'Пожалуйста, введите контент' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PostList;
