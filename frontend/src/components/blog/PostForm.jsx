import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import api from '../../utils/api';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await api.post('/posts', { title, content });
            console.log('Пост создан', response.data);
        } catch (err) {
            console.error('Ошибка при создании поста', err);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Название поста">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item label="Содержание">
                <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Создать пост
            </Button>
        </Form>
    );
};

export default PostForm;
