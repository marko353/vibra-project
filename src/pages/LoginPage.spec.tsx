import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./LoginPage";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../contex/AuthContext";

describe("LoginPage", () => {

  // Test 1: Da li se pravilno renderuje forma za prijavu
  test("Renderuje formu za prijavu", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login onClose={jest.fn()} />
        </MemoryRouter>
      </AuthProvider>
    );

    // Provera da li su prisutni ključni elementi
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  // Test 2: Da li prikazuje grešku kada su polja prazna
  test("Prikazuje greške ako su polja prazna", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login onClose={jest.fn()} />
        </MemoryRouter>
      </AuthProvider>
    );

    // Klik na dugme za prijavu bez unosa podataka
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Provera da li su greške za prazna polja prisutne
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
  });

  // Test 3: Da li se prikazuje greška za nevažeći email
  test("Prikazuje grešku za nevažeći email", async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login onClose={jest.fn()} />
        </MemoryRouter>
      </AuthProvider>
    );

    // Unos nevalidnog emaila
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid-email" },
    });

    // Klik na dugme za prijavu
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    });

    // Provera da li se prikazuje greška za nevalidan email
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
  });

  // Test 4: Da li dugme za prijavu je onemogućeno kada su polja prazna
  test("Dugme za prijavu je onemogućeno kada su polja prazna", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login onClose={jest.fn()} />
        </MemoryRouter>
      </AuthProvider>
    );

    // Provera da li je dugme onemogućeno na početku
    const loginButton = screen.getByRole("button", { name: /sign in/i });
    expect(loginButton).toBeDisabled();
  });

  // Test 5: Da li dugme za prijavu postaje omogućeno kad su polja popunjena
  test("Dugme za prijavu je omogućeno kada su polja popunjena", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Login onClose={jest.fn()} />
        </MemoryRouter>
      </AuthProvider>
    );

    // Unos validnih podataka
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    // Provera da li je dugme omogućeno
    const loginButton = screen.getByRole("button", { name: /sign in/i });
    expect(loginButton).toBeEnabled();
  });
});
