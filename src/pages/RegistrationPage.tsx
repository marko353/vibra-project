import React, { useRef } from 'react';
import '../assets/styles/registration.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

const schema = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email address")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

interface RegistrationProps {
  onClose: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username: data.email.split('@')[0],
        email: data.email,
        password: data.password,
        birthDate: "2000-01-01",
        adress: "Neka ulica 1",
        country: "Serbia",
      });
      
      console.log(response.data);
      onClose();
    } catch (error: any) {
      if (error.response) {
        console.error("Error during registration:", error.response.data);
        alert(error.response.data.message || "Error during registration, please try again.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("No response from server, please check your connection.");
      } else {
        console.error("Error during registration:", error.message);
        alert("An error occurred, please try again.");
      }
    }
  };

  // Funkcija koja detektuje klik izvan modala
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="register-container" ref={modalRef}>
      <div className="register-box">
        <img
          src="./src/assets/images/Page0.png"
          alt="Logo"
          className="form-logo"
        />
        <h2>Create an Account</h2>
        <p>Join us to get started</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              autoFocus
            />
            {errors.email && (
              <p className="error">{String(errors.email.message)}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{String(errors.password.message)}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error">{String(errors.confirmPassword.message)}</p>
            )}
          </div>
          <button
            type="submit"
            className="register-button"
            disabled={Object.keys(errors).length > 0}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
