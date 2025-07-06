"use strict";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '@services/auth.service.js';
import '@styles/form.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login({ email, password });
    console.log(result);
    if (result.status === "Success") {
      navigate("/inicio");
    } else {
      setError(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <label htmlFor="email">Correo institucional</label>
        <input
          id="email"
          type="email"
          placeholder="Correo institucional"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <div className={`error-message${error ? " visible" : ""}`}>
          {error}
        </div>
      </form>
    </div>
  );
}