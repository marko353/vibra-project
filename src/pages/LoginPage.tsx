import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contex/AuthContext";
import '../assets/styles/login.scss';

interface LoginProps {
  onClose: () => void;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC<LoginProps> = ({ }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const jeMobilni = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data));

      setUser({
        id: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email,
        token: response.data.token,
      });

      toast.success("You have successfully logged in!");

      if (jeMobilni()) {
        navigate('/chatDashboard'); // Preusmeravanje na chat na mobilnom
      } else {
        navigate('/chatDashboard'); // Preusmeravanje na desktop
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/Page0.png" alt="Logo" className="form-logo" />
        <h2>Welcome!</h2>
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