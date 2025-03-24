import React, { useRef, useState, useEffect } from 'react';
import '../assets/styles/registration.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long").nonempty("Confirm Password is required"),
  fullName: z.string().nonempty("Full name is required"),
  birthDate: z.string().nonempty("Birth date is required").refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid birth date",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface RegistrationProps {
  onClose: () => void;
  isOpen: boolean;
}

const Registration: React.FC<RegistrationProps> = ({ onClose, isOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        email: '',
        password: '',
        fullName: '',
        birthDate: '',
        confirmPassword: '',
      });
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    try {
      console.log("✅ Pre slanja podataka na server");

      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name: data.fullName,
        username: data.email.split('@')[0],
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        birthDate: data.birthDate,
      });

      console.log("✅ Registrovan korisnik:", response.data);
      
      toast.success("`Successfully registered. You can now log in to your account.`");


      
      console.log("🎉 Toast notifikacija bi trebalo da se pojavi!");

      // ⏳ Sačekaj 1 sekundu pre zatvaranja modala
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error: any) {
      console.error("❌ Greška prilikom registracije:", error);
      if (error.response) {
        setServerError(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        setServerError("No response from server.");
      } else {
        setServerError("Unexpected error.");
      }
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="register-container" ref={modalRef}>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="register-box">
        <img
          src="/Page0.png"
          alt="Logo"
          className="form-logo"
        />
        <h2>Create an Account</h2>
        <p>Join us to get started</p>
        <form key={isOpen ? 'open' : 'closed'} onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input type="text" placeholder="Name" {...register("fullName")} autoFocus className={errors.fullName ? 'error-input' : ''} />
            {errors.fullName && <p className="error">{String(errors.fullName.message)}</p>}
          </div>
          <div className="form-group">
            <input type="date" placeholder="Birth Date" {...register("birthDate")} className={errors.birthDate ? 'error-input' : ''} />
            {errors.birthDate && <p className="error">{String(errors.birthDate.message)}</p>}
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" {...register("email")} className={errors.email ? 'error-input' : ''} />
            {errors.email && <p className="error">{String(errors.email.message)}</p>}
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" {...register("password")} className={errors.password ? 'error-input' : ''} />
            {errors.password && <p className="error">{String(errors.password.message)}</p>}
          </div>
          <div className="form-group">
            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")} className={errors.confirmPassword ? 'error-input' : ''} />
            {errors.confirmPassword && <p className="error">{String(errors.confirmPassword.message)}</p>}
          </div>
          {serverError && <p className="server-error">{serverError}</p>}
          <button type="submit" className="register-button" disabled={Object.keys(errors).length > 0}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
