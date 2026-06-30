import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3">Login</h1>
        <Alert type="danger">{error}</Alert>
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <label className="form-label">Password</label>
        <input className="form-control mb-3" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <button className="btn btn-dark w-100">Login</button>
        <p className="mt-3 mb-0 small">New to HouseHunt? <Link to="/register">Create an account</Link></p>
      </form>
    </main>
  );
};

export default Login;
