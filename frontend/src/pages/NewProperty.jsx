import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import Alert from '../components/Alert.jsx';

const initialForm = { title: '', description: '', location: '', address: '', price: '', type: 'Apartment', bedrooms: 1, bathrooms: 1, amenities: '', imageUrl: '', virtualTourUrl: '' };

const NewProperty = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await api.post('/properties', {
        ...form,
        price: Number(form.price),
        amenities: form.amenities.split(',').map((item) => item.trim()).filter(Boolean)
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create listing.');
    }
  };

  return (
    <main className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">Post Property</h1>
        <span className="badge text-bg-warning">Admin approval required</span>
      </div>
      <form className="form-panel" onSubmit={handleSubmit}>
        <Alert type="danger">{error}</Alert>
        <div className="row g-3">
          <div className="col-md-6"><label className="form-label">Title</label><input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
          <div className="col-md-3"><label className="form-label">Location</label><input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required /></div>
          <div className="col-md-3"><label className="form-label">Price</label><input type="number" className="form-control" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
          <div className="col-12"><label className="form-label">Address</label><input className="form-control" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required /></div>
          <div className="col-md-4"><label className="form-label">Type</label><select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Apartment</option><option>House</option><option>Villa</option><option>Studio</option><option>PG</option></select></div>
          <div className="col-md-4"><label className="form-label">Bedrooms</label><input type="number" className="form-control" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} /></div>
          <div className="col-md-4"><label className="form-label">Bathrooms</label><input type="number" className="form-control" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} /></div>
          <div className="col-12"><label className="form-label">Description</label><textarea className="form-control" rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <div className="col-md-6"><label className="form-label">Amenities</label><input className="form-control" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="Parking, WiFi, Gym" /></div>
          <div className="col-md-6"><label className="form-label">Image URL</label><input className="form-control" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
          <div className="col-12"><label className="form-label">Virtual Tour URL</label><input className="form-control" value={form.virtualTourUrl} onChange={(e) => setForm({ ...form, virtualTourUrl: e.target.value })} /></div>
        </div>
        <button className="btn btn-dark mt-4">Submit Listing</button>
      </form>
    </main>
  );
};

export default NewProperty;
