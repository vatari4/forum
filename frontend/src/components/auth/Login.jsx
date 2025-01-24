import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import api from '../../utils/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = async () => {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            console.log('Авторизация прошла успешно');
            navigate('/'); 
        } catch (err) {
            console.error('Ошибка при авторизации', err);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item label="Логин">
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item label="Пароль">
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Войти
            </Button>
        </Form>
    );
};

export default Login;
