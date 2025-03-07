import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/login.scss';

interface LoginProps {
  onClose: () => void;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("onSubmit called with data:", data);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: data.email,
        password: data.password,
      });
  
      localStorage.setItem('token', response.data.token);
  
      const token = localStorage.getItem('token');
      console.log("Token saved:", token);
  
      navigate('/profile');
    } catch (error) {
      console.error("Login error:", error);
      setError('Invalid email or password');
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    // Proveravamo da li je kliknut deo van modalnog sadržaja
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    // Dodajemo listener za detekciju klika van modala
    if (modalRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Očistimo event listener kada komponenta bude uklonjena
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="login-container" ref={modalRef}>
      <div className="login-box">
        <img src="./src/assets/images/Page0.png" alt="Logo" className="form-logo" />
        <h2>Welcome !</h2>
        <p>Sign in to continue</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
