import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardHeader, Typography, Button, TextField, Alert,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { styled } from '@mui/system';

// Styled TextField to override autofill styles
const StyledTextField = styled(TextField)(({ theme }) => ({
  '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: '#ffffff',
    transition: 'background-color 5000s ease-in-out 0s',
    boxShadow: 'inset 0 0 20px 20px #23232329',
  },
}));

const AuthComponent: React.FC = () => {
  const { loginUser, registerUser, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginUser(email, password);
      } else {
        if (password !== rePassword) {
          setError("Passwords do not match.");
          return;
        }
        await registerUser(email, password,name);
      }
      navigate('/');
    } catch (err) {
      setError(isLogin ? 'Login failed. Please check your credentials and try again.' : 'Registration failed. Please try again.');
    }
  };

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', flexDirection: "column" }}>
      <Card sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
        <CardHeader>
          <Typography variant="h5" align="center">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            {isLogin ? 'Enter your credentials to access your account' : 'Fill in the details to register'}
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth}>
            {!isLogin && (
              <div style={{ marginBottom: 16 }}>
                <StyledTextField
                  id="name"
                  label="Name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <PersonOutlineIcon style={{ marginRight: 8 }} />
                    ),
                  }}
                />
              </div>
            )}
            <div style={{ marginBottom: 16 }}>
              <StyledTextField
                id="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <MailOutlineIcon style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <StyledTextField
                id="password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <LockOutlinedIcon style={{ marginRight: 8 }} />
                  ),
                }}
              />
            </div>
            {!isLogin && (
              <div style={{ marginBottom: 16 }}>
                <StyledTextField
                  id="rePassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon style={{ marginRight: 8 }} />
                    ),
                  }}
                />
              </div>
            )}
            {error && (
              <Alert severity="error" style={{ marginBottom: 16 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isLogin ? 'Sign in' : 'Sign up'}
            </Button>
            <Typography sx={{ mt: 2 }} variant="body2" color="textSecondary">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthComponent;
