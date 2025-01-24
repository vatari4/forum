import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import api from '../../utils/api';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await api.post('/auth/register', { username, password });
            localStorage.setItem('token', response.data.token);
            console.log('Регистрация прошла успешно');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при регистрации');
            console.error('Ошибка при регистрации:', err);
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type="primary" htmlType="submit">
                Зарегистрироваться
            </Button>
        </Form>
    );
};

export default Register;
