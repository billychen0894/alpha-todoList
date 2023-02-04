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

const SignUpPage = () => {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos');
    }
  }, [isAuthenticated, navigate]);

  const handleSignUp = () => {
    const isUserNameValid = userName.trim() !== '';
    const isEmailValid = email.trim() !== '';
    const isPasswordValid = password.trim() !== '';

    if (!isUserNameValid && !isEmailValid && !isPasswordValid) {
      return;
    }

    const success = register({ userName, email, password });

    if (success) {
      Swal.fire({
        position: 'top',
        title: '註冊成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      position: 'top',
      title: '註冊失敗！',
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
      <h1>建立您的帳號</h1>

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
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(emailValue) => setEmail(emailValue)}
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
      <AuthButton onClick={handleSignUp}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
