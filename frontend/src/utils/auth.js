import { jwtDecode } from 'jwt-decode';  // Импортируем jwt-decode

export const getTokenPayload = (token) => {
  try {
    return jwtDecode(token);  // Декодируем токен
  } catch (error) {
    console.error('Ошибка декодирования токена', error);
    return null;
  }
};
