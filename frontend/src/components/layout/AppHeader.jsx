import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AppHeader = ({ isAuthenticated, onLogout }) => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      localStorage.removeItem('authToken');
      onLogout();
    } catch (error) {
      console.error('Ошибка при выходе из системы:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#001529' }}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="home">
          <Link to="/">Главная</Link>
        </Menu.Item>
        {isAuthenticated && (
          <Menu.Item key="create-post">
            <Link to="/create-post">Создать пост</Link>
          </Menu.Item>
        )}
        {!isAuthenticated ? (
          <>
            <Menu.Item key="login">
              <Link to="/login">Войти</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Регистрация</Link>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="logout" onClick={handleLogout}>
            Выйти
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

export default AppHeader;
