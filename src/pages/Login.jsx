import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Tembak API login backend kamu
      const response = await axios.post('http://103.247.10.59:3000/api/auth/login', {
        email,
        password
      });

      // Ambil token dari response backend (sesuai authController.js kamu, namanya 'token')
      const token = response.data.token;

      // Simpan token ke localStorage
      localStorage.setItem('token', token);
      alert('Login Berhasil!');
      
      // Arahkan ke halaman Beranda setelah login
      navigate('/'); 
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal, cek email/password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>
          Masuk
        </button>
      </form>
      
      <p style={{ marginTop: '20px' }}>
        Belum punya akun? <a href="/register">Daftar di sini</a>
      </p>
    </div>
  );
}