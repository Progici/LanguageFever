import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Login.css';
import { LoginConfig } from '../config/login.config';
import { saveToken } from '../api/api';

function Login() {
  const handleLoginSuccess = (credentialResponse) => {
    console.log("Google Token: ", credentialResponse.credential);
  };

  const handleLoginFailure = () => {
    console.log("Login failed");
  };

  return (
    <GoogleOAuthProvider clientId={LoginConfig.CLIENT_ID}>
      <div className="login-page">
        <div className="login-container">
          <h2>Login with Google</h2>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            className="google-login-button"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
