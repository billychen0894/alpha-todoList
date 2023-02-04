import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    const isUserNameValid = userName.trim() !== '';
    const isPasswordValid = password.trim() !== '';

    if (!isUserNameValid && !isPasswordValid) {
      return;
    }

    const success = login({ userName, password });

    if (success) {
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: '登入失敗！',
      timer: 1000,
      icon: 'error',
      showConfirmButton: false,
    });
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="Username"
          placeholder="Enter username"
          type="text"
          value={userName}
          onChange={(userNameValue) => setUserName(userNameValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="Password"
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(passwordValue) => setPassword(passwordValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleLogin}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
