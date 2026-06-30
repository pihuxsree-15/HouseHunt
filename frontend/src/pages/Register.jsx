import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3">Create Account</h1>
        <Alert type="danger">{error}</Alert>
        <label className="form-label">Name</label>
        <input className="form-control mb-3" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <label className="form-label">Email</label>
        <input className="form-control mb-3" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        <label className="form-label">Phone</label>
        <input className="form-control mb-3" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        <label className="form-label">Password</label>
        <input className="form-control mb-3" type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        <button className="btn btn-dark w-100">Register</button>
        <p className="mt-3 mb-0 small">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
};

export default Register;
