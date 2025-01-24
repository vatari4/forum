import React from 'react';
import ReactDOM from 'react-dom/client';  // Используем react-dom/client
import App from './App';

// Создаем корневой элемент
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);